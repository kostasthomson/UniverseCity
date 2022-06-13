<?php
    require "./DB_Class.php";

    $stud_am = $_GET["stud_am"];
    $teac_am = $_GET["teac_am"];

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "DELETE FROM rec_letter_application WHERE ('$stud_am' = rec_letter_application.student_am) AND ('$teac_am' = rec_letter_application.teacher_am);";

    $db->makeQuery($query);

?>