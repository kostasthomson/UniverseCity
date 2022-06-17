<?php

    require "./DB_Class.php";
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT id, name FROM CLASSROOM";
    $db->makeQuery($query);
    
    $classes = array();

    foreach($db->getQueryResults() as $row) {
        $classes += [$row['id'] => $row['name']];
    }

    echo json_encode($classes);

    $db->close();
?>