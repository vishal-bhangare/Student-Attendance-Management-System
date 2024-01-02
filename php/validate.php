<?php
  $action = $_POST["action"];
  
  $conn = mysqli_connect(
    'localhost',
        'id21649519_admin',
        'Vishal@2108',
        'id21649519_studpunch',
    3306
)or die("Connection Failed");

  if($action == "faculty"){
    $user = $_POST["username"];
    $pass = $_POST["password"];
    $sql = "select * from faculty where username = '{$user}' and password = '{$pass}'";
    try {
      $result = mysqli_query($conn, $sql) or die("Sql query failed");
      if(mysqli_num_rows($result)>0){
        echo 1;
      }
      else{
        echo 0;
      }
    } catch (\Throwable $th) {
      echo -1;
    }
  }
  else if($action == "student"){
    echo -1;
  }

  mysqli_close($conn);
