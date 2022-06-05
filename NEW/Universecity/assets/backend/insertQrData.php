<?php


  require "./DB_Class.php";

  $data = array("216048520487"=>"ics21008", "277773744389"=>"ics21010", "286100013096"=> "ics21003");
  $db = new DataBase("sqlite:DATABASES/STORAGE_fortesting.db");
  $db ->makeDMLQuery("DELETE FROM QRCODE");
  $db ->makeDMLQuery("DELETE FROM identify");
//   ('0', '216048520487'), 
//   ('0', '277773744389'), 
//   ('0', '267220448759')";
  $id = 1 ;
  foreach( $data as $student_pass_id=>$student_id){
      $query1 = "INSERT INTO QRCODE VALUES ($id, 0, '$student_pass_id')";
      $query2 = "INSERT INTO identify VALUES ($id, '$student_id')";
      $db -> makeDMLQuery($query1);
      $db -> makeDMLQuery($query2);
      $id++;
  }
  
  $db->close();

?>