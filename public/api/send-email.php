<?php

// ========================================
// ERROR REPORTING (disable in production)
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
// LOAD PHPMailer
// ========================================

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

// ========================================
// SMTP CONFIGURATION
// ========================================
// Your CWP routes mail through: serveras.digilifes.com
// Auth username = support@aksharsync.com (your webmail account)
// NOT localhost — that's why you were getting "Connection refused"
// ========================================

$smtp_host = "smtp.gmail.com";           // ✅ Google SMTP Server
$smtp_port = 465;                        // Try 465 first (SSL)
$smtp_user = "kavasmit603@gmail.com";    // ✅ Your Gmail address
$smtp_pass = "sxcn veug mmsz rlhc";   // ✅ Your 16-character Google App Password
$from_email = "kavasmit603@gmail.com";   // ✅ Gmail requires this to match your user email
$from_name = "Akshar Sync Contact Form"; // ✅ Clear display name
$email_to = "kavasmit603@gmail.com";     // ✅ All emails will be sent here

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
// BUILD EMAIL CONTENT
// ========================================

$subject = "New Consultation Call Request";

$html_body = '
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px;">
    <h2 style="color:#472187;margin-top:0;">New Consultation Call Request</h2>
    <hr style="border:none;border-top:1px solid #e0e0e0;margin:16px 0;">
    <table style="width:100%;border-collapse:collapse;">
        <tr>
            <td style="padding:8px 0;font-weight:bold;color:#555;width:110px;">Name:</td>
            <td style="padding:8px 0;color:#222;">' . htmlspecialchars($name) . '</td>
        </tr>
        <tr>
            <td style="padding:8px 0;font-weight:bold;color:#555;">Email:</td>
            <td style="padding:8px 0;color:#222;">' . htmlspecialchars($userEmail) . '</td>
        </tr>
        <tr>
            <td style="padding:8px 0;font-weight:bold;color:#555;">Phone:</td>
            <td style="padding:8px 0;color:#222;">' . htmlspecialchars($countryCode . ' ' . $phone) . '</td>
        </tr>
        <tr>
            <td style="padding:8px 0;font-weight:bold;color:#555;">Website:</td>
            <td style="padding:8px 0;color:#222;">' . htmlspecialchars($website) . '</td>
        </tr>
    </table>
    <hr style="border:none;border-top:1px solid #e0e0e0;margin:16px 0;">
    <p style="font-size:12px;color:#999;margin:0;">Sent from aksharsync.com contact form</p>
</div>';

$plain_body = "New Consultation Call Request\n\n"
    . "Name: $name\n"
    . "Email: $userEmail\n"
    . "Phone: $countryCode $phone\n"
    . "Website: $website\n";

// ========================================
// SEND VIA PHPMailer
// Tries 465/SMTPS first, then 587/STARTTLS
// ========================================

$configs = [
    ['port' => 465, 'secure' => PHPMailer::ENCRYPTION_SMTPS],    // SSL — try first
    ['port' => 587, 'secure' => PHPMailer::ENCRYPTION_STARTTLS], // TLS — fallback
];

$last_error = '';

foreach ($configs as $cfg) {

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host = $smtp_host;
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_user;
        $mail->Password = $smtp_pass;
        $mail->SMTPSecure = $cfg['secure'];
        $mail->Port = $cfg['port'];
        $mail->CharSet = 'UTF-8';
        $mail->Timeout = 15;
        $mail->SMTPDebug = SMTP::DEBUG_OFF;

        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            ]
        ];

        $mail->setFrom($from_email, $from_name);
        $mail->addAddress($email_to);
        $mail->addReplyTo($userEmail, $name);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $html_body;
        $mail->AltBody = $plain_body;

        $mail->send();

        // Success
        echo json_encode(["success" => true, "message" => "Email sent successfully"]);
        exit;

    } catch (Exception $e) {
        $last_error = $mail->ErrorInfo;
    }

    unset($mail);
}

// All configs failed
echo json_encode([
    "success" => false,
    "message" => "Could not send email. Please contact us at support@aksharsync.com",
    "debug" => $last_error  // ← Remove this line once working
]);
?>