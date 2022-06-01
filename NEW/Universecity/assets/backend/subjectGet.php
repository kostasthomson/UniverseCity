<?php 

    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT code,title FROM SUBJECTS LEFT JOIN STUDENTS ON SUBJECTS.semester = STUDENTS.semester";
    
    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        echo $r["code"]. "," .$r['title']. ",";
    }
?>