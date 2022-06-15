<?php

    require "./DB_Class.php";

    $am = $_GET["AM"];
    $count = 0;
    $checkID = null;

    $subjects = htmlspecialchars($_GET["subjects"]);

    $subArray = explode(",", $subjects);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    foreach($subArray as $r){
        $query = "SELECT DISTINCT STUDENTS.am, STUDENTS.first_name, STUDENTS.last_name, rec_letter_application.subject_id FROM STUDENTS, TEACHERS, SUBJECTS,rec_letter_application WHERE TEACHERS.am = rec_letter_application.teacher_am AND rec_letter_application.student_am = STUDENTS.am AND '$r' = rec_letter_application.subject_id;";
        $db->makeQuery($query);

        $result = $db->getQueryResults();

        foreach($result as $r){
            if(!in_array($checkID, $r)){
                foreach($r as $c){
                    echo $c. "."; 
                    if($count === 0){
                        $checkID = $c;
                        $count++;
                    }
                }
                echo ",";
            }
        }    
    }
?>