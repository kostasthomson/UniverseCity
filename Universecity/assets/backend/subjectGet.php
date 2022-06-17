<?php 

    require "./DB_Class.php";

    $queryUrl = $_GET["semester"];

    $semester = json_decode($queryUrl);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT code,title FROM SUBJECTS WHERE SUBJECTS.semester = '$semester'";
    
    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        echo $r['code']. "," .$r['title']. ",";
    }
?>