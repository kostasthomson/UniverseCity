<?php 
//http://localhost/assets/backend/DB_retrieve.php?am=ics21001&pass=ics21001&tname=STUDENTS
    require "./DB_Class.php";
    $user_am = htmlspecialchars($_GET["am"]);
    $user_pass = htmlspecialchars($_GET["pass"]);
    $table_name = htmlspecialchars($_GET["tname"]);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT * FROM $table_name WHERE am='$user_am' AND password='$user_pass';";
    $query_done = $db->makeQuery($query);

    if($query_done) {
        $user = $db->getQueryResults();
        if(count($user) == 0) {
            echo "Unrecorded";
        }else {
            $u = $user[0];
            if($table_name == 'STUDENTS')
                echo "{$u['am']},{$u['first_name']},{$u['last_name']},{$u['email']},{$u['department']},{$u['semester']},{$u['study_direction']}";
            else if($table_name == 'TEACHERS')
                echo "{$u['am']},{$u['first_name']},{$u['last_name']},{$u['email']},{$u['office']},{$u['title']},{$u['biolink']}";
            else 
                echo "{$u['am']},{$u['first_name']},{$u['last_name']},{$u['email']},{$u['department']}";
        }
    }else {
        echo "Fail";
    }
    $db->close();
?>