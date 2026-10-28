<?php
// ============================================================
// upload-image.php – Secure Image Uploader for Blog Images
// Path on CWP: /home/akshar/public_html/api/blogs/upload-image.php
// ============================================================

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth-middleware.php';

// Verify superadmin
$admin = verifyAdmin($conn);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit();
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    $errCode = $_FILES['image']['error'] ?? 'NONE';
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No image file uploaded or upload error occurred. Error code: ' . $errCode
    ]);
    exit();
}

$file = $_FILES['image'];
$maxSize = 10 * 1024 * 1024; // 10MB

if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Image exceeds maximum permitted size of 10MB.']);
    exit();
}

$allowedMimeTypes = [
    'image/jpeg'    => 'jpg',
    'image/jpg'     => 'jpg',
    'image/png'     => 'png',
    'image/webp'    => 'webp',
    'image/svg+xml' => 'svg',
    'image/gif'     => 'gif'
];

$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'];

// Safe MIME detection with multiple fallbacks
$mimeType = '';
if (class_exists('finfo')) {
    try {
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($file['tmp_name']);
    } catch (Exception $e) {
        $mimeType = '';
    }
}
if (empty($mimeType) && function_exists('mime_content_type')) {
    $mimeType = @mime_content_type($file['tmp_name']);
}
if (empty($mimeType)) {
    $mimeType = $file['type'] ?? '';
}

$origExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!array_key_exists($mimeType, $allowedMimeTypes) && !in_array($origExt, $allowedExtensions, true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid file format. Allowed: JPG, PNG, WebP, SVG, GIF.']);
    exit();
}

$ext = $allowedMimeTypes[$mimeType] ?? ($origExt ?: 'jpg');

// Target directory priority:
// 1. /home/akshar/public_html/uploads/blogs/
// 2. Fallback to /home/akshar/public_html/api/blogs/uploads/
$uploadDir = dirname(__DIR__, 2) . '/uploads/blogs/';
$publicPrefix = '/uploads/blogs/';

if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0777, true);
}

if (!is_writable($uploadDir)) {
    $uploadDir = __DIR__ . '/uploads/';
    $publicPrefix = '/api/blogs/uploads/';
    if (!is_dir($uploadDir)) {
        @mkdir($uploadDir, 0777, true);
    }
}

$filename = 'blog_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$targetPath = rtrim($uploadDir, '/') . '/' . $filename;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    @chmod($targetPath, 0644);
    $publicUrl = $publicPrefix . $filename;

    echo json_encode([
        'success' => true,
        'message' => 'Image uploaded successfully.',
        'url' => $publicUrl,
        'filename' => $filename
    ]);
    exit();
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save uploaded file to disk. Please ensure uploads directory is writable (chmod 755 or 777).'
    ]);
    exit();
}
