<?php

    require "./DB_Class.php";

    $department = htmlspecialchars($_GET['department']);
    $semester = htmlspecialchars($_GET['semester']);
    $data = json_decode($_GET['data']);

    $days_in_week = array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
    foreach($data as $time => $days) {
        foreach($days as $day_index => $subject) {
            if($subject) {
                $query = "UPDATE SCHEDULE SET $days_in_week[$day_index] = '$subject' WHERE department='$department' and semester='$semester' and time=$time;";
                $db->makeDMLQuery($query);
            }
        }
    }
    $db->close();
?>