<?php
// ENABLE ERROR REPORTING FOR DEBUGGING
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// 1. Load PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

// 2. DIRECT SETTINGS (Google Workspace SMTP)
$smtp_host = "smtp.gmail.com";
$smtp_port = 587; 
$smtp_user = "support@aksharsync.com";
$smtp_pass = "gtjunbdmannooida"; 
$email_to  = "kavasmit603@gmail.com";

// 3. Get JSON Input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['name']) || !isset($data['email'])) {
    echo json_encode(["error" => "Invalid input data. Name and Email are required."]);
    exit;
}

$name = $data['name'];
$userEmail = $data['email'];
$phone = $data['phone'] ?? 'N/A';
$countryCode = $data['countryCode'] ?? '';
$website = $data['website'] ?? 'N/A';

// 4. Send using PHPMailer (SMTP)
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $smtp_host;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtp_user;
    $mail->Password   = $smtp_pass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
    $mail->Port       = $smtp_port;
    $mail->SMTPAutoTLS = true;

    // Optional: Bypass SSL verification for non-secure testing
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Recipients
    $mail->setFrom($smtp_user, 'AksharSync Contact Form');
    $mail->addAddress($email_to);
    $mail->addReplyTo($userEmail, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Consultation Call Request from $name";
    
    $mail->Body = "
        <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>
            <h2 style='color: #472187;'>New Consultation Call Request</h2>
            <hr />
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $userEmail</p>
            <p><strong>Phone:</strong> $countryCode $phone</p>
            <p><strong>Website:</strong> <a href='$website'>$website</a></p>
        </div>
    ";

    $mail->send();
    echo json_encode(["success" => true, "message" => "Email sent successfully!"]);

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Server Error: " . $e->getMessage(),
        "mailer_error" => $mail->ErrorInfo
    ]);
}
?>
