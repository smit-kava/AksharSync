<?php
// ============================================================
// get-analytics.php – Superadmin Visitor & Customer Analytics
// Path on CWP: /home/akshar/public_html/api/customers/get-analytics.php
// ============================================================

require_once __DIR__ . '/db.php';

// Auth verification helper
function getAdminToken(): ?string {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER['Authorization']);
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_combine(
            array_map('ucwords', array_keys($requestHeaders)),
            array_values($requestHeaders)
        );
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }

    if (!empty($headers) && preg_match('/Bearer\s(\S+)/i', $headers, $matches)) {
        return $matches[1];
    }
    if (isset($_GET['token']) && !empty($_GET['token'])) {
        return trim($_GET['token']);
    }
    if (isset($_POST['token']) && !empty($_POST['token'])) {
        return trim($_POST['token']);
    }
    return null;
}

$token = getAdminToken();
if (!$token) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Authorization token is required.']);
    exit();
}

$authStmt = $conn->prepare('SELECT id, username, email, role, token_expires_at FROM admin_users WHERE auth_token = ? LIMIT 1');
$authStmt->bind_param('s', $token);
$authStmt->execute();
$adminUser = $authStmt->get_result()->fetch_assoc();
$authStmt->close();

if (!$adminUser) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid or expired session.']);
    exit();
}

// ── Metric 1: Total Visits & Unique Visitors ─────────────────
$statsRes = $conn->query('
    SELECT 
        COUNT(*) as total_visits,
        COUNT(DISTINCT ip_address) as unique_visitors,
        SUM(CASE WHEN DATE(visited_at) = CURDATE() THEN 1 ELSE 0 END) as today_visits
    FROM site_visitors
');
$statsRow = $statsRes ? $statsRes->fetch_assoc() : [];

// ── Metric 2: Total Customers ────────────────────────────────
$custCountRes = $conn->query('SELECT COUNT(*) as total_customers FROM customers');
$custCountRow = $custCountRes ? $custCountRes->fetch_assoc() : [];

// ── Customer Directory ───────────────────────────────────────
$search = trim($_GET['search'] ?? '');
$customerSql = 'SELECT id, name, email, phone, company, interests, visits_count, last_ip, last_active, created_at FROM customers';
if (!empty($search)) {
    $searchEscaped = $conn->real_escape_string($search);
    $customerSql .= " WHERE (name LIKE '%$searchEscaped%' OR email LIKE '%$searchEscaped%' OR company LIKE '%$searchEscaped%')";
}
$customerSql .= ' ORDER BY last_active DESC LIMIT 100';

$customersRes = $conn->query($customerSql);
$customers = [];
if ($customersRes) {
    while ($c = $customersRes->fetch_assoc()) {
        $customers[] = $c;
    }
}

// ── Recent 25 Visitor Logs ───────────────────────────────────
$logsRes = $conn->query('
    SELECT id, ip_address, page_url, referrer, device_type, visited_at 
    FROM site_visitors 
    ORDER BY id DESC 
    LIMIT 25
');
$recentLogs = [];
if ($logsRes) {
    while ($log = $logsRes->fetch_assoc()) {
        $recentLogs[] = $log;
    }
}

echo json_encode([
    'success' => true,
    'stats' => [
        'total_visits' => (int)($statsRow['total_visits'] ?? 0),
        'unique_visitors' => (int)($statsRow['unique_visitors'] ?? 0),
        'today_visits' => (int)($statsRow['today_visits'] ?? 0),
        'total_customers' => (int)($custCountRow['total_customers'] ?? 0),
    ],
    'customers' => $customers,
    'recent_visitors' => $recentLogs
]);
