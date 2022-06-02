<?php

   
    require "./DB_Class.php";

    $queryUrl = $_GET["results"];

    $results = json_decode($queryUrl);

    $keycovidList = "covidList";
    $keyseatList = "seatList";
   

    $covidList = $results->$keycovidList;
    $seatList = $results->$keyseatList;
   
    echo $covidList;
    echo $seatList;

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
















?>