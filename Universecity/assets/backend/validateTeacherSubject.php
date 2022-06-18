<?php

    require "./DB_Class.php";

    $am = htmlspecialchars($_GET["AM"]);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT SUBJECTS.code, SUBJECTS.title FROM SUBJECTS JOIN teached_by ON teached_by.subject_id = SUBJECTS.code AND teached_by.teacher_id = '$am';";    
    
    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        foreach($r as $c){
            echo $c .".";
        }
        echo ",";
    }
?>