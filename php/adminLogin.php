<?php
    $action = $_POST["action"];

    $conn = mysqli_connect(
        'iec.h.filess.io',
        'projectams_unknownbuy',
        '762c30c8c3b48dc2e82833ba5018c0d35aecb510',
        'projectams_unknownbuy',
        3307
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
        if(checkAdmin($user,$pass)){
            echo 1;
        }
        else{
            echo 0;
        }
    }

    mysqli_close($conn);


?>