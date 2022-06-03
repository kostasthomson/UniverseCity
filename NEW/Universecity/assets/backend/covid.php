<?php

    require "./DB_Class.php";

    $queryUrl = $_GET["results"];

    $results = json_decode($queryUrl);

    $keyCovidList = "covidList";
    $keySeatList = "seatList";

    

    $covidList = $results->$keyCovidList;
    $seatList = $results->$keySeatList;

    echo var_dump($results);


?>