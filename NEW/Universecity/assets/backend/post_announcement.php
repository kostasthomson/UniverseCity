<?php
    //?title=TEST&description=test_desc&time=18:30:01&date=2022-05-23&sender=S
    require "./DB_Class.php";

    $title = htmlspecialchars($_GET['title']);
    $description = htmlspecialchars($_GET['description']);
    $time = htmlspecialchars($_GET['time']);
    $date = htmlspecialchars($_GET['date']);
    $sender = htmlspecialchars($_GET['sender']);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "INSERT INTO ANNOUNCEMENTS (title, description, time, date, sender) VALUES ('$title', '$description', '$time', '$date', '$sender');";   
    $query_done = $db->makeDMLQuery($query);

    if($query_done) {
        echo 'Done';
    }else {
        echo 'Fail';
    }

    $db->close();
?>