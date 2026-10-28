<?php
// ============================================================
// get-blogs.php – Public API to fetch published blogs & single post
// Path on CWP: /home/akshar/public_html/api/blogs/get-blogs.php
// ============================================================

require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit();
}

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : null;

// ── Case 1: Fetch Single Blog by Slug ────────────────────────
if (!empty($slug)) {
    $stmt = $conn->prepare('SELECT * FROM blogs WHERE slug = ? AND status = "published" LIMIT 1');
    $stmt->bind_param('s', $slug);
    $stmt->execute();
    $result = $stmt->get_result();
    $blog = $result->fetch_assoc();
    $stmt->close();

    if (!$blog) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Blog article not found.']);
        exit();
    }

    // Increment view count
    $updateViews = $conn->prepare('UPDATE blogs SET views = views + 1 WHERE id = ?');
    $updateViews->bind_param('i', $blog['id']);
    $updateViews->execute();
    $updateViews->close();
    $blog['views'] = (int)$blog['views'] + 1;

    // Fetch related articles
    $relatedStmt = $conn->prepare('
        SELECT id, title, slug, excerpt, cover_image, category, author_name, read_time, published_at 
        FROM blogs 
        WHERE status = "published" AND category = ? AND id != ? 
        ORDER BY published_at DESC 
        LIMIT 3
    ');
    $relatedStmt->bind_param('si', $blog['category'], $blog['id']);
    $relatedStmt->execute();
    $relResult = $relatedStmt->get_result();
    $related = [];
    while ($row = $relResult->fetch_assoc()) {
        $related[] = $row;
    }
    $relatedStmt->close();

    echo json_encode([
        'success' => true,
        'blog' => $blog,
        'related' => $related
    ]);
    exit();
}

// ── Case 2: Fetch Blog Listing with Filters & Pagination ─────
$category = isset($_GET['category']) && $_GET['category'] !== 'All' ? trim($_GET['category']) : null;
$search = isset($_GET['search']) ? trim($_GET['search']) : null;
$tag = isset($_GET['tag']) ? trim($_GET['tag']) : null;
$page = max(1, (int)($_GET['page'] ?? 1));
$limit = max(1, min(50, (int)($_GET['limit'] ?? 9)));
$offset = ($page - 1) * $limit;

$whereClauses = ['status = "published"'];

if (!empty($category)) {
    $catEscaped = $conn->real_escape_string($category);
    $whereClauses[] = "category = '$catEscaped'";
}

if (!empty($tag)) {
    $tagEscaped = $conn->real_escape_string($tag);
    $whereClauses[] = "tags LIKE '%$tagEscaped%'";
}

if (!empty($search)) {
    $searchEscaped = $conn->real_escape_string($search);
    $whereClauses[] = "(title LIKE '%$searchEscaped%' OR excerpt LIKE '%$searchEscaped%' OR content LIKE '%$searchEscaped%' OR tags LIKE '%$searchEscaped%')";
}

$whereSql = implode(' AND ', $whereClauses);

// Count total matching blogs
$countRes = $conn->query("SELECT COUNT(*) as total FROM blogs WHERE $whereSql");
$totalRow = $countRes ? $countRes->fetch_assoc() : ['total' => 0];
$total = (int)($totalRow['total'] ?? 0);

// Fetch paginated blogs
$query = "SELECT id, title, slug, excerpt, cover_image, category, tags, author_name, author_avatar, read_time, views, published_at, created_at 
          FROM blogs 
          WHERE $whereSql 
          ORDER BY published_at DESC 
          LIMIT $limit OFFSET $offset";
$blogsRes = $conn->query($query);
$blogs = [];
if ($blogsRes) {
    while ($b = $blogsRes->fetch_assoc()) {
        $blogs[] = $b;
    }
}

// Fetch distinct categories with count
$catRes = $conn->query('
    SELECT category, COUNT(*) as count 
    FROM blogs 
    WHERE status = "published" 
    GROUP BY category 
    ORDER BY count DESC
');
$categoriesWithCount = [];
if ($catRes) {
    while ($c = $catRes->fetch_assoc()) {
        $categoriesWithCount[] = [
            'category' => $c['category'],
            'count' => (int)$c['count']
        ];
    }
}

echo json_encode([
    'success' => true,
    'blogs' => $blogs,
    'total' => $total,
    'page' => $page,
    'limit' => $limit,
    'totalPages' => ceil($total / $limit) ?: 1,
    'categories' => $categoriesWithCount
]);
