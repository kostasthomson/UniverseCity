<?php 
    
    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $am = $_GET["AM"];

    $query = "SELECT studentsArrive.subject_id, studentsArrive.sum_arrived, studentsArrive.lessons_count,SUBJECTS.title  FROM studentsArrive JOIN SUBJECTS ON (studentsArrive.subject_id = SUBJECTS.code) WHERE '$am' = studentsArrive.students_id;";

    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        foreach($r as $c){
            echo $c. ".";
        }
        echo ",";
    }

    $db->close();

?>
