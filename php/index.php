<?php

try {
    $name = "vishal";
    $conn = mysqli_connect(
        'iec.h.filess.io',
        'projectams_unknownbuy',
        '762c30c8c3b48dc2e82833ba5018c0d35aecb510',
        'projectams_unknownbuy',
        3307
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