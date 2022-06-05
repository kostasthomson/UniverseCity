<?php
    
    require "./DB_Class.php";

    $subject_id = htmlspecialchars($_GET["subject_id"]);

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "  SELECT class_id 
                FROM teached_in
                WHERE subject_id='$subject_id'
             ";
    $query_done = $db->makeQuery($query);
    if($query_done) {
        $query_results = $db->getQueryResults();
        if (count($query_results) != 0) {
            $id = (int)$query_results[0]['class_id'];
            $query = "  SELECT *
                        FROM CLASSROOM
                        WHERE id='$id'
                     ";
            $query_done = $db->makeQuery($query);
            if($query_done) {
                $query_results = $db->getQueryResults();
                $array = array( 'ID' => "{$query_results[0]['id']}",
                                'NAME' => "{$query_results[0]['name']}",
                                'TYPE' => "{$query_results[0]['type']}",
                                'NUMBER' => "{$query_results[0]['number']}",
                                'CAPACITY' => "{$query_results[0]['capacity']}"
            );
                echo json_encode($array);
                // foreach($query_results as $row) {
                //     echo "{$row['id']},{$row['name']},{$row['type']},{$row['number']},{$row['capacity']}";
                //     if(array_search($row, $query_results) != count($query_results)-1) {
                //         echo "/";
                //     }
                // }
                
                
            }
            
        }
        
    }
    $db->close();
?>