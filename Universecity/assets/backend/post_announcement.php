<?php
    require "./DB_Class.php";
    $notifications_string = $_GET["notification"];
    $notifications = json_decode($notifications_string);
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
    $query = "INSERT INTO ANNOUNCEMENTS (title, description, sender_id, sender,publish_day, remove_day, publish_time, toStudents, toPh, asUniversity) VALUES ('$notifications->title', '$notifications->description', '$notifications->sender_id', '$notifications->sender','$notifications->publish_day', '$notifications->remove_day', '$notifications->publish_time', $notifications->toStudents, $notifications->toPh, $notifications->asUniversity);";   
    $query_done = $db->makeDMLQuery($query);
    if($query_done) {
        echo 'Done';
    }else {
        echo 'Fail';
    }
    $db->close();
?>