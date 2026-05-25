<?php

// ========================================
// ERROR REPORTING
// ========================================
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// ========================================
// HEADERS
// ========================================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(["success" => false, "message" => "Only POST method allowed"]);
  exit;
}

// ========================================
// LOAD PHPMailer & EMAIL TEMPLATES
// ========================================
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';
require __DIR__ . '/emailTemplates.php';

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
// SMTP CONFIGURATION — Gmail
// ========================================
$smtp_host = getEnvValue('EMAIL_HOST', 'smtp.gmail.com');
$smtp_user = getEnvValue('EMAIL_USER', 'support@aksharsync.com');
$smtp_pass = str_replace(' ', '', getEnvValue('EMAIL_PASS', 'uhpr hwdc rohi ypgj'));
$from_email = getEnvValue('EMAIL_USER', 'support@aksharsync.com');
$from_name = 'AksharSync';
$admin_email = getEnvValue('EMAIL_TO', 'support@aksharsync.com');

// Dynamic port loader & secure protocol resolver (supports Gmail + custom SMTP hosts like mail.etechinter.com)
$env_port = (int)getEnvValue('EMAIL_PORT', '465');
$env_secure_str = strtolower(getEnvValue('EMAIL_SECURE', 'true'));
$env_secure = ($env_secure_str === 'true' || $env_secure_str === 'ssl' || $env_port === 465) 
  ? PHPMailer::ENCRYPTION_SMTPS 
  : PHPMailer::ENCRYPTION_STARTTLS;

$configs = [
  ['port' => $env_port, 'secure' => $env_secure]
];

// Fallback configs to try standard secure ports if different from the primary env port
if ($env_port !== 587) {
  $configs[] = ['port' => 587, 'secure' => PHPMailer::ENCRYPTION_STARTTLS];
}
if ($env_port !== 465) {
  $configs[] = ['port' => 465, 'secure' => PHPMailer::ENCRYPTION_SMTPS];
}

// ========================================
// GET & VALIDATE JSON INPUT
// ========================================
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data) {
  echo json_encode(["success" => false, "message" => "Invalid JSON request"]);
  exit;
}

$name = trim($data['name'] ?? '');
$userEmail = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$countryCode = trim($data['countryCode'] ?? '');
$website = trim($data['website'] ?? '');
$bookingDate = trim($data['bookingDate'] ?? '');
$bookingTime = trim($data['bookingTime'] ?? '');
$notes = trim($data['notes'] ?? '');

if (empty($name)) {
  echo json_encode(["success" => false, "message" => "Name is required"]);
  exit;
}
if (empty($userEmail) || !filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["success" => false, "message" => "Valid email is required"]);
  exit;
}

// ========================================
// HELPER: build a configured PHPMailer instance
// ========================================
function buildMailer(array $cfg, string $smtp_host, string $smtp_user, string $smtp_pass, string $from_email, string $from_name, string &$debugLog): PHPMailer
{
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = $smtp_host;
  $mail->SMTPAuth = true;
  $mail->Username = $smtp_user;
  $mail->Password = $smtp_pass;
  $mail->SMTPSecure = $cfg['secure'];
  $mail->Port = $cfg['port'];
  $mail->CharSet = 'UTF-8';
  $mail->Timeout = 15;

  // Capture SMTP conversation into $debugLog (never printed to screen)
  $mail->SMTPDebug = SMTP::DEBUG_SERVER;
  $mail->Debugoutput = function (string $str) use (&$debugLog): void {
    $debugLog .= $str . "\n";
  };

  // Bypass peer-verification. This is CRITICAL for custom corporate mail servers
  // (like etechinter.com or aksharsync.com on shared/CWP hosting) which may use self-signed certificates
  // or face local PHP trust-bundle configuration issues.
  $mail->SMTPOptions = [
    'ssl' => [
      'verify_peer' => false,
      'verify_peer_name' => false,
      'allow_self_signed' => true,
    ]
  ];
  $mail->setFrom($from_email, $from_name);
  return $mail;
}

// ========================================
// BUILD EMAIL PAYLOADS (via emailTemplates.php)
// ========================================
$formData = [
  'name' => $name,
  'email' => $userEmail,
  'phone' => $phone,
  'countryCode' => $countryCode,
  'website' => $website,
  'bookingDate' => $bookingDate,
  'bookingTime' => $bookingTime,
  'notes' => $notes,
];

$userPayload = buildUserConfirmationEmail($formData);
$adminPayload = buildAdminNotificationEmail($formData);

// ========================================
// SEND BOTH EMAILS
// ========================================
$last_error = '';
$debugLog = '';

foreach ($configs as $cfg) {
  try {
    // --- Admin notification ---
    $mail1 = buildMailer($cfg, $smtp_host, $smtp_user, $smtp_pass, $from_email, $from_name, $debugLog);
    $mail1->addAddress($admin_email);
    $mail1->addReplyTo($userEmail, $name);
    $mail1->isHTML(true);
    $mail1->Subject = $adminPayload['subject'];
    $mail1->Body = $adminPayload['html'];
    $mail1->AltBody = $adminPayload['plain'];
    $mail1->send();

    // --- User confirmation ---
    $mail2 = buildMailer($cfg, $smtp_host, $smtp_user, $smtp_pass, $from_email, $from_name, $debugLog);
    $mail2->addAddress($userEmail, $name);
    $mail2->isHTML(true);
    $mail2->Subject = $userPayload['subject'];
    $mail2->Body = $userPayload['html'];
    $mail2->AltBody = $userPayload['plain'];
    $mail2->send();

    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
    exit;

  } catch (Exception $e) {
    $last_error = isset($mail1) ? $mail1->ErrorInfo : $e->getMessage();
  } catch (\Throwable $e) {
    $last_error = $e->getMessage();
  }

  unset($mail1, $mail2);
}

// All configs failed — return the SMTP error for diagnosis
echo json_encode([
  "success" => false,
  "message" => "Could not send email. Please contact us at support@aksharsync.com",
  "smtp_error" => $last_error,
  "smtp_debug" => substr($debugLog, 0, 2000),
]);
?>