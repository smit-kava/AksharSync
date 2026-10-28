<?php
// ============================================================
// customer-auth.php – Customer Sign-In & Lead Capture
// Path on CWP: /home/akshar/public_html/api/customers/customer-auth.php
// ============================================================

require_once __DIR__ . '/db.php';

// Auto-create table if not exists (Zero-config ease)
$conn->query("
CREATE TABLE IF NOT EXISTS `customers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(180) NOT NULL UNIQUE,
    `phone` VARCHAR(40) NULL,
    `company` VARCHAR(150) NULL,
    `interests` VARCHAR(255) NULL,
    `visits_count` INT UNSIGNED NOT NULL DEFAULT 1,
    `last_ip` VARCHAR(60) NULL,
    `last_active` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_email` (`email`),
    INDEX `idx_last_active` (`last_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (!$data) {
    $data = $_POST;
}

$name = trim($data['name'] ?? '');
$email = strtolower(trim($data['email'] ?? ''));
$phone = trim($data['phone'] ?? '');
$company = trim($data['company'] ?? '');
$interests = trim($data['interests'] ?? 'General Inquiry');

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and a valid Email address are required.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit();
}

$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] 
    ?? $_SERVER['HTTP_X_FORWARDED_FOR'] 
    ?? $_SERVER['REMOTE_ADDR'] 
    ?? '127.0.0.1';
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}

// Check if customer already exists
$checkStmt = $conn->prepare('SELECT id, name, email, phone, company, visits_count FROM customers WHERE email = ? LIMIT 1');
$checkStmt->bind_param('s', $email);
$checkStmt->execute();
$existing = $checkStmt->get_result()->fetch_assoc();
$checkStmt->close();

if ($existing) {
    // Update existing customer record
    $updateStmt = $conn->prepare('
        UPDATE customers 
        SET name = ?, phone = IF(? != "", ?, phone), company = IF(? != "", ?, company), 
            interests = ?, visits_count = visits_count + 1, last_ip = ?, last_active = NOW()
        WHERE id = ?
    ');
    $updateStmt->bind_param('sssssssi', $name, $phone, $phone, $company, $company, $interests, $ip, $existing['id']);
    $updateStmt->execute();
    $updateStmt->close();

    $newVisits = (int)$existing['visits_count'] + 1;
    echo json_encode([
        'success' => true,
        'message' => 'Welcome back, ' . htmlspecialchars($name) . '!',
        'is_new' => false,
        'customer' => [
            'id' => (int)$existing['id'],
            'name' => $name,
            'email' => $email,
            'phone' => $phone ?: $existing['phone'],
            'company' => $company ?: $existing['company'],
            'visits_count' => $newVisits,
        ]
    ]);
    exit();
}

// Insert new customer
$insertStmt = $conn->prepare('
    INSERT INTO customers (name, email, phone, company, interests, visits_count, last_ip, last_active)
    VALUES (?, ?, ?, ?, ?, 1, ?, NOW())
');
$insertStmt->bind_param('ssssss', $name, $email, $phone, $company, $interests, $ip);
$insertStmt->execute();
$newId = $conn->insert_id;
$insertStmt->close();

echo json_encode([
    'success' => true,
    'message' => 'Thank you for signing in, ' . htmlspecialchars($name) . '! Welcome to AksharSync.',
    'is_new' => true,
    'customer' => [
        'id' => $newId,
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'company' => $company,
        'visits_count' => 1,
    ]
]);
