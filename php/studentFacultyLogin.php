<?php
    $action = $_POST["action"];
    // $action = "facultyLogin";

    $conn = mysqli_connect(
        'pal.h.filess.io',
        'projectams_starraceam',
        '1be59674ef7040c39135fe87671a20efe42d9dde',
        'projectams_starraceam',
        3306
    )or die("Connection Failed");
    
    if($action == "facultyLogin"){
        $user = $_POST["username"];
        $pass = $_POST["password"];
        // $user = "marie@gmail.com";
        // $pass = "mari2010";
        $ciphering = "AES-256-CBC";
        $encryption_iv = '2108039892668767';
        $encryption_key = "Vishal@#2108";
        $options = 0;
        $encrypted_pass = openssl_encrypt($pass, $ciphering,$encryption_key, $options, $encryption_iv);

        $result = mysqli_query($conn, "select * from faculty where email = '{$user}' and password = '{$encrypted_pass}'") or die("Sql query failed");

        if(mysqli_num_rows($result)>0 ){
            while($row = mysqli_fetch_array($result)){
              $output[] = array("status" => 1, "role"=> $row["designation"],"name"=>$row["name"]);
              echo json_encode($output);
            }
        }
        else{
          $output[] = array("status" => 0, "role"=> "none");
          echo json_encode($output);
        }
    }
    else if($action == "studentLogin"){
      $user = $_POST["username"];
      $pass = $_POST["password"];
      // $user = "john@mail.me";
      // $pass = "student";
      $ciphering = "AES-256-CBC";
      $encryption_iv = '2108039892668767';
      $encryption_key = "Vishal@#2108";
      $options = 0;
      $encrypted_pass = openssl_encrypt($pass, $ciphering,$encryption_key, $options, $encryption_iv);
      $query = "select * from students where email = '{$user}' and password = '{$encrypted_pass}'";
      $result = mysqli_query($conn,$query );
      // echo $result;
      if(mysqli_num_rows($result)>0 ){
          while($row = mysqli_fetch_array($result)){
            $output[] = array("status" => 1, "id"=> $row["id"],"name"=>$row["name"],"class"=> $row["class"]);
            echo json_encode($output);
          }
      }
      else{
        $output[] = array("status" => 0);
        echo json_encode($output);
      }
    }

    mysqli_close($conn);


?>