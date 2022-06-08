<?php

    require "./DB_Class.php";

    $am = $_GET["AM"];

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT DISTINCT STUDENTS.am, STUDENTS.first_name, STUDENTS.last_name, SUBJECTS.code, SUBJECTS.title FROM STUDENTS, SUBJECTS, TEACHERS JOIN rec_letter_application ON (rec_letter_application.student_am = STUDENTS.am) AND (rec_letter_application.subject_id = SUBJECTS.code) WHERE '$am' = rec_letter_application.teacher_am;";

    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        foreach($r as $c){
            echo $c. "."; 
        }
        echo ",";
    }    

?>