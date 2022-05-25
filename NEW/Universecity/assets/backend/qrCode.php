<?php

    $user_qrId = htmlspecialchars($_GET["student_pass_id"]); //Take variables from qrCode.js"qrCodeMessage"

    $table_name = "QRCODE";
    $table_columns = array("student_pass_id" => "TEXT");

    $db = new DataBase("sqlite:DATABASES/test.db");

    $query = "SELECT * FROM $table_name WHERE student_pass_id='$user_qrId' ;";
    $query_done = $db->makeQuery($query);
    
    if ($query_done) {
        $user = $db->getQueryResults();
        if (count($user) == 0) {
            echo "Unrecorded";
        } else {
            $u = $user[0];
            echo "{$u['student_pass_id']}";
        }
    } else {
        echo "Fail";
    }
    $db->close();
?>
