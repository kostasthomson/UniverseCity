<?php
    
    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT * FROM ANNOUNCEMENTS";
    $query_done = $db->makeQuery($query);
    if($query_done) {
        $query_results = $db->getQueryResults();
        
        echo json_encode($query_results);
    }
?>