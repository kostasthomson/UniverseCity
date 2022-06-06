<?php
    require "./DB_Class.php";
    $user_qrId = htmlspecialchars($_GET["student_pass_id"]); //Take variables from qrCode.js"qrCodeMessage"

  
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT * FROM STUDENTS WHERE am IN (SELECT student_id FROM identify WHERE qr_id IN (SELECT id FROM QRCODE WHERE student_pass_id = '$user_qrId'))";
    $query_done = $db->makeQuery($query);
    

    

    if ($query_done) {
        
        $user = $db->getQueryResults();

        if (count($user) == 0) {
            echo "No resutls";
        } else {
            $u = $user[0];

            foreach(array_values($u) as $i){
                echo $i.", ";
            }
            // $query1 = "SELECT student_id FROM identify" = "SELECT student_id FROM is_sitting"

            // Find student's sit ---> Indefined means there is no register
            

        }
    } else {
        echo "Fail";
    }
    $query1 = "UPDATE QRCODE SET arrived=1 WHERE (SELECT seat_id FROM is_sitting WHERE student_id IN (SELECT student_id FROM identify WHERE qr_id IN (SELECT id FROM QRCODE WHERE student_pass_id = '$user_qrId')))";
    $sql_query = $db->makeQuery($query1);
    // $sql = "UPDATE QRCODE SET arrived=1 WHERE student_pass_id = '$user_qrId'";
    // $sql_query = $db->makeQuery($sql);
    $db->close();
?>
