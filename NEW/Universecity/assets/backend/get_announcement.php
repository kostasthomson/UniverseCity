<?php
    
    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $secretariat_results = array();
    $teacher_results = array();

    $secretariat_query = "SELECT * FROM ANNOUNCEMENTS WHERE sender='S'";
    $secretariat_query_done = $db->makeQuery($secretariat_query);
    if($secretariat_query_done) {
        $secretariat_results = $db->getQueryResults();
    }
    $teacher_query = "SELECT * FROM ANNOUNCEMENTS WHERE sender='T'";
    $teacher_query_done = $db->makeQuery($teacher_query);
    if($teacher_query_done) {
        $teacher_results = $db->getQueryResults();
    }
    foreach($secretariat_results as $row) {
        echo "{$row['id']},{$row['title']},{$row['description']},{$row['time']},{$row['date']}";
        if(array_search($row, $secretariat_results) != count($secretariat_results)-1) {
            echo ".";
        }
    }
    echo "|";
    foreach($teacher_results as $row) {
        echo "{$row['id']},{$row['title']},{$row['description']},{$row['time']},{$row['date']}";
        if(array_search($row, $teacher_results) != count($teacher_results)-1) {
            echo ".";
        }
    }
?>