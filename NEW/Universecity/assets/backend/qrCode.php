<?php
    require "./DB_Class.php";
    $user_qrId = htmlspecialchars($_GET["student_pass_id"]); //Take variables from qrCode.js"qrCodeMessage"

  
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT * FROM STUDENTS WHERE am IN (SELECT student_id FROM identify WHERE qr_id IN (SELECT id FROM QRCODE WHERE student_pass_id = '$user_qrId'))";
    $query_done = $db->makeQuery($query);
    

    // var_dump($sql_query);
    

    if ($query_done) {
        $user = $db->getQueryResults();
        if (count($user) == 0) {
            echo "No resutls";
        } else {
            $u = $user[0];
            foreach(array_values($u) as $i){
                echo $i.", ";
            }
        }
    } else {
        echo "Fail";
    }
    $sql = "UPDATE QRCODE SET arrived='false' WHERE student_pass_id = '$user_qrId'";
    $sql_query = $db->makeQuery($sql);
    $db->close();
?>
