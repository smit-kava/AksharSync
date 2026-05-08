<?php
// ============================================================
// submit-review.php – Accept & save a client review
// URL:  POST https://aksharsync.com/api/reviews/submit-review.php
// ============================================================

// ── CORS – set here first so headers are always sent ─────────
$allowed = ['https://aksharsync.com', 'https://www.aksharsync.com', 'http://localhost:5173', 'http://localhost:3000'];
$origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
header('Access-Control-Allow-Origin: ' . (in_array($origin, $allowed, true) ? $origin : '*'));
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit(); }

require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit();
}

// ── Parse JSON body ──────────────────────────────────────────
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON body.']);
    exit();
}

// ── Sanitize & validate ──────────────────────────────────────
$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$company = trim($data['company'] ?? '');
$rating  = (int)($data['rating'] ?? 5);
$review  = trim($data['review']  ?? '');

if (empty($name) || strlen($name) > 120) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Name is required (max 120 chars).']);
    exit();
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'A valid email is required.']);
    exit();
}

if ($rating < 1 || $rating > 5) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Rating must be between 1 and 5.']);
    exit();
}

if (empty($review) || strlen($review) < 10) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Review must be at least 10 characters.']);
    exit();
}

if (strlen($review) > 2000) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Review too long (max 2000 chars).']);
    exit();
}

/* 
// ── Rate-limit: 1 review per email per 24 h ──────────────────
$checkStmt = $conn->prepare(
    "SELECT id FROM client_reviews WHERE email = ? AND created_at > NOW() - INTERVAL 24 HOUR LIMIT 1"
);
$checkStmt->bind_param('s', $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'You already submitted a review recently. Please try again after 24 hours.']);
    $checkStmt->close();
    $conn->close();
    exit();
}
$checkStmt->close();
*/

// ── Build a Gravatar avatar URL from email ───────────────────
$avatarHash = md5(strtolower($email));
$avatarUrl  = "https://www.gravatar.com/avatar/{$avatarHash}?d=identicon&s=80";

// ── Insert review (pending approval by default) ───────────────
$stmt = $conn->prepare(
    "INSERT INTO client_reviews (name, email, company, rating, review, avatar_url, is_verified, source)
     VALUES (?, ?, ?, ?, ?, ?, 0, 'website')"
);
$stmt->bind_param('sssiss', $name, $email, $company, $rating, $review, $avatarUrl);

if ($stmt->execute()) {
    $newId = $conn->insert_id;
    $stmt->close();
    $conn->close();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your review! It will appear once verified.',
        'id'      => $newId,
    ]);
} else {
    $stmt->close();
    $conn->close();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save your review. Please try again.']);
}
