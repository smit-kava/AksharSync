<?php

// ========================================
// SMTP CONNECTION TESTER — serveras.digilifes.com
// Open in browser to see which port works
// ========================================

error_reporting(E_ALL);
ini_set('display_errors', 0);

header("Content-Type: application/json");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

// ========================================
// ENV / DIRECT CONFIGURATION LOADER
// ========================================
function getEnvValue(string $key, string $default): string
{
    // 1. Check system environment variables first
    $val = getenv($key);
    if ($val !== false && $val !== '') {
        return $val;
    }
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
        return $_ENV[$key];
    }
    
    // 2. Check local/root .env file
    static $envData = null;
    if ($envData === null) {
        $envData = [];
        $possiblePaths = [
            dirname(__DIR__, 2) . '/.env.local',
            dirname(__DIR__, 2) . '/.env',
            dirname(__DIR__) . '/.env.local',
            dirname(__DIR__) . '/.env',
            __DIR__ . '/.env'
        ];
        
        foreach ($possiblePaths as $path) {
            if (file_exists($path) && is_readable($path)) {
                $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if (empty($line) || strpos($line, '#') === 0) {
                        continue;
                    }
                    if (strpos($line, '=') !== false) {
                        list($name, $value) = explode('=', $line, 2);
                        $name = trim($name);
                        $value = trim($value);
                        // Strip quotes if present
                        if ((strpos($value, '"') === 0 && strrpos($value, '"') === strlen($value) - 1) ||
                            (strpos($value, "'") === 0 && strrpos($value, "'") === strlen($value) - 1)) {
                            $value = substr($value, 1, -1);
                        }
                        $envData[$name] = $value;
                    }
                }
                break; // Stop at the first successfully parsed file
            }
        }
    }
    
    if (isset($envData[$key]) && $envData[$key] !== '') {
        return $envData[$key];
    }
    
    return $default;
}

// ========================================
// YOUR CREDENTIALS
// ========================================

$host = getEnvValue('EMAIL_HOST', 'smtp.gmail.com');
$user = getEnvValue('EMAIL_USER', 'support@aksharsync.com');
$pass = getEnvValue('EMAIL_PASS', 'uhpr hwdc rohi ypgj');

// ========================================
// TEST ALL PORT/ENCRYPTION COMBOS
// ========================================

$configs = [
    ['label' => 'smtp.gmail.com:465 (SMTPS/SSL)', 'port' => 465, 'secure' => PHPMailer::ENCRYPTION_SMTPS],
    ['label' => 'smtp.gmail.com:587 (STARTTLS)', 'port' => 587, 'secure' => PHPMailer::ENCRYPTION_STARTTLS],
];

$results = [];
$working_config = null;

foreach ($configs as $cfg) {

    ob_start();

    $mail = new PHPMailer(true);

    try {

        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host = $host;
        $mail->Port = $cfg['port'];
        $mail->SMTPAuth = true;
        $mail->Username = $user;
        $mail->Password = $pass;
        $mail->SMTPSecure = $cfg['secure'];
        $mail->Timeout = 10;
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            ]
        ];

        if ($mail->smtpConnect()) {
            $mail->smtpClose();
            $debug = ob_get_clean();
            $results[] = [
                "config" => $cfg['label'],
                "success" => true,
                "message" => "✅ Connected and authenticated!",
                "debug" => $debug,
            ];
            if (!$working_config)
                $working_config = $cfg['label'];
        } else {
            $debug = ob_get_clean();
            $results[] = [
                "config" => $cfg['label'],
                "success" => false,
                "message" => "❌ Failed: " . $mail->ErrorInfo,
                "debug" => $debug,
            ];
        }

    } catch (Exception $e) {
        $debug = ob_get_clean();
        $results[] = [
            "config" => $cfg['label'],
            "success" => false,
            "message" => "❌ Exception: " . $e->getMessage(),
            "debug" => $debug,
        ];
    }

    unset($mail);
}

echo json_encode([
    "smtp_host" => $host,
    "smtp_user" => $user,
    "working_config" => $working_config ?? "❌ None — all configs failed",
    "results" => $results,
], JSON_PRETTY_PRINT);
?>