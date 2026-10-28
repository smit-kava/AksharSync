<?php
// ============================================================
// manage-blog.php – Superadmin CRUD Operations for Blogs
// Path on CWP: /home/akshar/public_html/api/blogs/manage-blog.php
// ============================================================

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth-middleware.php';

// Verify superadmin token
$admin = verifyAdmin($conn);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $_GET['action'] ?? null;

function generateSlug($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    return empty($text) ? 'blog-' . time() : $text;
}

// ── 1. GET: Fetch Blogs or Single Blog for Editing ───────────
if ($method === 'GET') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

    if ($id) {
        $stmt = $conn->prepare('SELECT * FROM blogs WHERE id = ? LIMIT 1');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $blog = $result->fetch_assoc();
        $stmt->close();

        if (!$blog) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Blog not found.']);
            exit();
        }

        echo json_encode(['success' => true, 'blog' => $blog]);
        exit();
    }

    // Fetch summary statistics
    $statsRes = $conn->query('
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = "published" THEN 1 ELSE 0 END) as published,
            SUM(CASE WHEN status = "draft" THEN 1 ELSE 0 END) as drafts,
            COALESCE(SUM(views), 0) as total_views
        FROM blogs
    ');
    $stats = $statsRes ? $statsRes->fetch_assoc() : [
        'total' => 0, 'published' => 0, 'drafts' => 0, 'total_views' => 0
    ];

    $where = [];
    $status = isset($_GET['status']) ? trim($_GET['status']) : null;
    $search = isset($_GET['search']) ? trim($_GET['search']) : null;

    if (!empty($status) && $status !== 'all') {
        $stEscaped = $conn->real_escape_string($status);
        $where[] = "status = '$stEscaped'";
    }
    if (!empty($search)) {
        $sEscaped = $conn->real_escape_string($search);
        $where[] = "(title LIKE '%$sEscaped%' OR category LIKE '%$sEscaped%' OR tags LIKE '%$sEscaped%')";
    }

    $sql = 'SELECT id, title, slug, cover_image, category, status, views, read_time, author_name, published_at, created_at, updated_at FROM blogs';
    if (!empty($where)) {
        $sql .= ' WHERE ' . implode(' AND ', $where);
    }
    $sql .= ' ORDER BY id DESC';

    $blogsRes = $conn->query($sql);
    $blogs = [];
    if ($blogsRes) {
        while ($b = $blogsRes->fetch_assoc()) {
            $blogs[] = $b;
        }
    }

    echo json_encode([
        'success' => true,
        'stats' => [
            'total' => (int)($stats['total'] ?? 0),
            'published' => (int)($stats['published'] ?? 0),
            'drafts' => (int)($stats['drafts'] ?? 0),
            'total_views' => (int)($stats['total_views'] ?? 0),
        ],
        'blogs' => $blogs
    ]);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (!$data) {
    $data = $_POST;
}

// ── 2. DELETE: Remove a Blog Article ─────────────────────────
if ($method === 'DELETE' || ($method === 'POST' && $action === 'delete')) {
    $id = (int)($data['id'] ?? $_GET['id'] ?? 0);
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Valid blog ID is required.']);
        exit();
    }

    $stmt = $conn->prepare('DELETE FROM blogs WHERE id = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => true, 'message' => 'Blog article successfully deleted.']);
    exit();
}

// ── 3. PUT / POST ?action=update: Update Existing Blog ───────
if ($method === 'PUT' || ($method === 'POST' && $action === 'update')) {
    $id = (int)($data['id'] ?? $_GET['id'] ?? 0);
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Valid blog ID is required.']);
        exit();
    }

    $title = trim($data['title'] ?? '');
    $slug = trim($data['slug'] ?? '');
    $content = trim($data['content'] ?? '');
    $excerpt = trim($data['excerpt'] ?? '');
    $category = trim($data['category'] ?? 'Lifecycle & Automation');
    $tags = trim($data['tags'] ?? '');
    $cover_image = trim($data['cover_image'] ?? '');
    $author_name = trim($data['author_name'] ?? 'AksharSync Team');
    $author_avatar = trim($data['author_avatar'] ?? '');
    $read_time = trim($data['read_time'] ?? '5 min read');
    $status = in_array($data['status'] ?? '', ['draft', 'published', 'archived']) ? $data['status'] : 'published';
    $seo_title = trim($data['seo_title'] ?? $title);
    $seo_description = trim($data['seo_description'] ?? $excerpt);

    if (empty($title) || empty($content)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Title and content are required.']);
        exit();
    }

    if (empty($slug)) {
        $slug = generateSlug($title);
    }

    $stmt = $conn->prepare('
        UPDATE blogs SET 
            title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?,
            category = ?, tags = ?, author_name = ?, author_avatar = ?,
            read_time = ?, status = ?, seo_title = ?, seo_description = ?
        WHERE id = ?
    ');
    $stmt->bind_param(
        'sssssssssssssi',
        $title, $slug, $excerpt, $content, $cover_image,
        $category, $tags, $author_name, $author_avatar,
        $read_time, $status, $seo_title, $seo_description,
        $id
    );
    $stmt->execute();
    $stmt->close();

    echo json_encode([
        'success' => true,
        'message' => 'Blog updated successfully.',
        'slug' => $slug
    ]);
    exit();
}

// ── 4. POST: Create New Blog Article ─────────────────────────
if ($method === 'POST') {
    $title = trim($data['title'] ?? '');
    $slug = trim($data['slug'] ?? '');
    $content = trim($data['content'] ?? '');
    $excerpt = trim($data['excerpt'] ?? '');
    $category = trim($data['category'] ?? 'Lifecycle & Automation');
    $tags = trim($data['tags'] ?? '');
    $cover_image = trim($data['cover_image'] ?? '');
    $author_name = trim($data['author_name'] ?? 'AksharSync Team');
    $author_avatar = trim($data['author_avatar'] ?? '');
    $read_time = trim($data['read_time'] ?? '5 min read');
    $status = in_array($data['status'] ?? '', ['draft', 'published', 'archived']) ? $data['status'] : 'published';
    $seo_title = trim($data['seo_title'] ?? $title);
    $seo_description = trim($data['seo_description'] ?? $excerpt);

    if (empty($title) || empty($content)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Title and content are required.']);
        exit();
    }

    if (empty($slug)) {
        $slug = generateSlug($title);
    }

    // Check slug collision
    $checkSlug = $conn->prepare('SELECT id FROM blogs WHERE slug = ? LIMIT 1');
    $checkSlug->bind_param('s', $slug);
    $checkSlug->execute();
    $checkRes = $checkSlug->get_result();
    if ($checkRes->fetch_assoc()) {
        $slug .= '-' . time();
    }
    $checkSlug->close();

    $stmt = $conn->prepare('
        INSERT INTO blogs (
            title, slug, excerpt, content, cover_image,
            category, tags, author_name, author_avatar,
            read_time, status, seo_title, seo_description, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ');
    $stmt->bind_param(
        'sssssssssssss',
        $title, $slug, $excerpt, $content, $cover_image,
        $category, $tags, $author_name, $author_avatar,
        $read_time, $status, $seo_title, $seo_description
    );
    
    if ($stmt->execute()) {
        $newId = $conn->insert_id;
        $stmt->close();

        echo json_encode([
            'success' => true,
            'message' => 'Blog created successfully.',
            'id' => $newId,
            'slug' => $slug
        ]);
        exit();
    } else {
        $errorMsg = $stmt->error;
        $stmt->close();
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $errorMsg]);
        exit();
    }
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
