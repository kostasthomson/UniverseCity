<!-- <?php
    require "./DB_Class.php";
    $user_am = htmlspecialchars($_GET["am"]);
    $user_name = htmlspecialchars($_GET["name"]);
    $user_pass = htmlspecialchars($_GET["pass"]);
    
    $table_name = "STUDENT";
    $table_columns = array("am" => "TEXT", "Name" => "TEXT", "Password" => "TEXT");

    ?> -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Qr Code</title>
  </head>
  <body>
    <script src="../Universecity/js/html5-qrcode.min.js"></script>

    <div class="row">
      <div class="col">
        <div style="width: 500px" id="reader"></div>
      </div>
      <div class="col" style="padding: 30px">
        <h4>SCAN RESULT</h4>
        <div id="result">Result Here</div>
      </div>
    </div>

    <script src="../Universecity/js/qrCode.js"></script>

  </body>
</html>
