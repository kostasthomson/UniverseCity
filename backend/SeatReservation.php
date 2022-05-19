<?php

    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/demo.db");

    $query_done = $db->makeQuery("SELECT * FROM Students");

    if($query_done) {
        $students = $db->getQueryResults();
        if(count($students)) {
            foreach($students as $student) {
                echo "{$student['First_Name']}, {$student['Last_Name']}";
            }
        }else {
            echo 'empty';
        }
    }

?>