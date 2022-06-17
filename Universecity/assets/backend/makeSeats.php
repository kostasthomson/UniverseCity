<?php

    require "./DB_Class.php";


    


    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    for($i = 14; $i<168;$i++) {
        $query = "INSERT INTO SEATS VALUES($i,$i,'F')";
        $db->makeDMLQuery($query);
        $query = "INSERT INTO has VALUES(2,$i)";
        $db->makeDMLQuery($query);
    }
    $results = $db->getQueryResults();

    $db->close();


    
    

?>