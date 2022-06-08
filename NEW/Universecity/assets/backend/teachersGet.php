<?php

    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT TEACHERS.am, TEACHERS.first_name, TEACHERS.last_name FROM TEACHERS;";

    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        foreach($r as $c){
            echo $c. "."; 
        }
        echo ",";
    }    

?>