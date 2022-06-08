<?php

    require "./DB_Class.php";

    $queryUrl = $_GET["results"];

    $results = json_decode($queryUrl);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $keyStud_am = "stud_am";
    $keyStud_firstname = "stud_firstName";
    $keyStud_lastname = "stud_lastName";
    $keySub_id = "subject_id";
    $keySub_title = "subject_title";

    $stud_am = $results-> $keyStud_am;
    $stud_firstname = $results-> $keyStud_firstname;
    $stud_lastname = $results-> $keyStud_lastname;
    $sub_id = $results-> $keySub_id;
    $sub_title = $results-> $keySub_title;

    $query = "SELECT DISTINCT GRADES.student_id, GRADES.subject_id, GRADES.grade  FROM GRADES WHERE ('$stud_am' = GRADES.student_id)";

    $db->makeDMLQuery($query);

    $result = $db->getQueryResults();

    echo var_dump($result);

?>
