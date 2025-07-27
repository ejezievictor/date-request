<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['data'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$data = $input['data'];
$to = 'ejezievictor7@gmail.com';
$subject = '👑 Queen\'s Responses - ' . $data['sessionId'];

// Format email content
$emailContent = "👑 ROYAL DATE PROPOSAL RESPONSES 👑\n";
$emailContent .= "=====================================\n\n";
$emailContent .= "Session ID: " . $data['sessionId'] . "\n";
$emailContent .= "Timestamp: " . date('Y-m-d H:i:s', strtotime($data['timestamp'])) . "\n";
$emailContent .= "User Agent: " . $data['userAgent'] . "\n\n";
$emailContent .= "QUESTION RESPONSES:\n";
$emailContent .= "==================\n";

foreach ($data['responses'] as $index => $response) {
    $emailContent .= "\n" . ($index + 1) . ". Question " . $response['question'] . ": " . $response['questionText'] . "\n";
    $emailContent .= "   Answer: " . $response['answer'] . "\n";
    $emailContent .= "   Time: " . date('Y-m-d H:i:s', strtotime($response['timestamp'])) . "\n\n";
}

$emailContent .= "\nFINAL SPICY ANSWER:\n";
$emailContent .= "==================\n";
$emailContent .= "\"" . $data['finalAnswer'] . "\"\n\n";
$emailContent .= "SUMMARY:\n";
$emailContent .= "========\n";
$emailContent .= "Total Questions Answered: " . count($data['responses']) . "\n";
$emailContent .= "Final Answer to Eating Question: \"" . $data['finalAnswer'] . "\"\n\n";
$emailContent .= "👑💖 End of Royal Session 💖👑";

// Send email
$headers = "From: noreply@royaldateproposal.com\r\n";
$headers .= "Reply-To: noreply@royaldateproposal.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$success = mail($to, $subject, $emailContent, $headers);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
