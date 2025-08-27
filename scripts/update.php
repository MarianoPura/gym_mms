<?php
Header('Content-Type: application/json');
require "db/db.php";
include 'phpqrcode/qrlib.php';

$id = $_POST['id'] ?? null;
$membershipDate = $_POST['membershipDate'] ?? null;
$convertedDate = strtotime($membershipDate);
$formattedDate = date("M d, Y", $convertedDate);
$currentDate = time();

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Missing member ID']);
    exit;
}

$fields = [];
$params = [':id' => $id];

foreach (['fName','lName','contactNum','membershipDate','e_contact_person','e_contact_number','cardNum','branch'] as $field) {

    if (!empty($_POST[$field])) {
        $dbField = $field;
        if ($field === 'contactNum') $dbField = 'contact_no';
        if ($field === 'membershipDate') $dbField = 'membership_date';
        if ($field === 'e_contact_person') $dbField = 'E_contact_person';
        if ($field === 'e_contact_number') $dbField = 'e_contact_number';
        if ($field === 'cardNum') $dbField = 'card_no';
        $fields[] = "$dbField = :$field";


        if ($field === 'contactNum') {
            if (strlen($_POST['contactNum']) != 11 || !preg_match('/^09[0-9]{9}$/', $_POST['contactNum'])) {
                echo json_encode([
                    'success' => false, 
                    'message' => 'Contact number must be 11 digits and start with 09',
                    'invalidContactNum' => true
                ]);
                exit;
            }
        }
        if ($field === 'e_contact_number'){
            if (strlen($_POST['e_contact_number']) != 11 || !preg_match('/^09[0-9]{9}$/', $_POST['e_contact_number'])) {
                echo json_encode([
                    'success' => false, 
                    'message' => 'Emergency contact number must be 11 digits and start with 09',
                    'invalidEContactNum' => true
                ]);
                exit;
            }
        }

        if($field === 'fName' || $field === 'lName') {
            if (strlen($_POST[$field]) > 0 && !preg_match('/^[a-zA-Z\s\-]+$/', $_POST[$field])) {
                echo json_encode([
                    'success' => false, 
                    'message' => 'Please enter a valid name',
                    'invalidName' => true
                ]);
                exit;
            }
            else {
                $_POST[$field] = strtoupper($_POST[$field]);
            }
        }

        if($field === 'e_contact_person'){
            if(!preg_match('/^[a-zA-Z\s\-]+$/', $_POST[$field])) {
                echo json_encode([
                    'success' => false, 
                    'message' => 'Please enter a valid emergency contact person name',
                    'invalidEContactPerson' => true
                ]);
                exit;
            }
        }

        if ($field === 'membershipDate') {
            if ($convertedDate > $currentDate) {
            echo json_encode([
                'success' => false, 
                'message' => 'Please enter a valid date',
                'invalidDate' => true
            ]);
            exit;
            }
            $params[":$field"] = strtoupper($formattedDate);
        } else {
            $params[":$field"] = $_POST[$field];
        }

        if($field === 'cardNum'){
            $cardNum = $_POST['cardNum'];
            function generatehash($cardNum){
                $md5=md5($cardNum);
                $prefix= substr($md5, 5,5);
                $posfix=substr($md5, 15,8);
                $hash=$prefix.$md5.$posfix.$cardNum;
                return $hash;
            }

            $qrContent = 'https://54.179.49.80/armanisfitness/members/' . generatehash($cardNum);
            
            $qrDir = "images/qrcodes";
            if (!is_dir($qrDir)) {
                mkdir($qrDir, 0777, true);
            }
            $qrFile = $qrDir . "/" . preg_replace("/[^a-zA-Z0-9]/", "_", $cardNum) . ".png";
            // Overwrite QR code file
            QRcode::png($qrContent, $qrFile, QR_ECLEVEL_H, 2, 0);
        }
    }
}

// Handle photo update
if (isset($_POST['photo']) && $_POST['photo'] !== '') {
    $fName = strtoupper($_POST['fName'] ?? '');
    $lName = strtoupper($_POST['lName'] ?? '');
    $cardNum = ($_POST['cardNum'] ?? '');
    $fullName = preg_replace("/[^a-zA-Z0-9]/", "_", $fName . "_" . $lName);
    $photo = $_POST['photo'];
    $photo = str_replace('data:image/png;base64,', '', $photo);
    $photo = str_replace(' ', '+', $photo);
    $data = base64_decode($photo);

    

    $dir = "images/members";
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
    $fileName = $dir . "/" . $id . ".png";
    if (file_put_contents($fileName, $data) === false) {
        echo json_encode(['success' => false, 'message' => 'Failed to save photo']);
        exit;
    }
    $fields[] = "photo = :photo";
    $params[':photo'] = $fileName;
}

if (empty($fields)) {
    echo json_encode(['success' => false, 'message' => 'No fields to update']);
    exit;
}

$sql = "UPDATE members SET " . implode(', ', $fields) . " WHERE id = :id";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode(['success' => true, 'message' => 'Updating member information successful']);
} catch (PDOException $e){
    echo json_encode(['success' => false, 'message' => 'Error updating member information: ' . $e->getMessage()]);
}
?>