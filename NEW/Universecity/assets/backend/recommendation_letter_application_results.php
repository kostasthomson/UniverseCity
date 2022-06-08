<?php

    require "./DB_Class.php";

    $queryUrl = $_GET["results"];

    $results = json_decode($queryUrl);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $keyStud_am = "stud_am";
    $keyStud_firstname = "stud_firstName";
    $keyStud_lastname = "stud_lastName";

    $stud_am = $results-> $keyStud_am;
    $stud_firstname = $results-> $keyStud_firstname;
    $stud_lastname = $results-> $keyStud_lastname;

    $query = "SELECT DISTINCT GRADES.student_id, GRADES.subject_id, SUBJECTS.title, GRADES.grade FROM GRADES, SUBJECTS WHERE ('$stud_am' = GRADES.student_id) AND SUBJECTS.code = GRADES.subject_id;";

    $db->makeDMLQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        foreach($r as $c){
            echo $c .".";
        }
        echo ",";
    }
    

?>
