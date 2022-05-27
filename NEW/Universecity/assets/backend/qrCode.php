<?php
    require "./DB_Class.php";
    $user_qrId = htmlspecialchars($_GET["student_pass_id"]); //Take variables from qrCode.js"qrCodeMessage"

  
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT * FROM QRCODE WHERE student_pass_id='$user_qrId' ;";
    $query_done = $db->makeQuery($query);
    
    if ($query_done) {
        $user = $db->getQueryResults();
        if (count($user) == 0) {
            echo "No resutls";
        } else {
            $u = $user[0];
            echo "{$u['student_pass_id']}";
        }
    } else {
        echo "Fail";
    }
    $db->close();
?>
