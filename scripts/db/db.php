<?php
$server = 'localhost';
$username = 'root';
$password = '';
$dbName = 'gym_mms';

try {
    $pdo = new PDO("mysql:host=$server;dbname=$dbName", $username, $password);
    
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("SET NAMES utf8mb4");
} catch(PDOException $e){
    echo "connection failed" . $e->getMessage();
}

?>