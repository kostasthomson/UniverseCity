<?php
    
    require "./DB_Class.php";

    $student_id = htmlspecialchars($_GET["student_id"]);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "  SELECT * 
                FROM is_sitting
                WHERE student_id='$student_id'
             ";
    $query_done = $db->makeQuery($query);
    if($query_done) {
        $query_results = $db->getQueryResults();
        if (count($query_results) != 0) {
            foreach($query_results as $row) {
                echo "{$row['student_id']},{$row['seat_id']}";
                if(array_search($row, $query_results) != count($query_results)-1) {
                    echo "/";
                }
            }
        }
        
    }
?>