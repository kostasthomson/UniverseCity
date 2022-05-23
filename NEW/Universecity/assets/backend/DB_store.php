<?php
    require "./DB_Class.php";
    $filename = htmlspecialchars($_GET["fname"]);
    $checkbox = htmlspecialchars($_GET["myCheckboxName"]);
    $description = htmlspecialchars($_GET["desc"]);
    
    $table_name = "COVID";
    $table_columns = array("fname" => "TEXT", "myCheckboxName" => "TEXT", "desc" => "TEXT");

    $db = new DataBase("sqlite:DATABASES/test.db");
    $createTable = $db->createTable($table_name, $table_columns);
    
    if($createTable){
        $columns_string = implode(", ", array_keys($db->getColumns()) );
        $query = "INSERT INTO $table_name ($columns_string) VALUES ('$filename', '$checkbox', '$description');";
        $db->makeDMLQuery($query);
        echo "Done";
    }else{
        echo "Table didn't created";
    }
    $db->close();
?>