<?php 
    
    require "./DB_Class.php";

    $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");

    $query = "SELECT subject,answer_1,answer_2,answer_3,answer_4,answer_5,answer_6,answer_7,answer_8,answer_9,answer_10,answer_11,answer_12,text,title FROM  EVALUATION JOIN teached_by ON teached_by.subject_id = EVALUATION.subject JOIN SUBJECTS ON EVALUATION.subject = SUBJECTS.code WHERE teached_by.teacher_id = 'demo3'";
    
    $db->makeQuery($query);

    $result = $db->getQueryResults();

    foreach($result as $r){
        $keys = array_keys($r);
        foreach(array_keys($r) as $k){
            echo $r[$k];
            if(array_search($k, array_keys($r)) != count(array_keys($r))-1) {
                echo ",";
            }
        }
        if(array_search($r, $result) != count($result)-1) {
            echo ".";
        }
        
        

    }
?>