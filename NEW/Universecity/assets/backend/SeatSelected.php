<?php

    require "./DB_Class.php";


    $dataSeatID = htmlspecialchars($_GET["seat_id"]);
    $student_id = htmlspecialchars($_GET["student_id"]);
    $semester = (int)htmlspecialchars($_GET["semester"]);
    


    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
    $query = "SELECT * FROM is_sitting WHERE seat_id = $dataSeatID";

    if($db->makeQuery($query)) {
        $results = $db->getQueryResults();
        if(count($results)==0) {
            $query = "INSERT INTO is_sitting VALUES ('$student_id',$dataSeatID)";
            $db->makeDMLQuery($query);

            if ($semester == 4) { // temp implementation with $semester
                $query = "UPDATE SEATS SET higher_semester_state='T' WHERE id=$dataSeatID";
                $db->makeDMLQuery($query);
            }
            else {
                $query = "UPDATE SEATS SET lower_semester_state='T' WHERE id=$dataSeatID";
                $db->makeDMLQuery($query);
            }
            echo $semester;
        }
        else {
            echo "Occupied";
        }
    }

    $db->close();


    
    

?>