<?php

    require "./DB_Class.php";

    $department = htmlspecialchars($_GET['department']);
    $semester = htmlspecialchars($_GET['semester']);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT * FROM SCHEDULE WHERE department='$department' and semester='$semester';";
    $db->makeQuery($query);

    $results = $db->getQueryResults();
    foreach($results as $row) {
        echo "{$row['time']},{$row['Monday']},{$row['Tuesday']},{$row['Wednesday']},{$row['Thursday']},{$row['Friday']}";
        if(array_search($row, $results) != count($results)-1) {
            echo "/";
        }
    }

    $db->close();

?>