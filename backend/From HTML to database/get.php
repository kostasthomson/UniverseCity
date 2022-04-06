<?php

            $name = htmlspecialchars($_GET["name"]);
            $pass = htmlspecialchars($_GET["pass"]);

            $table = "TEST";
            $db = new PDO("sqlite:test.db");

            $query = "SELECT COUNT(*) FROM test WHERE name= '".$name."' AND Password='".$pass."'";
            $res = $db->query($query);
            $tb = $res->fetchAll(PDO::FETCH_ASSOC);
            
            foreach($tb as $row){
                foreach($row as $r){
                    if($r == 0){
                        $db->exec("INSERT INTO ".$table." (Name, Password) VALUES ('$name', '$pass')");
                    }else{
                        echo "You are already enrolled";
                    }
                    
                }
            }
?>