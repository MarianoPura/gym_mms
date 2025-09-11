<?php 
header ('Content-Type: application/json');
require "db/db.php";
include 'phpqrcode/qrlib.php';

$q = $_GET ['q'] ?? null;
$page  = isset($_GET['page'])  ? (int) $_GET['page']  : 1;
$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

if ($q) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM members
                       WHERE fname LIKE :q
                       OR lname LIKE :q
                       OR card_no LIKE :q");
    $stmt->execute([':q' => "%$q%"]);
    $total = $stmt->fetchColumn();

    $stmt = $pdo->prepare("SELECT m.*, b.name as branch_name, b.short_num as branch_short_num FROM members m 
                           LEFT JOIN branch b ON m.branch = b.id
                           WHERE m.fname LIKE :q 
                              OR m.lname LIKE :q 
                              OR m.card_no LIKE :q
                           ORDER BY m.id DESC 
                           LIMIT :limit OFFSET :offset");
    $stmt->bindValue(':q', "%$q%", PDO::PARAM_STR);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
}

else {
    $stmt = $pdo->query("SELECT COUNT(*) FROM members");
    $total = $stmt->fetchColumn();

    $stmt = $pdo->prepare("SELECT m.*, b.name as branch_name, b.short_num as branch_short_num FROM members m 
                            LEFT JOIN branch b ON m.branch = b.id
                            ORDER BY m.id DESC 
                            LIMIT :limit OFFSET :offset");
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
}

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

function generatehash($cardNum){
    $md5=md5($cardNum);
    $prefix= substr($md5, 5,5);
    $posfix=substr($md5, 15,8);
    $hash=$prefix.$md5.$posfix.$cardNum;
    return $hash;
}

    $qrCodes = [];
    foreach ($rows as $row) {
    $cardNum = $row['id'];
    $qrContent = 'https://54.179.49.80/armanisfitness/memberscam/?uid=' . generatehash($cardNum) . '&name=' . urlencode($row['fname'] . ' ' . $row['lname']);
    
    ob_start();
    QRcode::png($qrContent, false, QR_ECLEVEL_H, 3, 1);
    $qrImage = ob_get_contents();
    ob_end_clean();
    
    $qrCodes[$cardNum] = base64_encode($qrImage);
}

echo json_encode([
    "data"  => $rows,
    "total" => $total,
    "page"  => $page,
    "limit" => $limit,
    "qrCodes" => $qrCodes
]);
?>