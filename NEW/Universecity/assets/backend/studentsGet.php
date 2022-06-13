<?php

    require "./DB_Class.php";

    $am = $_GET["AM"];

    $subjects = $_GET["subjects"];

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT DISTINCT STUDENTS.am, STUDENTS.first_name, STUDENTS.last_name, rec_letter_application.subject_id FROM STUDENTS, TEACHERS, SUBJECTS,rec_letter_application WHERE TEACHERS.am = rec_letter_application.teacher_am AND rec_letter_application.student_am = STUDENTS.am AND '$subjects' = rec_letter_application.subject_id;";
    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        foreach($r as $c){
            echo $c. "."; 
        }
        echo ",";
    }    

?>