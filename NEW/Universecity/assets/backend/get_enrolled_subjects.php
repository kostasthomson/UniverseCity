<?php

    require "./DB_Class.php";

    $student_id = htmlspecialchars($_GET['student_id']);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT code, title, semester FROM enrolled_in JOIN SUBJECTS ON subject_id=code WHERE student_id='$student_id';";
    $db->makeQuery($query);
    $resutls = $db->getQueryResults();

    $subjects = array();
    foreach($resutls as $row) {
        array_push($subjects, $row);
    }

    echo json_encode($subjects);

    $db->close();

?>