<?php

    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT STUDENTS.am, STUDENTS.semester FROM STUDENTS;";

    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){

        $am = $r['am'];
        $count = (int) $r['semester'];

        echo $am;
        for($i=1;$i<=$count;$i++){

            $query2 = "SELECT SUBJECTS.code FROM SUBJECTS WHERE SUBJECTS.semester = $i;";

            $db->makeQuery($query2);

            $result2 = $db->getQueryResults();

            foreach($result2 as $r){
                foreach($r as $c){
                    $randNum = rand(5,10);
                    $query3 = "INSERT INTO GRADES (student_id, subject_id, grade) VALUES ('$am', '$c', $randNum);";
                    $db->makeQuery($query3);
                }   
            }
        }
        
    }
    
?>