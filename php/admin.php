<?php
    $action = $_POST["action"];

    $conn = mysqli_connect(
        'iec.h.filess.io',
        'projectams_unknownbuy',
        '762c30c8c3b48dc2e82833ba5018c0d35aecb510',
        'projectams_unknownbuy',
        3307
    )or die("Connection Failed");
    

    
    if($action == "addFaculty"){
        $name = $_POST["name"];
        $dob = $_POST["dob"];
        $email = $_POST["email"];
        $contact = $_POST["contact"];
        $address = $_POST["address"];
        $department = $_POST["department"];
        $designation = $_POST["designation"];

        global $conn;
        $sql = "insert into faculty(name,dob,email,contact,address,department,designation) values('{$name}','{$dob}','{$email}',{$contact},'{$address}','{$department}','{$designation}')";
        // $result = mysqli_query($conn, $sql) or die("Sql query failed");
       try {
           if( mysqli_query($conn, $sql) > 0){
               echo 1;
           }
           else{
               echo 0;
           }
       } catch (\Throwable $th) {
        echo 0;
       }

    }
    elseif($action == "loadData"){
        $sql = "select * from faculty";
        $result = mysqli_query($conn,$sql);
        $output = '';
        if(mysqli_num_rows($result) > 0){
            $output = '<table>
            <thead>
              <tr>
                <th id="id" style="width:5%;">Id</th>
                <th id="name" style="width: 20%;" class="name-field">Name</th>
                <th id="dob">DOB</th>
                <th id="department">Department</th>
                <th>Designation</th>
                <th style="width: 20%;"></th>
              </tr>
            </thead>
            <tbody>';
            while($row = mysqli_fetch_assoc($result)){
                $output .= "<tr>
                <td>{$row["id"]}</td>
                <td>{$row["name"]}</td>
                <td>{$row["dob"]}</td>
                <td>{$row["department"]}</td>
                <td>{$row["designation"]}</td>
                <td>
                  <button type='button' class='editBtn'>
                    <span>Edit</span>
                  </button>
                  <button type='button' class='removeBtn'>
                    <span>Remove</span>
                  </button>
                </td>
              </tr>";
            }
            $output .= "</tbody></table>";
            echo $output;
        }
        else{
            echo "<h2>No Data Found</h2>";
        }
    }

    mysqli_close($conn);


?>