<?php
    require "./DB_Class.php";
    $classroom_qrId = htmlspecialchars($_GET["classroom_id"]); //Take variables from qrCode.js"qrCodeMessage"
    $student_am = htmlspecialchars($_GET["am"]);
  
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT student_id FROM (SELECT student_id FROM is_sitting WHERE seat_id IN (SELECT seat_id FROM has WHERE class_id = $classroom_qrId)) WHERE student_id = '$student_am'";// ics21008 kai ics21001
    $query_done = $db->makeDMLQuery($query);
    


    if ($query_done) {
        
        $user = $db->getQueryResults();// Exei ena sinolo apo onomata pou exoun valei oti tha kathisoun sto mathima

        if (count($user) == 0) {
            echo "No resutls";
        } else {

            $query = "UPDATE studentsArrive SET sum_arrived = sum_arrived + 1 WHERE students_id = '$student_am' AND subject_id IN (SELECT subject_id FROM teached_in WHERE class_id = $classroom_qrId)";
            $query_execute = $db->makeDMLQuery($query);
            

        }
    } else {
        echo "Fail";
    }
    
    $db->close();
?>
