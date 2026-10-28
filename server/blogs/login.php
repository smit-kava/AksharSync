<?php
// ============================================================
// login.php – Superadmin authentication & session verification
// Path on CWP: /home/akshar/public_html/api/blogs/login.php
// ============================================================

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth-middleware.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// ── GET: Validate active session ─────────────────────────────
if ($method === 'GET' && isset($_GET['action']) && $_GET['action'] === 'me') {
    $admin = verifyAdmin($conn);
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $admin['id'],
            'username' => $admin['username'],
            'email' => $admin['email'],
            'role' => $admin['role']
        ]
    ]);
    exit();
}

// ── POST: Authenticate Superadmin ────────────────────────────
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        $data = $_POST;
    }

    $loginIdentifier = trim($data['identifier'] ?? $data['username'] ?? $data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    if (empty($loginIdentifier) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Username/email and password are required.']);
        exit();
    }

    // ── Lookup user in database ──────────────────────────────────
    $stmt = $conn->prepare('SELECT id, username, email, password_hash, role FROM admin_users WHERE username = ? OR email = ? LIMIT 1');
    $stmt->bind_param('ss', $loginIdentifier, $loginIdentifier);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    $isPasswordValid = false;

    if ($user) {
        $dbHash = trim($user['password_hash']);

        // 1. Plaintext match (e.g. smit@123456 entered directly in phpMyAdmin)
        if ($dbHash === $password) {
            $isPasswordValid = true;
            // Upgrade password_hash column to secure bcrypt
            $newHash = password_hash($password, PASSWORD_BCRYPT);
            $conn->query("UPDATE admin_users SET password_hash = '" . $conn->real_escape_string($newHash) . "' WHERE id = " . (int)$user['id']);
        }
        // 2. Standard bcrypt verify
        elseif (password_verify($password, $dbHash)) {
            $isPasswordValid = true;
        }
        // 3. Fallback for smit@123456 or Admin@Akshar2026! on superadmin account
        elseif (in_array($password, ['smit@123456', 'Admin@Akshar2026!'], true) && in_array(strtolower($loginIdentifier), ['superadmin', 'smitkava21@gmail.com', 'admin@aksharsync.com'], true)) {
            $isPasswordValid = true;
            $newHash = password_hash($password, PASSWORD_BCRYPT);
            $conn->query("UPDATE admin_users SET password_hash = '" . $conn->real_escape_string($newHash) . "' WHERE id = " . (int)$user['id']);
        }
    } else {
        // If user table was empty or not seeded yet:
        if (in_array($password, ['smit@123456', 'Admin@Akshar2026!'], true) && in_array(strtolower($loginIdentifier), ['superadmin', 'smitkava21@gmail.com', 'admin@aksharsync.com'], true)) {
            $newHash = password_hash($password, PASSWORD_BCRYPT);
            $insertStmt = $conn->prepare('INSERT INTO admin_users (username, email, password_hash, role) VALUES (?, ?, ?, ?)');
            $u = 'superadmin';
            $e = 'smitkava21@gmail.com';
            $r = 'superadmin';
            $insertStmt->bind_param('ssss', $u, $e, $newHash, $r);
            $insertStmt->execute();
            $newId = $conn->insert_id;
            $insertStmt->close();

            $user = [
                'id' => $newId,
                'username' => 'superadmin',
                'email' => 'smitkava21@gmail.com',
                'role' => 'superadmin'
            ];
            $isPasswordValid = true;
        }
    }

    if (!$isPasswordValid || !$user) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid username/email or password.']);
        exit();
    }

    // Generate secure auth token (valid for 24 hours with auto-logout)
    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

    $updateStmt = $conn->prepare('UPDATE admin_users SET auth_token = ?, token_expires_at = ? WHERE id = ?');
    $updateStmt->bind_param('ssi', $token, $expiresAt, $user['id']);
    $updateStmt->execute();
    $updateStmt->close();

    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'expires_at' => $expiresAt,
        'user' => [
            'id' => (int)$user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'role' => $user['role']
        ]
    ]);
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
