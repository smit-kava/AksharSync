<?php
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

// 1. Get JSON Input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['name']) || !isset($data['email'])) {
    echo json_encode(["error" => "Invalid input data"]);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$phone = isset($data['phone']) ? $data['phone'] : 'N/A';
$countryCode = isset($data['countryCode']) ? $data['countryCode'] : '';
$website = isset($data['website']) ? $data['website'] : 'N/A';

// 2. Email Configuration (Settings we found earlier)
$to = "smitkava21@gmail.com";
$subject = "New Consultation Call Request from $name";
$from = "kavasmit603@gmail.com";

// 3. Prepare Email Content
$message = "
<html>
<head>
<title>New Consultation Call Request</title>
</head>
<body style='font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>
    <h2 style='color: #472187;'>New Consultation Call Request</h2>
    <hr />
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $countryCode $phone</p>
    <p><strong>Website:</strong> <a href='$website'>$website</a></p>
</body>
</html>
";

// 4. Headers for HTML Email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: AksharSync <$from>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// 5. Send Email
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true, "message" => "Email sent successfully!"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email. Check server mail logs."]);
}
?>
