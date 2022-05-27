<?php
    $subject = htmlspecialchars($_GET["subjects"]);
    $ans1 = htmlspecialchars($_GET["optradio1"]);
    $ans2 = htmlspecialchars($_GET["optradio2"]);
    $ans3 = htmlspecialchars($_GET["optradio3"]);
    $ans4 = htmlspecialchars($_GET["optradio4"]);
    $ans5 = htmlspecialchars($_GET["optradio5"]);
    $ans6 = htmlspecialchars($_GET["optradio6"]);
    $ans7 = htmlspecialchars($_GET["optradio7"]);
    $ans8 = htmlspecialchars($_GET["optradio8"]);
    $ans9 = htmlspecialchars($_GET["optradio9"]);
    $ans10 = htmlspecialchars($_GET["optradio10"]);
    $ans11 = htmlspecialchars($_GET["optradio11"]);
    $ans12 = htmlspecialchars($_GET["optradio12"]);

    
    $table = "EVALUATION";
    $db = new PDO("sqlite:evaluation_form.db");
    $db->exec("INSERT INTO ".$table." (Subject, Answer1, Answer2, Answer3, Answer4, Answer5, Answer6, Answer7, Answer8, Answer9, Answer10, Answer11, Answer12) VALUES ('$subject', '$ans1', '$ans2', '$ans3', '$ans4', '$ans5', '$ans6', '$ans7', '$ans8', '$ans9', '$ans10', '$ans11', '$ans12')");
    
    
    
?>