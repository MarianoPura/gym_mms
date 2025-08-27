<?php
Header('Content-Type: application/json');
require 'db/db.php';

$stmt = $pdo->prepare('SELECT * FROM branch');
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows);
?>