<?php
    require "./DB_Class.php";

    $queryUrl = $_GET["results"];

    $results = json_decode($queryUrl);

    $keySubject = "subject";
    $keyOptions = "options";
    $keyText = "text";
    
    $subject = $results->$keySubject;
    $options = $results->$keyOptions;
    $text = $results->$keyText;

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "INSERT INTO EVALUATION (subject, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6, answer_7, answer_8, answer_9, answer_10, answer_11, answer_12, text) VALUES 
    ('$subject', ".implode(",", array_values($options))." ,'$text')";

    $db->makeDMLQuery($query);

    $queryId = "SELECT MAX(id) FROM EVALUATION";
    $db->makeQuery($queryId);
    
    $resultId = $db->getQueryResults();

    $queryFills = "INSERT INTO fills (student_id, evaluation_id) VALUES ('ics0001', {$resultId[0]['MAX(id)']})";
    $db->makeDMLQuery($queryFills);

    $queryFor = "INSERT INTO for (evaluation_id, subject_id) VALUES ({$resultId[0]['MAX(id)']}, '$subject')";
    $db->makeDMLQuery($queryFor);

    $db->close();
?>