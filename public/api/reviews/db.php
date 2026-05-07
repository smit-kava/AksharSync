<?php
// ============================================================
// db.php – Shared database connection for AksharSync reviews
// Place this file at: /home/akshar/public_html/api/reviews/db.php
// ============================================================

// ── CORS headers – sent FIRST before anything else ───────────
// Must be here so they're always sent even if DB connection fails
$allowed_origins = [
    'https://aksharsync.com',
    'https://www.aksharsync.com',
    'http://localhost:5173',
    'http://localhost:3000',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Allow all during development — tighten in production
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// Handle OPTIONS preflight immediately — no DB needed
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Suppress PHP warnings from appearing in JSON output
error_reporting(0);
ini_set('display_errors', '0');

define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_NAME', 'akshar_db');
define('DB_USER', 'akshar_smit');    // CWP MySQL username
define('DB_PASS', '6K5FpJLy2OXl');  // ← your plain-text password here

// ── MySQLi connection ─────────────────────────────────────────
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

$conn->set_charset('utf8mb4');
