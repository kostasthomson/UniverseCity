<?php

    require "./DB_Class.php";
    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");


    // $query = "DELETE FROM studentsArrive";
    // $db->makeQuery($query);

    // $query = "SELECT * FROM enrolled_in";

    // $db->makeQuery($query);

    // $resultId = $db->getQueryResults();

    // $array;
    // $i=0;

    // foreach($resultId as $r){
    //     $j=0;
    //     foreach($r as $c){
    //         $array[$i][$j] = $c;
    //         $j++;
    //     }
    //     $i++;
    // }

    // foreach($array as $r){
    //     $random = rand(5,13);
    //     $query = "INSERT INTO studentsArrive (students_id, subject_id, sum_arrived, lessons_count) VALUES ('$r[0]', '$r[1]', $random, 13)";

    //     $db->makeQuery($query);
    // }

    // $db->makeQuery("SELECT am, code FROM SUBJECTS JOIN STUDENTS ON SUBJECTS.semester=STUDENTS.semester");
    // $results = $db->getQueryResults();
    // foreach($results as $row) {
    //     $stid = $row['am'];
    //     $suid = $row['code'];
    //     $db->makeQuery("INSERT INTO enrolled_in VALUES ('$stid', '$suid')");
    // }
    // $query = "UPDATE CLASSROOM SET capacity=48 WHERE capacity=60";
    // $db->makeQuery($query);

    // $query = "DELETE FROM SEATS";
    // $db->makeQuery($query);

    // $query = "DELETE FROM has";
    // $db->makeQuery($query);
    
    // $capacity = 0;
    // $id = 1;
    // for($class_id=1; $class_id<=24; $class_id++) {
    //     if($class_id <= 12) {
    //         $capacity = 48;
    //     } else {
    //         $capacity = 112;
    //     }
    //     for($number=1; $number<=$capacity; $number++) {
    //         $query = "INSERT INTO SEATS VALUES ($id, $number, 'F')";
    //         $db->makeQuery($query);
    //         $query = "INSERT INTO has VALUES ($class_id, $id)";
    //        
    //         $id++;
    //     }
    // }

    // for($i=1; $i<=25; $i++) {
    //     $j = $i % 25;
    //     if($j == 0) {
    //         $j=1;
    //     }
    //     $query = "INSERT INTO teached_in VALUES ($i, $j)";
    //     $db->makeQuery($query);
    // }


    $db->close();
?>