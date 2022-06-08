<?php
    require "./DB_Class.php";
    $classroom_qrId = htmlspecialchars($_GET["classroom_id"]); //Take variables from qrCode.js"qrCodeMessage"
    $student_am = htmlspecialchars($_GET["am"]);
  
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT student_id FROM is_sitting WHERE seat_id IN (SELECT seat_id FROM has WHERE class_id = $classroom_qrId)";
    $query_done = $db->makeDMLQuery($query);
    

    

    if ($query_done) {
        
        $user = $db->getQueryResults();// Exei ena sinolo apo onomata pou exoun valei oti tha kathisoun sto mathima

        if (count($user) == 0) {
            echo "No resutls";
        } else {
            $u = $user[0];

            foreach(array_values($u) as $i){
                $query = "SELECT student_id FROM is_sitting WHERE am = $i";// Pare ta student id pou einai stin aithousa pou ekana scan kai des uparxei to diko mou ?
                $query_correct = $db->makeDMLQuery($query);
                if($query_correct){
                    //edw ousiastika tha prepei ean mpei na valei +1 sto arrive tou mathimatos ara prepei na vrw to mathima kai stin grami +1
                    
                    $student = $db->getQueryResults();
                    if(count($student) == 0){
                        echo "You don't have lesson";
                    }else{
                        $studentsarray = $student[0];
                        foreach(array_values($studentsarray) as $s){
                            $query1 = "UPDATE studentsArrive SET sum_arrived=1 WHERE students_id = $s";
                            $make_query = $db->makeDMLQuery($query1);
                        }
                    }
                    

                }
                
            }
            
            

        }
    } else {
        echo "Fail";
    }
    
    $db->close();
?>
