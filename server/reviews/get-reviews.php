<?php
// ============================================================
// get-reviews.php – Fetch approved client reviews
// URL:  GET https://aksharsync.com/api/reviews/get-reviews.php
// Optional query params:
//   ?limit=20      (default 20, max 50)
//   ?offset=0      (for pagination)
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

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit();
}

// ── Pagination params ─────────────────────────────────────────
$limit = min((int) ($_GET['limit'] ?? 20), 50);
$offset = max((int) ($_GET['offset'] ?? 0), 0);

// ── Fetch only approved (verified) reviews ────────────────────
$stmt = $conn->prepare(
    "SELECT id, name, company, rating, review, avatar_url, created_at
     FROM client_reviews
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?"
);
$stmt->bind_param('ii', $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();

$reviews = [];
while ($row = $result->fetch_assoc()) {
    $reviews[] = [
        'id' => (int) $row['id'],
        'name' => $row['name'],
        'company' => $row['company'],
        'rating' => (int) $row['rating'],
        'review' => $row['review'],
        'avatar_url' => $row['avatar_url'],
        'date' => date('Y-m-d', strtotime($row['created_at'])),
    ];
}

// ── Total count (for pagination) ──────────────────────────────
$countResult = $conn->query("SELECT COUNT(*) as total FROM client_reviews");
$totalRow = $countResult->fetch_assoc();
$total = (int) $totalRow['total'];

// ── Average rating ────────────────────────────────────────────
$avgResult = $conn->query("SELECT ROUND(AVG(rating),1) as avg_rating FROM client_reviews");
$avgRow = $avgResult->fetch_assoc();
$avgRating = (float) ($avgRow['avg_rating'] ?? 0);

$stmt->close();
$conn->close();

echo json_encode([
    'success' => true,
    'reviews' => $reviews,
    'total' => $total,
    'avg_rating' => $avgRating,
    'limit' => $limit,
    'offset' => $offset,
]);
