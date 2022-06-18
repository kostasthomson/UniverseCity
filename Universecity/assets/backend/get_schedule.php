<?php

    require "./DB_Class.php";

    $department = htmlspecialchars($_GET['department']);
    $semester = htmlspecialchars($_GET['semester']);
    if($semester != 0) {
        $query = "SELECT time, Monday, Tuesday, Wednesday, Thursday, Friday FROM SCHEDULE WHERE department='$department' and semester=$semester;";
    } else {
        $query = "SELECT time, Monday, Tuesday, Wednesday, Thursday, Friday FROM SCHEDULE WHERE department='$department';";
    }

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
    $db->makeQuery($query);
    $results = $db->getQueryResults();
    echo json_encode($results);

    $db->close();

?>