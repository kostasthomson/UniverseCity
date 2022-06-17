<?php

    require "./DB_Class.php";


    


    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $count = 1;
    for($i = 1921; $i<=1920+12;$i++) {
        $query = "INSERT INTO SEATS VALUES($i,100+$count,'F')";
        $db->makeDMLQuery($query);
        $query = "INSERT INTO has VALUES(24,$i)";
        $db->makeDMLQuery($query);
        $count++;
    }
    $results = $db->getQueryResults();

    $db->close();


    
    

?>