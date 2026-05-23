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
// SMTP CONFIGURATION — Gmail
// ========================================
$smtp_host = 'smtp.gmail.com';           // Gmail SMTP server
$smtp_user = 'smitkava21@gmail.com';    // Gmail address (SMTP login)
$smtp_pass = str_replace(' ', '', 'ajco jaqg vcxn pkap'); // Google App Password — spaces stripped automatically
$from_email = 'smitkava21@gmail.com';    // From address (must match Gmail account)
$from_name = 'AksharSync';
$admin_email = 'smitkava21@gmail.com';   // All lead alerts delivered here

// Gmail: port 587 + STARTTLS is the standard recommended config
$configs = [
  ['port' => 587, 'secure' => PHPMailer::ENCRYPTION_STARTTLS],
  ['port' => 465, 'secure' => PHPMailer::ENCRYPTION_SMTPS],   // fallback
];

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

  // Gmail uses a valid trusted certificate
  $mail->SMTPOptions = [
    'ssl' => [
      'verify_peer' => true,
      'verify_peer_name' => true,
      'allow_self_signed' => false,
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