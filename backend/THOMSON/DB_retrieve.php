<?php 
    require "./DB_Class.php";
    $am = htmlspecialchars($_GET["am"]);
    $pass = htmlspecialchars($_GET["pass"]);
    
    $table_name = "STUDENT";
    $table_columns = array("am" => "TEXT", "Name" => "TEXT", "Password" => "TEXT");

    $db = new DataBase("sqlite:../test.db");
    
    $query = "SELECT * FROM $table_name WHERE am='$am' AND Password='$pass';";
    $query_done = $db->makeQuery($query);

    if($query_done) {
        $user = $db->getQueryResults();
        if(count($user) == 0) {
            echo "not a registered user";
        }else {
            $am = array_keys($table_columns)[0];
            $name = array_keys($table_columns)[1];
            $password = array_keys($table_columns)[2];
            foreach($user as $u)
                echo "{$u[$am]},{$u[$name]},{$u[$password]}";
        }
    }else {
        echo "Query failed";
    }
    $db->close();
?>