<?php
    require "./DB_Class.php";
    $db = NEW DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    // DELETE TABLE FIRST FOR CHANGES
    // $sql1 = "DROP TABLE studentsArrive";
    // $query_done = $db->makeQuery($sql1);

    // $sql = "CREATE TABLE studentsArrive (students_id VARCHAR(30), subject_id VARCHAR(30), sum_arrived INT(4), lessons_count INT(4))";
    // $query_done = $db->makeQuery($sql);
    
    // $sql1 = "SELECT am FROM STUDENTS WHERE semester IN (SELECT semester FROM SUBJECTS)";
    // $query_correct = $db->makeDMLQuery($sql1);

    // if($query_correct){
    //     $user = $db->getQueryResults();//
    //     if(count($user) == 0){
    //         echo "no results";
    //     }else{
    //         echo var_dump($user);
    //         echo "<br><br>";
    //         foreach(array_values($user) as $i){
    //             echo $i['am']. ' ';
                
    //             // $query = "INSERT INTO studentsArrive VALUES ('$i','onoma','0')";
    //             // $db -> makeDMLQuery($query);
    //         }
    //     }
    // }else{
    //     echo "fail";
    // }


    // Meta tin dimiourgeia tou pinaka 

    $query = "DELETE FROM studentsArrive";
    $db->makeDMLQuery($query);

    $query = "SELECT * FROM enrolled_in";

    $db->makeDMLQuery($query);

    $resultId = $db->getQueryResults();

    $array;
    $i=0;

    foreach($resultId as $r){
        $j=0;
        foreach($r as $c){
            $array[$i][$j] = $c;
            $j++;
        }
        $i++;
    }

    foreach($array as $r){
        $random = rand(50,100);
        $query = "INSERT INTO studentsArrive (students_id, subject_id, sum_arrived, lessons_count) VALUES ('$r[0]', '$r[1]', 0, $random)";

        $db->makeDMLQuery($query);
    }


    $db->close();
   
    
?>