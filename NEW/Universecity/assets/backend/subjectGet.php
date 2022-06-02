<?php 

    require "./DB_Class.php";

    $semester = $_GET["results"];

    echo $semester;

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT code,title FROM SUBJECTS WHERE SUBJECTS.semester = 4";
    
    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        echo $r["code"]. "," .$r['title']. ",";
    }
?>