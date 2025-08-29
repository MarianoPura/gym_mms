<?php 
header ('Content-Type: application/json');
require "db/db.php";
include 'phpqrcode/qrlib.php';

$q = $_GET ['q'] ?? null;
$page  = isset($_GET['page'])  ? (int) $_GET['page']  : 1;
$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

$qrContent = 'http://localhost/gym%20membership%20management%20system/members_cam.html';
header('Content-Type: image/png');
QRcode::png($qrContent, false, QR_ECLEVEL_H, 3, 1);
$qrImage = ob_get_contents();
ob_end_clean();

$qr = base64_encode($qrImage);


if ($q) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM members
                       WHERE fname LIKE :q
                       OR lname LIKE :q
                       OR card_no LIKE :q");
    $stmt->execute([':q' => "%$q%"]);
    $total = $stmt->fetchColumn();

    $stmt = $pdo->prepare("SELECT m.*, b.name as branch_name FROM members m 
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

    $stmt = $pdo->prepare("SELECT m.*, b.name as branch_name FROM members m 
                            LEFT JOIN branch b ON m.branch = b.id
                            ORDER BY m.id DESC 
                            LIMIT :limit OFFSET :offset");
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
}
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
    "data"  => $rows,
    "total" => $total,
    "page"  => $page,
    "limit" => $limit,
    "qr"    => $qr
]);

?>