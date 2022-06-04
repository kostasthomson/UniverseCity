<?php
    require "./DB_Class.php";
    $department = htmlspecialchars($_GET["department"]);
    $semester = htmlspecialchars($_GET["semester"]);
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
    $query = "SELECT title FROM SUBJECTS WHERE department='$department' and semester=$semester;";
    $query_done = $db->makeQuery($query);
    if($query_done) {
        $results = $db->getQueryResults();
        if(count($results) > 0) {
            foreach($results as $subject_name) {
                echo $subject_name['title'];
                if(array_search($subject_name, $results) != count($results)-1) {
                    echo ",";
                }
            }
        }
    }
    $db->close();
?>