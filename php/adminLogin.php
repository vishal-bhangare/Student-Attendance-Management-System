<?php
    $action = $_POST["action"];

    $conn = mysqli_connect(
        'pal.h.filess.io',
        'projectams_starraceam',
        '1be59674ef7040c39135fe87671a20efe42d9dde',
        'projectams_starraceam',
        3306
    )or die("Connection Failed");
    

    function checkAdmin($user,$pass){
        global $conn;
        

        $result = mysqli_query($conn, "select * from admins where username = '{$user}' and password = '{$pass}'") or die("Sql query failed");

        if(mysqli_num_rows($result)>0){
            return 1;
        }
        else{
            return 0;
        }
    }
    
    if($action == "adminlogin"){
        $user = $_POST["username"];
        $pass = $_POST["password"];
        $ciphering = "AES-256-CBC";
        $encryption_iv = '2108039892668767';
        $encryption_key = "Vishal@#2108";
        $options = 0;
        $encrypted_pass = openssl_encrypt($pass, $ciphering,$encryption_key, $options, $encryption_iv);
        if(checkAdmin($user,$encrypted_pass)){
            echo 1;
        }
        else{
            echo 0;
        }
    }

    mysqli_close($conn);


?>