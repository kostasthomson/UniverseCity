<?php
    require "./DB_Class.php";
    $db = NEW DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    // DELETE TABLE FIRST FOR CHANGES
    // $sql1 = "DROP TABLE studentsArrive";
    // $query_done = $db->makeQuery($sql1);

    $sql = "CREATE TABLE studentsArrive (students_id VARCHAR(30), subject_id VARCHAR(30), sum_arrived INT(4))";
    $query_done = $db->makeQuery($sql);

    $db->close();
   
    
?>