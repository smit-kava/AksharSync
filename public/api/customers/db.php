<?php
// ============================================================
// db.php – Database connection for AksharSync Customers & Analytics
// Path on CWP: /home/akshar/public_html/api/customers/db.php
// ============================================================

$allowed_origins = [
    'https://aksharsync.com',
    'https://www.aksharsync.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8000',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

error_reporting(0);
ini_set('display_errors', '0');

define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_NAME', 'akshar_db');
define('DB_USER', 'akshar_smit');
define('DB_PASS', '6K5FpJLy2OXl');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]);
    exit();
}

$conn->set_charset('utf8mb4');
