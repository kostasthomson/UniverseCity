<?php
    //?title=TEST&description=test_desc&time=18:30:01&date=2022/5/23
    require "./DB_Class.php";

    $title = htmlspecialchars($_GET['title']);
    $description = htmlspecialchars($_GET['description']);
    $time = htmlspecialchars($_GET['time']);
    $date = htmlspecialchars($_GET['date']);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "INSERT INTO ANNOUNCEMENTS (title, description, time, date) VALUES ('$title', '$description', '$time', '$date');";
    $query_done = $db->makeDMLQuery($query);

    if($query_done) {
        echo 'Done';
    }else {
        echo 'Fail';
    }

    $db->close();
?>