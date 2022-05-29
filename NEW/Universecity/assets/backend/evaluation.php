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

    $db->close();
    //echo $subject. "," .implode(",", array_values($options)). "," .$text;
?>