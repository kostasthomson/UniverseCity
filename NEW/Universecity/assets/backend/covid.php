<?php

    require "./DB_Class.php";

    $queryUrl = $_GET["results"];

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $results = json_decode($queryUrl);

    $keyCovidList = "covidList";
    $keySeatList = "seatList";
    $keyDateList = "dateList";

    $covidList = $results->$keyCovidList;
    $seatList = $results->$keySeatList;
    $dateList = $results->$keyDateList;

    for($i=0;$i<count($covidList);$i++){

        $date = $dateList[$i];

        for($j=0;$j<count($covidList[$i]);$j++){

            $class = $covidList[$i][$j];
            $seat = $seatList[$i][$j];
            
            $query = "INSERT INTO covid_report (class_type, seat_id, date) VALUES ('$class', $seat, '$date')";

            $db->makeQuery($query);
        }
    }
?>