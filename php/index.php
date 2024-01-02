<?php

try {
    $name = "vishal";
    
    $conn = mysqli_connect(
        'localhost',
        'id21649519_admin',
        'Vishal@2108',
        'id21649519_studpunch',
        3306
    )
        or die("Connection Failed" . mysqli_connect_error());
    if ($conn) {
        echo 'Connected established</br>';
    }

    $result = mysqli_query($conn, "select * from test") or die("Sql query failed");
    while ($row = mysqli_fetch_assoc($result)) {
        echo "id : {$row["id"]} username : {$row["username"]} password : {$row["password"]} </br>";
    }
} catch (\Throwable $th) {
    echo $th;
}
finally{
    mysqli_close($conn);
    echo 'Connection closed';
    echo $name;
}

?>