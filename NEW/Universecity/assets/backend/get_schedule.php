<?php

    require "./DB_Class.php";

    $department = htmlspecialchars($_GET['department']);
    $semester = htmlspecialchars($_GET['semester']);

    switch ($department) {
        case "ΕΦΑΡΜΟΣΜΕΝΗΣ ΠΛΗΡΟΦΟΡΙΚΗΣ":
            $department = "ΕΠ";
            break;
        case "ΟΙΚΟΝΟΜΙΚΩΝ ΕΠΙΣΤΗΜΩΝ":
            $department = "ΟΕ";
            break;
        //TODO add more cases
        default:
            echo "Incorrect Department!";
    }

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT time, Monday, Tuesday, Wednesday, Thursday, Friday FROM SCHEDULE WHERE department='$department' and semester='$semester';";
    $db->makeQuery($query);

    $results = $db->getQueryResults();
    
    echo json_encode($results);

    $db->close();

?>