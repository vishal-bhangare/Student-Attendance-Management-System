<?php
  $action = $_POST["action"];
  //$action = "loadTable";
  $conn = mysqli_connect(
    'pal.h.filess.io',
    'projectams_starraceam',
    '1be59674ef7040c39135fe87671a20efe42d9dde',
    'projectams_starraceam',
    3306
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
  elseif($action == "loadTable"){
    $pageLimit = $_POST["pageLimit"];
    $curPage = $_POST["curPage"];
    $tableName = $_POST["tableName"];

    //$pageLimit = 10;
    //$curPage = 1;
    //$tableName = "students";
    
    try {
      
      $sql = "select * from {$tableName}";
      $result = mysqli_query($conn,$sql);
      $totalRows =  mysqli_num_rows($result);
      // $totalRows =  66;
      $nop = ceil($totalRows / $pageLimit);

      $offset = 0; $limit = 0;
      
      if(($curPage * $pageLimit) < $totalRows){
        $offset = ($curPage * $pageLimit) - ($pageLimit);
        $limit = ($curPage * $pageLimit);
      }
      else{
        $offset = (($curPage - 1)*$pageLimit);
        $limit = $totalRows;
      }
      $sql = "SELECT * from {$tableName} limit {$offset},{$pageLimit}";
      $result = mysqli_query($conn,$sql);
      $table = '';
      if(mysqli_num_rows($result) > 0){
        if($tableName == "faculty"){

          $table = '<table>
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
        }
        elseif($tableName == "students"){
          $table = '<table>
          <thead>
          <tr>
          <th id="id" style="width:5%;">Id</th>
          <th id="name" style="width: 20%;" class="name-field">Name</th>
          <th id="class">Class</th>
          <th id="rollno">Roll no</th>
          <th id="dob">DOB</th>
          <th id="contact">contact</th>
        </tr></thead>
        <tbody>';
        }

        while($row = mysqli_fetch_array($result)){
          if($tableName == "faculty"){
            $table .= "<tr>
            <td>{$row["id"]}</td>
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["name"]}</td>
            <td>{$row["department"]}</td>
            <td>{$row["designation"]}</td>
            <td>
            <button type='button' class='editBtn' data-id='{$row[0]}'>
              <span>Edit</span>
            </button>
            <button type='button' class='removeBtn' data-id='{$row[0]}'>
            <span>Remove</span>
              </button>
              </td>
          </tr>";
          }
          elseif($tableName == "students"){
            $table .= "<tr>
            <td>{$row["id"]}</td>
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["name"]}</td>
            <td>{$row["class"]}</td>
            <td>{$row["rollno"]}</td>
            <td>{$row["contact"]}</td>
            <td>
          </tr>";
          }
          
        }
        $table .= "</tbody></table>";
         //echo $table;
        $start = $offset + 1;
        $end = $limit;
        $output[] = array("table"=>$table, "start"=>$start,"end"=>$end,"total"=>$totalRows,"nop"=>$nop);
        
        // echo "Yes";
        echo json_encode($output);
      }
      
    }catch (\Throwable $th) {
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
        <tbody>
        <tr style="
        text-align: center;
      "><td colspan = "6"}>No Data Found</td></tr>
          </tbody>
      </table>';
      echo $output;
    }
    
  } 
  
  elseif($action == "removeFaculty"){
    $facultyId = $_POST["facultyId"];
    $sql = "delete from faculty where id = '{$facultyId}'";
    if( mysqli_query($conn, $sql) > 0){
      echo 1;
    }
    else{
        echo 0;
    }

  }  
  elseif($action == "facultyData"){
    $id = $_POST["id"];
    $sql = "select * from faculty where id = {$id}";
    $result = mysqli_query($conn,$sql);
    $output = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($output);
  }
  elseif($action == "studentData"){
    $id = $_POST["id"];
    $sql = "select * from students where id = {$id}";
    $result = mysqli_query($conn,$sql);
    $output = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($output);
  }
  elseif($action == "updateFaculty"){

    $id = $_POST["id"];
    $name = $_POST["name"];
    $dob = $_POST["dob"];
    $email = $_POST["email"];
    $contact = $_POST["contact"];
    $address = $_POST["address"];
    $department = $_POST["department"];
    $designation = $_POST["designation"];

    global $conn;
    $sql = "update faculty set name = '{$name}',dob = '{$dob}',email = '{$email}',contact = {$contact},address = '{$address}',department = '{$department}',designation = '{$designation}' where id = {$id}";
    $result = mysqli_query($conn, $sql);
    try {
        if(mysqli_affected_rows($conn) > 0){
            echo 1;
        }
        else{
            echo 0;
        }
    } catch (\Throwable $th) {
    echo 0;
    }
  }
  elseif($action == "searchFaculty"){
    $search_value = $_POST["value"];
    $tableName = $_POST["tableName"];
    
    try {
      if($search_value == ""){
        $sql = "SELECT * FROM {$tableName} limit 0,10";
      }else{
        $sql = "SELECT * FROM {$tableName} where name LIKE '%{$search_value}%'";
      }
      $result = mysqli_query($conn,$sql);
      $output = '';
      if(mysqli_num_rows($result) > 0){
        if($tableName == "faculty"){

          $table = '<table>
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
        }
        elseif($tableName == "students"){
          $table = '<table>
          <thead>
          <tr>
          <th id="id" style="width:5%;">Id</th>
          <th id="name" style="width: 20%;" class="name-field">Name</th>
          <th id="class">Class</th>
          <th id="rollno">Roll no</th>
          <th id="dob">DOB</th>
          <th id="contact">contact</th>
        </tr></thead>
        <tbody>';
        }

        while($row = mysqli_fetch_array($result)){
          if($tableName == "faculty"){
            $table .= "<tr>
            <td>{$row["id"]}</td>
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["name"]}</td>
            <td>{$row["department"]}</td>
            <td>{$row["designation"]}</td>
            <td>
            <button type='button' class='editBtn' data-id='{$row[0]}'>
              <span>Edit</span>
            </button>
            <button type='button' class='removeBtn' data-id='{$row[0]}'>
            <span>Remove</span>
              </button>
              </td>
          </tr>";
          }
          elseif($tableName == "students"){
            $table .= "<tr>
            <td>{$row["id"]}</td>
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["name"]}</td>
            <td>{$row["class"]}</td>
            <td>{$row["rollno"]}</td>
            <td>{$row["contact"]}</td>
            <td>
          </tr>";
          }
          
        }
        $table .= "</tbody></table>";
        echo $table;
        
      }
    } catch (\Throwable $th) {
      //throw $th;
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
          <tbody>
          <tr style="
          text-align: center;
      "><td colspan = "6"}>No Data Found</td></tr>
          </tbody>
      </table>';
      echo $output;
    }
  }
  mysqli_close($conn);

?>