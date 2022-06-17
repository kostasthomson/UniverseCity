<?php

    require "./DB_Class.php";

    $teacher_id = htmlspecialchars($_GET['teacher_id']);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT code, title, department, semester, direction FROM teached_by JOIN SUBJECTS ON subject_id=code WHERE teacher_id = '$teacher_id';";
    $db->makeQuery($query);
    $resutls = $db->getQueryResults();

    $subjects = array();
    foreach($resutls as $row) {
        array_push($subjects, $row);
    }

    echo json_encode($subjects);

    $db->close();

?>