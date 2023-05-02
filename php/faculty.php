<?php
  $action = $_POST["action"];
  // $action = "addStudent";
  $conn = mysqli_connect(
    'pal.h.filess.io',
    'projectams_starraceam',
    '1be59674ef7040c39135fe87671a20efe42d9dde',
    'projectams_starraceam',
    3306
)or die("Connection Failed");

  if($action == "addStudent"){
    $name = $_POST["name"];
    $student_class = $_POST["student_class"];
    $division = $_POST["div"];
    $rollno = $_POST["rollno"];
    $dob = $_POST["dob"];
    $email = $_POST["email"];
    $contact = $_POST["contact"];
    $address = $_POST["address"];
    $password = "student";

    $ciphering = "AES-256-CBC";
    $encryption_iv = '2108039892668767';
    $encryption_key = "Vishal@#2108";
    $options = 0;
    $encrypted_password = openssl_encrypt($password, $ciphering,$encryption_key, $options, $encryption_iv);
    // insert into students(name,class,division,rollno,dob,contact,email,address,password) values("vishal","sycs","d",10,"2003-01-01",0909,"eme","titit","student");
    global $conn;
    $sql = "insert into students(name,class,division,rollno,dob,contact,email,address,password) values('{$name}','{$student_class}','{$division}','{$rollno}','{$dob}','{$contact}','{$email}','{$address}','{$encrypted_password}')";
    $result = mysqli_query($conn, $sql);
    try {
        if( $result > 0){
            echo 1;
        }
        else{
            echo 0;
        }
    } catch (\Throwable $th) {
    echo $th;
    }
  }
  elseif($action == "loadTable"){
    $pageLimit = $_POST["pageLimit"];
    $curPage = $_POST["curPage"];
    $role = $_POST["role"];

    // $pageLimit = 10;
    // $curPage = 1;
    // $role = "hod";
    
    try {
      
      $sql = "select * from students";
      $result = mysqli_query($conn,$sql);
      $totalRows =  mysqli_num_rows($result);
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
      $sql = "SELECT * from students limit {$offset},{$pageLimit}";
      $result = mysqli_query($conn,$sql);
      $table = '';
      if($role == "hod"){
        $table .= '<table>
        <thead>
          <tr>
            <th id="id" style="width: 5%">Id</th>
            <th id="name" style="width: 20%" class="name-field">Name</th>
            <th id="department">Class</th>
            <th id="div">Div</th>
            <th>Roll No</th>
            <th id="dob">DOB</th>
            <th style="width: 20%">Action</th>
          </tr>
        </thead>
        <tbody>';
      }
      elseif($role == "prof"){
        $table .= '<table>
        <thead>
        <tr>
            <th id="id" style="width: 5%">Id</th>
            <th id="name" style="width: 20%" class="name-field">Name</th>
            <th id="department">Class</th>
            <th id="div">Div</th>
            <th>Roll No</th>
            <th id="dob">DOB</th>
          </tr></thead>
      <tbody>';
      }
      if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
          if($role == "hod"){
            $table .= "<tr>
            <td>{$row["id"]}</td>
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["class"]}</td>
            <td>{$row["division"]}</td>
            <td>{$row["rollno"]}</td>
            <td>{$row["contact"]}</td>
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
          elseif($role == "prof"){
            $table .="<tr>
            <td>{$row["id"]}</td>
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["class"]}</td>
            <td>{$row["division"]}</td>
            <td>{$row["rollno"]}</td>
            <td>{$row["contact"]}</td>
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
  
  elseif($action == "removeStudent"){
    $studentId = $_POST["studentId"];
    $sql = "delete from students where id = '{$studentId}'";
    if( mysqli_query($conn, $sql) > 0){
      echo 1;
    }
    else{
        echo 0;
    }

  }  
  elseif($action == "studentData"){
    $id = $_POST["id"];
    $sql = "select * from students where id = {$id}";
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
  elseif($action == "updateStudent"){

    $id = $_POST["id"];
    $name = $_POST["name"];
    $student_class = $_POST["student_class"];
    $division = $_POST["div"];
    $rollno = $_POST["rollno"];
    $dob = $_POST["dob"];
    $email = $_POST["email"];
    $contact = $_POST["contact"];
    $address = $_POST["address"];

    global $conn;
    $sql = "update students set name = '{$name}',class = '{$student_class}',division = '{$division}',rollno = '{$rollno}',dob = '{$dob}',email = '{$email}',contact = {$contact},address = '{$address}' where id = {$id}";
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
  elseif($action == "searchStudent"){
    $search_value = $_POST["value"];
    $role = $_POST["role"];
    
    try {
      if($search_value == ""){
        $sql = "SELECT * FROM students limit 0,10";
      }else{
        $sql = "SELECT * FROM students where name LIKE '%{$search_value}%'";
      }
      $result = mysqli_query($conn,$sql);
      $table = '';
      if($role == "hod"){
        $table .= '<table>
        <thead>
          <tr>
            <th id="id" style="width: 5%">Id</th>
            <th id="name" style="width: 20%" class="name-field">Name</th>
            <th id="department">Class</th>
            <th id="div">Div</th>
            <th>Roll No</th>
            <th id="dob">DOB</th>
            <th style="width: 20%">Action</th>
          </tr>
        </thead>
        <tbody>';
      }
      elseif($role == "prof"){
        $table .= '<table>
        <thead><tr>
            <th id="id" style="width: 5%">Id</th>
            <th id="name" style="width: 20%" class="name-field">Name</th>
            <th id="department">Class</th>
            <th id="div">Div</th>
            <th>Roll No</th>
            <th id="dob">DOB</th>
          </tr>
          </thead>
      <tbody>';
      }
      if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
          if($role == "hod"){
            $table .= "<tr>
            <td>{$row["id"]}</td>
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["class"]}</td>
            <td>{$row["division"]}</td>
            <td>{$row["rollno"]}</td>
            <td>{$row["contact"]}</td>
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
          elseif($role == "prof"){
            $table .="<tr>
            <td>{$row["id"]}</td>
            <td data-id='{$row["id"]}'>{$row["name"]}</td>
            <td>{$row["class"]}</td>
            <td>{$row["division"]}</td>
            <td>{$row["rollno"]}</td>
            <td>{$row["contact"]}</td>
          </tr>";
          }
        }
      }
      $table .= "</tbody></table>";
      echo $table;
        
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