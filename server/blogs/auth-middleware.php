<?php
// ============================================================
// auth-middleware.php – Token verification for superadmin routes
// Path on CWP: /home/akshar/public_html/api/blogs/auth-middleware.php
// ============================================================

require_once __DIR__ . '/db.php';

function getBearerToken(): ?string {
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

function verifyAdmin(mysqli $conn): array {
    $token = getBearerToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Authorization token is required.']);
        exit();
    }

    $stmt = $conn->prepare('SELECT id, username, email, role, token_expires_at FROM admin_users WHERE auth_token = ? LIMIT 1');
    $stmt->bind_param('s', $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    if (!$user) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid or expired session. Please log in again.']);
        exit();
    }

    if (!empty($user['token_expires_at']) && strtotime($user['token_expires_at']) < time()) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Session expired. Please log in again.']);
        exit();
    }

    return $user;
}
