<?php

    require "./DB_Class.php";

    $seats_array = array();
    $subject_id = htmlspecialchars($_GET['subject_id']);
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
    $teached_in_query = "SELECT * FROM teached_in WHERE subject_id='$subject_id'";
    $teached_query_done = $db->makeQuery($teached_in_query);
    if($teached_query_done) {
        $teached_in_results = $db->getQueryResults();
        if(count($teached_in_results) != 0) {
            $classroom_id = $teached_in_results[0]['class_id'];
            $has_query = "SELECT * FROM has WHERE class_id = '$classroom_id'";
            $has_query_done = $db->makeQuery($has_query);
            if($has_query_done) {
                $has_results = $db->getQueryResults();
                if(count($has_results) != 0) {
                    for($i = 0; $i < count($has_results); $i++) {
                        $seat_id = $has_results[$i]['seat_id'];
                        $seats_query = "SELECT * FROM SEATS WHERE id = '$seat_id'";
                        $seats_query_done = $db->makeQuery($seats_query);
                        if($seats_query_done) {
                            $seats_result = $db->getQueryResults();
                            if(count($seats_result) != 0) {
                                $seat = $seats_result[0];
                                array_push($seats_array, "{$seat['id']}, {$seat['number']}, {$seat['state']}");
                            }
                        }
                    }
                }
            }
        }
    } 
    if(count($seats_array) != 0) {
        foreach($seats_array as $seat) {
            echo $seat;
            if(array_search($seat, $seats_array) != count($seats_array)-1)
                echo'|';
        }
    }else {
        echo 'Fail';
    }

    $db->close();
?>