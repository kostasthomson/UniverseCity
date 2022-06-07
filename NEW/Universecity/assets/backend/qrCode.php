<?php
    require "./DB_Class.php";
    $classroom_qrId = htmlspecialchars($_GET["classroom_id"]); //Take variables from qrCode.js"qrCodeMessage"
    $student_am = htmlspecialchars($_GET["am"]);
  
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT student_id FROM is_sitting WHERE seat_id IN (SELECT seat_id FROM has WHERE class_id = $classroom_qrId)";
    $query_done = $db->makeQuery($query);
    

    

    if ($query_done) {
        
        $user = $db->getQueryResults();// Exei ena sinolo apo onomata pou exoun valei oti tha kathisoun sto mathima

        if (count($user) == 0) {
            echo "No resutls";
        } else {
            $u = $user[0];

            foreach(array_values($u) as $i){
                $query = "SELECT student_id FROM is_sitting WHERE am = $i";// Pare ta student id pou einai stin aithousa pou ekana scan kai des uparxei to diko mou ?
                $query_correct = $db->makeQuery($query);
                if($query_correct){
                    echo $i;//uparxei ara fere to
                }
                
            }
            
            

        }
    } else {
        echo "Fail";
    }
    // $query1 = "UPDATE QRCODE SET arrived=1 WHERE (SELECT seat_id FROM is_sitting WHERE student_id IN (SELECT student_id FROM identify WHERE qr_id IN (SELECT id FROM QRCODE WHERE classroom_id = '$user_qrId')))";
    // $sql_query = $db->makeQuery($query1);

    // $sql = "UPDATE QRCODE SET arrived=1 WHERE student_pass_id = '$user_qrId'";
    // $sql_query = $db->makeQuery($sql);
    
    $db->close();
?>
