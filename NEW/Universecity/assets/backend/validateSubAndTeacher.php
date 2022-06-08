<?php

    require "./DB_Class.php";

    $am = $_GET["AM"];

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT DISTINCT SUBJECTS.title ,SUBJECTS.semester, GRADES.grade FROM rec_letter_application, SUBJECTS JOIN GRADES ON (GRADES.student_id = 'ics21001') AND (GRADES.subject_id = rec_letter_application.subject_id) WHERE rec_letter_application.teacher_am = '$am' AND SUBJECTS.code = rec_letter_application.subject_id;";    
    
    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        foreach($r as $c){
            echo $c .".";
        }
        echo ",";
    }
?>