<?php
// ============================================================
// track-visit.php – Real-time Website Visitor & Page View Tracker
// Path on CWP: /home/akshar/public_html/api/customers/track-visit.php
// ============================================================

require_once __DIR__ . '/db.php';

// Auto-create table if not exists (Zero-config ease)
$conn->query("
CREATE TABLE IF NOT EXISTS `site_visitors` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `session_id` VARCHAR(64) NOT NULL,
    `ip_address` VARCHAR(64) NOT NULL,
    `page_url` VARCHAR(255) NOT NULL,
    `referrer` VARCHAR(255) NULL,
    `user_agent` VARCHAR(255) NULL,
    `device_type` VARCHAR(30) DEFAULT 'desktop',
    `visited_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_visited_at` (`visited_at`),
    INDEX `idx_session` (`session_id`),
    INDEX `idx_ip` (`ip_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (!$data) {
    $data = $_REQUEST;
}

$pageUrl = trim($data['page_url'] ?? $_SERVER['HTTP_REFERER'] ?? '/');
if (strlen($pageUrl) > 255) {
    $pageUrl = substr($pageUrl, 0, 255);
}

$sessionId = trim($data['session_id'] ?? '');
if (empty($sessionId)) {
    $sessionId = bin2hex(random_bytes(16));
}

$referrer = trim($data['referrer'] ?? $_SERVER['HTTP_REFERER'] ?? '');
if (strlen($referrer) > 255) {
    $referrer = substr($referrer, 0, 255);
}

// Client IP detection (with Cloudflare / Proxy awareness)
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] 
    ?? $_SERVER['HTTP_X_FORWARDED_FOR'] 
    ?? $_SERVER['REMOTE_ADDR'] 
    ?? '127.0.0.1';
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}

// Device detection
$ua = $_SERVER['HTTP_USER_AGENT'] ?? ($data['user_agent'] ?? '');
$isMobile = preg_match('/(android|iphone|ipad|mobile|touch)/i', $ua);
$deviceType = $isMobile ? 'mobile' : 'desktop';

$uaTrimmed = substr($ua, 0, 255);

// Record visit
$stmt = $conn->prepare('INSERT INTO site_visitors (session_id, ip_address, page_url, referrer, user_agent, device_type) VALUES (?, ?, ?, ?, ?, ?)');
$stmt->bind_param('ssssss', $sessionId, $ip, $pageUrl, $referrer, $uaTrimmed, $deviceType);
$stmt->execute();
$stmt->close();

// If customer email provided, increment customer visit count
$customerEmail = trim($data['customer_email'] ?? '');
if (!empty($customerEmail)) {
    $updateCust = $conn->prepare('UPDATE customers SET visits_count = visits_count + 1, last_active = NOW(), last_ip = ? WHERE email = ?');
    $updateCust->bind_param('ss', $ip, $customerEmail);
    $updateCust->execute();
    $updateCust->close();
}

echo json_encode([
    'success' => true,
    'session_id' => $sessionId
]);
