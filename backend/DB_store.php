<?php
    require "./DB_Class.php";
    $user_am = htmlspecialchars($_GET["am"]);
    $user_name = htmlspecialchars($_GET["name"]);
    $user_pass = htmlspecialchars($_GET["pass"]);
    
    $table_name = "STUDENT";
    $table_columns = array("am" => "TEXT", "Name" => "TEXT", "Password" => "TEXT");

    $db = new DataBase("sqlite:./test.db");
    $createTable = $db->createTable($table_name, $table_columns);
    
    if($createTable){
        $columns_string = implode(", ", $db->getColumns());
        $query = "INSERT INTO $table_name ($columns_string) VALUES ('$user_am', '$user_name', '$user_pass');";
        $db->makeDMLQuery($query);
        echo "Done";
    }else{
        echo "Table didn't created";
    }
    $db->close();
?>