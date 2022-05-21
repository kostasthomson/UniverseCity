<?php

    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
    $query_done = $db->makeQuery("SELECT * FROM STUDENTS");
    if($query_done) {
        $students = $db->getQueryResults();
        if(count($students)) {
            $columns = $db->getTableInfo();
            foreach($columns as $col) {
                $col_name = $col['name'];
                echo $col_name."<br>";
                foreach($students as $student) {
                    echo "{$student[$col_name]}<br>";
                }
            }            
        }else {
            echo 'empty';
        }
    }

?>