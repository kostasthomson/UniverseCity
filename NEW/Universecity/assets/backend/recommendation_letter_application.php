<?php
    require "./DB_Class.php";

    $queryUrl = $_GET["results"];

    $results = json_decode($queryUrl);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $keyTeacher = "teacher_id";
    $keyStud = "stud_am";

    $teacher = $results->$keyTeacher;
    $student = $results->$keyStud;

    $querySubject = "SELECT SUBJECTS.code FROM SUBJECTS,teached_by WHERE (SUBJECTS.code = teached_by.subject_id) AND '$teacher' = teached_by.teacher_id;";

    $db->makeDMLQuery($querySubject);

    $resultSubject= $db->getQueryResults();

    foreach($resultSubject as $r){

        $temp = $r['code'];
        $query = "INSERT INTO rec_letter_application (student_am, subject_id, teacher_am) VALUES ('$student', '$temp', '$teacher')";

        $db->makeDMLQuery($query);
    }
?>