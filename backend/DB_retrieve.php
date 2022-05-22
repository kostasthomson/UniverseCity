<?php 
    require "./DB_Class.php";
    $user_am = htmlspecialchars($_GET["am"]);
    $user_pass = htmlspecialchars($_GET["pass"]);

    $table_name = "STUDENT";
    $table_columns = array("am" => "TEXT", "Name" => "TEXT", "Password" => "TEXT");

    $db = new DataBase("sqlite:DATABASES/test.db");

    $query = "SELECT * FROM $table_name WHERE am='$user_am' AND Password='$user_pass';";
    $query_done = $db->makeQuery($query);

    if($query_done) {
        $user = $db->getQueryResults();
        if(count($user) == 0) {
            echo "Unrecorded";
        }else {
            $u = $user[0];
            echo "{$u['am']},{$u['Name']},{$u['Password']}";
        }
    }else {
        echo "Fail";
    }
    $db->close();
?>