<?php

    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "INSERT INTO rec_letter_application (student_am, teacher_am, subject_id VALUES ("

?>