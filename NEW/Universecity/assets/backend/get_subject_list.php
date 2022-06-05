<?php
    
    require "./DB_Class.php";

    $department = htmlspecialchars($_GET["department"]);
    $semester = htmlspecialchars($_GET["semester"]);
    $direction = htmlspecialchars($_GET["direction"]);

    if($department=="ΕΦΑΡΜΟΣΜΕΝΗΣ ΠΛΗΡΟΦΟΡΙΚΗΣ") {
        $department = "ΕΠ";
    }

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "  SELECT * 
                FROM SUBJECTS
                WHERE department='$department' AND semester=$semester AND direction='$direction'
                ";
    $query_done = $db->makeQuery($query);
    if($query_done) {
        $query_results = $db->getQueryResults();
        if (count($query_results) != 0) {
            foreach($query_results as $row) {
                echo "{$row['code']},{$row['title']},{$row['department']},{$row['semester']},{$row['ects']},{$row['direction']}";
                if(array_search($row, $query_results) != count($query_results)-1) {
                    echo "/";
                }
            }
        }
        
    }
?>