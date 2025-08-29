<?php
header('Content-Type: application/json');
require_once 'db/db.php';

if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'Member ID is required']);
    exit;
}

$memberId = $_GET['id'];

try {
    $stmt = $pdo->prepare("
        SELECT m.*, b.name as branch_name 
        FROM members m 
        LEFT JOIN branch b ON m.branch = b.id 
        WHERE m.id = ?
    ");
    $stmt->execute([$memberId]);
    $member = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($member) {
        // Fix photo path to use correct folder structure
        if ($member['photo'] && $member['photo'] !== 'images/members/.png') {
            // Convert old path to new path structure
            $photoPath = $member['photo'];
            if (strpos($photoPath, 'images/members/') === 0) {
                // Ensure consistent path with lowercase 'images'
                $member['photo'] = str_replace('images/members/', 'scripts/images/members/', $photoPath);
            } elseif (strpos($photoPath, 'Images/members/') === 0) {
                // Update to use consistent lowercase 'images' path
                $member['photo'] = str_replace('Images/', 'images/', $photoPath);
                $member['photo'] = 'scripts/' . $member['photo'];
            }
        }
        
        echo json_encode(['success' => true, 'data' => $member]);
    } else {
        echo json_encode(['error' => 'Member not found']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
