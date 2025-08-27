<?php 
header ('Content-Type: application/json');
require "db/db.php";

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

    $stmt = $pdo->prepare("SELECT * FROM members 
                           WHERE fname LIKE :q 
                              OR lname LIKE :q 
                              OR card_no LIKE :q
                           ORDER BY id DESC 
                           LIMIT :limit OFFSET :offset");
    $stmt->bindValue(':q', "%$q%", PDO::PARAM_STR);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

}

else {
    $stmt = $pdo->query("SELECT COUNT(*) FROM members");
    $total = $stmt->fetchColumn();

    $stmt = $pdo->prepare("SELECT * FROM members 
                            ORDER BY id DESC 
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
    "limit" => $limit
]);

?>