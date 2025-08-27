<?php 
Header('Content-Type: application/json');
require "db/db.php";
include 'phpqrcode/qrlib.php';

$fName = strtoupper ($_POST['fName']) ?? null;
$lName = strtoupper ($_POST['lName']) ?? null;
$contactNum = $_POST['contactNum'] ?? null;
$membershipDate = strtoupper ($_POST['membershipDate']) ?? null;
$e_contact_person = $_POST['e_contact_person'] ?? null;
$e_contact_number = $_POST['e_contact_number'] ?? null;
$cardNum = $_POST['cardNum'] ?? null;
$branch = $_POST['branch'] ?? null;
$currentDate = new DateTime();



$qrContent = 'https://54.179.49.80/armanisfitness/members/' . generatehash($cardNum);

$convertedDate = strtotime($membershipDate);
$formattedDate = date("M d, Y", $convertedDate);

if($formattedDate > $currentDate->format("M d, Y")){
    echo json_encode(['success' => false, 'message' => 'Please enter a valid date']);
    exit;
}


if (strlen($contactNum) != 11 || !preg_match('/^09[0-9]{9}$/', $contactNum)
&& strlen($e_contact_number) != 11 || !preg_match('/^09[0-9]{9}$/', $e_contact_number)) {
    echo json_encode(['success' => false, 'message' => 'Contact number must be 11 digits and start with 09']);
    exit;
}

else if ($fName && $lName && !preg_match('/^[a-zA-Z\s\-]+$/', $fName)
    && !preg_match('/^[a-zA-Z]+$/', $lName)
    ) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid name']);
    exit;
}

else if ($e_contact_person && !preg_match('/^[a-zA-Z\s\-]+$/', $e_contact_person)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid name for the emergency contact person']);
    exit;
}

function generatehash($cardNum){
    $md5=md5($cardNum);
    $prefix= substr($md5, 5,5);
    $posfix=substr($md5, 15,8);
    $hash=$prefix.$md5.$posfix.$cardNum;
    return $hash;
}

if (!$fName || !$lName || !$contactNum || !$membershipDate || !$e_contact_person || !$e_contact_number || !$cardNum || !$branch) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM members WHERE card_no = :card_no');
$stmt->execute([':card_no' => $cardNum]);
$existingMember = $stmt->fetch();

if ($existingMember) {
    echo json_encode(['success' => false, 'message' => 'Member already exists']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO members
        (fname, lname, contact_no, membership_date, E_contact_person, e_contact_number, card_no, branch)
        VALUES
        (:fname, :lname, :contact_no, :membership_date, :E_contact_person, :e_contact_number, :card_no, :branch)');
    $stmt->execute([
        ':fname' => $fName, 
        ':lname' => $lName, 
        ':contact_no' => $contactNum, 
        ':membership_date' => $formattedDate, 
        ':E_contact_person' => $e_contact_person, 
        ':e_contact_number' => $e_contact_number, 
        ':card_no' => $cardNum,
        ':branch' => $branch
    ]);

    $id = $pdo->lastInsertId();

    $fileName = null;
    if (isset($_POST['photo']) && $_POST['photo'] !== '') {
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
    }

    $qrDir = "images/qrcodes/" . $cardNum;
    if (!is_dir("images/qrcodes")) {
        mkdir("images/qrcodes", 0777, true);
    }

    QRcode::png($qrContent, $qrDir. '.png', QR_ECLEVEL_H, 2, 0);

    if ($fileName) {
        $stmt = $pdo->prepare('UPDATE members SET photo = :photo, qr = :qrdir WHERE id = :id');
        $stmt->execute([
            ':photo' => $fileName,
            ':qrdir' => $qrDir . '.png',
            ':id' => $id
        ]);
    }

    echo json_encode(['success' => true, 'message' => 'New member has been added']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Connection Failed: ' . $e->getMessage()]);
}
