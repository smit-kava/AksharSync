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
// YOUR CREDENTIALS
// ========================================

$host = "smtp.gmail.com";
$user = "kavasmit603@gmail.com";
$pass = "sxcn veug mmsz rlhc";

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