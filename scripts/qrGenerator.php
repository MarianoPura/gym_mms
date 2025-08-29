<?php
include 'phpqrcode/qrlib.php';

$text = "www.facebook.com";
header('Content-Type: image/png');
QRcode::png($text, false, QR_ECLEVEL_L, 4, 1);  

?>