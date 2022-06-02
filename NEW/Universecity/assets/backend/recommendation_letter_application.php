<?php
    require "./DB_Class.php";

    $queryUrl = $_GET["results"];

    $results = json_decode($queryUrl);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $keySubject = "subject_id";
    $keyStud = "stud_am";

    $subject = $results->$keySubject;
    $student = $results->$keyStud;

    $query = "INSERT INTO rec_letter_application (student_am, subject_id) VALUES ('$student', '$subject')";

    $db->makeDMLQuery($query);
?>