<?php
    
    require "./DB_Class.php";

    $announcement_id = htmlspecialchars($_GET['announcement_id']);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "DELETE FROM ANNOUNCEMENTS WHERE id=$announcement_id";
    $query_done = $db->makeQuery($query);
    if($query_done) {
        echo 'Done';
    } else {
        echo 'Fail';
    }
?>