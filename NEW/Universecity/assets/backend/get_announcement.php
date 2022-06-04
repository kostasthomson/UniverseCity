<?php
    
    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT * FROM ANNOUNCEMENTS";
    $query_done = $db->makeQuery($query);
    if($query_done) {
        $query_results = $db->getQueryResults();
        foreach($query_results as $row) {
            echo "{$row['id']},{$row['title']},{$row['description']},{$row['time']},{$row['date']},{$row['sender']}";
            if(array_search($row, $query_results) != count($query_results)-1) {
                echo "/";
            }
        }
    }
?>