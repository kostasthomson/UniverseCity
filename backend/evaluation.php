<?php
    
    $subject = htmlspecialchars($_GET["subjects"]);
    $ans1 = htmlspecialchars($_GET["optradio1"]);
    $ans2 = htmlspecialchars($_GET["optradio2"]);
    $ans3 = htmlspecialchars($_GET["optradio3"]);
    $ans4 = htmlspecialchars($_GET["optradio4"]);
    $ans5 = htmlspecialchars($_GET["optradio5"]);

    
    $table = "EVALUATION";
    $db = new PDO("sqlite:evaluation_form.db");
    $db->exec("INSERT INTO ".$table." (Subject, Answer1, Answer2, Answer3, Answer4, Answer5) VALUES ('$subject', '$ans1', '$ans2', '$ans3', '$ans4', '$ans5')");
    
    
    
?>