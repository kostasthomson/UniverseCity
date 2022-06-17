<?php

    require "./DB_Class.php";


    $subject_id = htmlspecialchars($_GET["subject_id"]);
    


    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
    $query = "SELECT teacher_id FROM teached_by WHERE subject_id = '$subject_id'";

    $result = array();

    if($db->makeQuery($query)) {
        $results = $db->getQueryResults();
        if(count($results)!=0) {
            $am = $results[0]['teacher_id'];
            $query = "SELECT first_name, last_name FROM TEACHERS WHERE am='$am'";
            $db->makeDMLQuery($query);

            $results = $db->getQueryResults();
            echo "{$results[0]['last_name']}, {$results[0]['first_name']}";

            // $first_name = $results[0]['first_name'];
            // $last_name = $results[0]['last_name'];
            // array_push($result, "{$first_name},{$last_name}");
            // echo json_encode($result);

        }
        else {
            echo "Wrong Subject ID";
        }
    }

    $db->close();


    
    

?>