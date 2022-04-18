<?php
  // The global $_POST variable allows you to access the data sent with the POST method by name
  // To access the data sent with the GET method, you can use $_GET
  // $say = htmlspecialchars($_POST['say']);
  // $to  = htmlspecialchars($_POST['to']);

  $q1 = htmlspecialchars($_POST['optradio1']);
  $q2 =htmlspecialchars($_POST['optradio2']);
  $q3 = htmlspecialchars($_POST['optradio3']);
  $q4 =htmlspecialchars($_POST['optradio4']);
  $q5 = htmlspecialchars($_POST['optradio5']);
  $q6 =htmlspecialchars($_POST['optradio6']);
  $q7 = htmlspecialchars($_POST['optradio7']);
  $q8 =htmlspecialchars($_POST['textName']);
  $q9 =htmlspecialchars($_POST['textName']);

  echo  'Rating: ', $q1, $q2,$q3, $q4,$q5, $q6,$q7, $q8, $q9;
?>