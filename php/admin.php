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
  elseif($action == "loadTable"){
    $pageLimit = $_POST["pageLimit"];
    $curPage = $_POST["curPage"];
    
    try {
      $sql = "select * from faculty";
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
      $sql = "SELECT * from faculty limit {$offset},{$pageLimit}";
      $result = mysqli_query($conn,$sql);
      $table = '';
      if(mysqli_num_rows($result) > 0){
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
        while($row = mysqli_fetch_assoc($result)){
          $table .= "<tr>
            <td>{$row["id"]}</td>
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["dob"]}</td>
            <td>{$row["department"]}</td>
            <td>{$row["designation"]}</td>
            <td>
            <button type='button' class='editBtn' data-id='{$row["id"]}'>
              <span>Edit</span>
            </button>
            <button type='button' class='removeBtn' data-id='{$row["id"]}'>
            <span>Remove</span>
              </button>
              </td>
          </tr>";
        }
        $table .= "</tbody></table>";
        // echo $table;
        $start = $offset + 1;
        $end = $limit;

        // $output = array();
        // $output ['table'] = $table;
        // $output ['start'] = $start;
        // $output ['end'] = $end;
        // $output ['total'] = $totalRows;
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

    try {
      if($search_value == ""){
        $sql = "SELECT * FROM faculty limit 0,10";
      }else{
        $sql = "SELECT * FROM faculty where name LIKE '%{$search_value}%'";
      }
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
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["dob"]}</td>
            <td>{$row["department"]}</td>
            <td>{$row["designation"]}</td>
            <td>
            <button type='button' class='editBtn' data-id='{$row["id"]}'>
              <span>Edit</span>
            </button>
            <button type='button' class='removeBtn' data-id='{$row["id"]}'>
            <span>Remove</span>
              </button>
              </td>
          </tr>";
        }
        $output .= "</tbody></table>";
        echo $output;
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