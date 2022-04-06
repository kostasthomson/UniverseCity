<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $name = htmlspecialchars($_GET["name"]);
        $pass = htmlspecialchars($_GET["pass"]);
        $db = new PDO("sqlite:test.db");
        $query = "SELECT COUNT(*) FROM students WHERE name='".$name."' AND password='".$pass."'";
        $res = $db->query($query);
        $table = $res->fetchAll(PDO::FETCH_ASSOC);
        foreach($table as $row) {
            foreach($row as $r) {
                if($r != 0) {
                    echo "hello";
                }else{
                    echo "not a user";
                }
            }
        }
        $db = null;
    ?>
</body>
</html>

