<?php
  $action = $_POST["action"];
  // $action = "submitAttendance";
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
      else{
        $table = '<table>
        <thead>
          <tr>
          <th id="id" style="width:100%;">No Data Found</th>
        </thead>
        <tbody>
          </tbody>
      </table>';
      $output[] = array("table"=>$table, "start"=>0,"end"=>0,"total"=>0,"nop"=>0);
        
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
  elseif($action == "loadAttendanceTable"){
    $pageLimit = $_POST["pageLimit"];
    $curPage = $_POST["curPage"];
    $className = $_POST["className"];

    // $pageLimit = 10;
    // $curPage = 1;
    // $className = "SYCS";
    
    try {
      
      $sql = "select student_id from attendance where class_name = '{$className}' group by student_id;";
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
      $sql = "select student_id,
      (select rollno from students where id = student_id) as rollno,
      (select name from students where id = student_id) as name,
      count(*) as total,
      (select count(*) from attendance where class_name = '{$className}' and student_id = A.student_id and remark='P') as present,
      (select count(*) from attendance where class_name = '{$className}' and student_id = A.student_id and remark='A') as absent
      from attendance as A where class_name = '{$className}' group by student_id limit {$offset},{$pageLimit}";
      $result = mysqli_query($conn,$sql);
      $table = '<table>
            <thead>
              <tr>
                <th id="rollno" style="width: 10%">Roll no</th>
                <th id="name" style="width: 30%" class="name-field">Name</th>
                <th id="present">Present(%)</th>
                <th id="absent">Absent(%)</th>
                <th style="width: 10%"></th>
              </tr>
            </thead>
            <tbody>';
      if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
          $presentPer = 0; $absentPer =0;
          $presentPer = ($row["present"] /$row["total"]) * 100;
          $absentPer = ($row["absent"] /$row["total"]) * 100;
          $table .=
          "<tr>
                <td>{$row["rollno"]}</td>
                <td>{$row["name"]}</td>
                <td>{$presentPer}</td>
                <td>{$absentPer}</td>
                <td data-id='{$row["student_id"]}'><i class='bx bx-chevron-right'></i></td>
              </tr>";
        }
        $table .= "</tbody></table>";
         //echo $table;
        $start = $offset + 1;
        $end = $limit;
        $output[] = array("table"=>$table, "start"=>$start,"end"=>$end,"total"=>$totalRows,"nop"=>$nop);
        
        // echo "Yes";
        echo json_encode($output);
      }else{
        $table = '<table>
        <thead>
          <tr>
          <th id="id" style="width:100%;">No Data Found</th>
        </thead>
        <tbody>
          </tbody>
      </table>';
      $output[] = array("table"=>$table, "start"=>0,"end"=>0,"total"=>0,"nop"=>0);
        
        echo json_encode($output);
      }
      
    }catch (\Throwable $th) {
      echo $th;
    }
    
  }
  elseif($action == "loadStudentAttendanceTable"){
    $studentId = $_POST["studentId"];

    // $studentId = 7;
    
    try {
      $sql = "SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));";
      mysqli_query($conn,$sql);
      $sql = "select (select subject_name from departments where subject_code = A.subject_code) as subject_name,
      (select name from faculty where id = A.faculty_id) as faculty_name,
       count(*) as total ,
      (select count(*) from attendance where student_id = {$studentId} and subject_code = A.subject_code and remark='P') as present,
      (select count(*) from attendance where student_id = {$studentId} and subject_code = A.subject_code and remark='A') as absent,
      (select name from students where id = {$studentId} ) as student_name,
      (select class from students where  id= {$studentId} ) as student_class,
      (select division from students where  id= {$studentId} ) as student_div,
      (select rollno from students where  id= {$studentId} ) as student_rollno
      from attendance as A 
      where student_id = {$studentId}
      group by subject_code;";
      $student_name = ""; $student_class = "";  $student_rollno = "";
      $result = mysqli_query($conn,$sql);
      $table = '<table>
              <thead>
                <tr>
                  <th>Subject Name</th>
                  <th>Faculty Name</th>
                  <th>Total Lecture</th>
                  <th>Present Lecture</th>
                  <th>Absent Lecture</th>
                </tr>
              </thead>
              <tbody>';
      if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
          $table .="<tr>
                  <td>{$row["subject_name"]}</td>
                  <td>{$row["faculty_name"]}</td>
                  <td>{$row["total"]}</td>
                  <td>{$row["present"]}</td>
                  <td>{$row["absent"]}</td>
                </tr>  ";
          $student_name = $row["student_name"];
          $student_class = $row["student_class"] . "-".$row["student_div"];
          $student_rollno = $row["student_rollno"];
          
        }
        $table .= "</tbody></table>";
        $output[] = array("table"=>$table, "name"=>$student_name,"class"=>$student_class,"rollno"=>$student_rollno);
        
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
      echo $th;
    }
    
  }
  elseif($action == "scheduleLecture"){
    $className = $_POST["className"];
    $day = $_POST["day"];
    $subject = $_POST["subject"];
    $faculty = $_POST["faculty"];
    $from = $_POST["from"];
    $to = $_POST["to"];
   
    global $conn;
    $sql = "insert into schedule(class,day,subject,faculty,from_time,to_time) values('{$className}','{$day}','{$subject}','{$faculty}','{$from}','{$to}')";
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
  elseif($action == "loadTimetable"){
    $className = $_POST["className"];
    
    try {
      $sql = "select * from schedule where class='{$className}'";
      $result = mysqli_query($conn,$sql);
      
      
      $arr= array();
      if(mysqli_num_rows($result) > 0){
        $table = '<table>
      <thead>
        <tr>
          <th>Time</th>
          <th>
            <button type="button" class="monday">
              <span>Monday</span>
            </button>
          </th>
          <th>
            <button type="button" class="tuesday">
              <span>Tuesday</span>
            </button>
          </th>
          <th>
            <button type="button" class="wednesday">
              <span>Wednesday</span>
            </button>
          </th>
          <th>
            <button type="button" class="thursday">
              <span>Thursday</span>
            </button>
          </th>
          <th>
            <button type="button" class="friday">
              <span>Friday</span>
            </button>
          </th>
          <th>
            <button type="button" class="saturday">
              <span>Saturday</span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>';
        while($row = mysqli_fetch_array($result)){
          $arr[] =$row;
        }
        $slots = array(array(),array(), array(),  array(),array(), array()  );
        for($i = 0; $i<count($arr);$i++){
          $from = (int)substr($arr[$i][3],0,2) ;
            if($from == 7){
              $slots[0][] = $arr[$i];
            }
            else if($from == 8){
              $slots[1][] = $arr[$i];
            }
            else if($from == 9){
              $slots[2][] = $arr[$i];
            }
            else if($from == 10){
              $slots[3][] = $arr[$i];
            }
            else if($from == 11){
              $slots[4][] = $arr[$i];
            }
            else if($from == 12){
              $slots[5][] = $arr[$i];
            }
        }
        $temp= array(array(""),array(""),array(""),array(""),array(""),array(""));
        for($i = 0; $i < sizeof($slots);$i++){
          for($j=0;$j<6;$j++){
              if(!empty($slots[$i][$j])){
                if($slots[$i][$j][2] == "monday"){
                  $temp[$i][0] = $slots[$i][$j];
                }
                else if($slots[$i][$j][2] == "tuesday"){
                  $temp[$i][1] = $slots[$i][$j];
                }
                else if($slots[$i][$j][2] == "wednesday"){
                  $temp[$i][2] = $slots[$i][$j];
                }
                else if($slots[$i][$j][2] == "thursday"){
                  $temp[$i][3] = $slots[$i][$j];
                }
                else if($slots[$i][$j][2] == "friday"){
                  $temp[$i][4] = $slots[$i][$j];
                }
                else if($slots[$i][$j][2] == "saturday"){
                  $temp[$i][5] = $slots[$i][$j];
                }
              }
          }
        }
        for($i = 0; $i < 6;$i++){
          $x = $i +1; $y = $i + 7;
          $table .="<tr data-slot='slot-{$x}'>
          <td><span>{$y}:00</span><span>{$y}:30</span></td>"; 
          for($j=0;$j<6;$j++){
            if(empty($temp[$i][$j][0])){
                $table .="<td></td>";
              }
              else{
                $from = substr($temp[$i][$j][3],0,5);
                $to = substr($temp[$i][$j][4],0,5);
                $from_time = strtotime($from);
                $to_time = strtotime($to);
                $interval  = abs($to_time - $from_time);
                $minutes   = round($interval / 60);
                $height = ceil(1.667 * $minutes);
                $from_min = substr($from,3,2);
                $top = ceil(1.667*$from_min);
                $table .="<td><div data-id='{$temp[$i][$j][0]}'style='height:{$height}%; top:{$top}%' >
                  <span class='time'>{$from}-{$to}</span>
                  <span class='subject'>{$temp[$i][$j][5]}</span>
                  
                </div></td>";   
              }
            }
          }
          $table .= "</tr>";
          $table .= "</tbody></table>";
          echo $table;
      }else{
        $output = '<table>
        <thead>
          <tr>
          <th id="id" style="width:100%;">No Data Found</th>
        </thead>
        <tbody>
          </tbody>
      </table>';
      echo $output;
      }
     }
      catch (\Throwable $th) {
        
      }
      
  }
  elseif($action == "lectureDetails"){
    $lectureId = $_POST["lectureId"];
    $sql = "select * from schedule where id = {$lectureId}";
    $result = mysqli_query($conn,$sql);
    $output = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($output);
  }
  elseif($action == "modifyLecture"){
    
    $id = $_POST["id"];
    $className = $_POST["className"];
    $day = $_POST["day"];
    $subject = $_POST["subject"];
    $faculty = $_POST["faculty"];
    $from = $_POST["from"];
    $to = $_POST["to"];
    
    global $conn;
    $sql = "update schedule set day = '{$day}',from_time = '{$from}',to_time = '{$to}',faculty = '{$faculty}',subject = '{$subject}' where id = {$id} and class='{$className}'";
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
  elseif($action == "removeLecture"){
    $lectureId = $_POST["lectureId"];
    $sql = "delete from schedule where id = '{$lectureId}'";
    if( mysqli_query($conn, $sql) > 0){
      echo 1;
    }
    else{
        echo 0;
    }
  }
  elseif($action == "loadSubmissionAttendanceTable"){
    $className = $_POST["className"];
    $facutlyName = $_POST["facutlyName"];
    $subjectName =$_POST["subjectName"];
    // $className = "SYCS";
    // $facutlyName = "prof.rahul";
    // $subjectName = "python";
    $faculty = explode(".",$facutlyName);

    try {
      $sql = "select * from students where class='{$className}';";
      $result = mysqli_query($conn,$sql);
      $table = '<table>
      <thead>
        <tr>
          <th id="id">ID</th>
          <th id="studentName">Student Name</th>
          <th id="remark">Remark</th>
        </tr>
      </thead>
      <tbody>';
      if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
          $table .=
          "<tr data-id='{$row["id"]}'>
                <td>{$row["id"]}</td>
                <td>{$row["name"]}</td>
                <td>
                    <div class='remark'>A</div>
                  </td>
              </tr>";
        }
      }
      $table .= "</tbody></table>";
      $sql = "select id from faculty where name='{$faculty[1]}';";
      $result = mysqli_query($conn,$sql);
      if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
          $facutlyID = $row[0];
        }
      }

      $sql = "select subject_code from departments where subject_name = '{$subjectName}'";
      $result = mysqli_query($conn,$sql);
      if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
          $subjectCode = $row[0];
        }
      }
      $output[] = array("table"=>$table, "subjectCode"=>$subjectCode,"facutlyID"=>$facutlyID);
      
      // echo $table;
      echo json_encode($output);
      // print_r($output);
      
    }catch (\Throwable $th) {
      $output = '<table>
        <thead>
          <tr>
          <th id="id" style="width:100%;">No Data Found</th>
        </thead>
        <tbody>
          </tbody>
      </table>';
      echo $output;
    }
    
  }
  elseif($action == "submitAttendance"){
    $year = (int)date("Y"); 
    $month = (int)date("m"); 
    if($month > 5){
      $year2 = $year + 1;
      $aca_year =  $year."-".$year2;
    }
    else if($month <6){
      $year2 = $year - 1;
      $aca_year = $year2."-".$year;
    }
    date_default_timezone_set('Asia/Kolkata');
    $timestamp = date('Y-m-d H:i:s');
    $className = $_POST["className"];
    $facutlyId = $_POST["facutlyId"];
    $subjectCode = $_POST["subjectCode"];
    $lectureId = $_POST["lectureId"];
    $attendanceData = $_POST["attendanceData"];
    $total_rows = count($attendanceData);
    $count = 0;
    try {
      for($i =0; $i<$total_rows;$i++){
        $studentId = (int)$attendanceData[$i][0];
        $remarkTemp = $attendanceData[$i][2];
        if(strrpos($remarkTemp,"A")){
          $remark = "A";
        }
        else{
          $remark = "P";
        }
        $sql = "insert into attendance(academic_year,class_name,timestamp,subject_code,faculty_id,student_id,remark,lecture_id) values('{$aca_year}','{$className}','{$timestamp}','{$subjectCode}',{$facutlyId},{$studentId},'{$remark}',{$lectureId});";
        $result = mysqli_query($conn, $sql);
        if($result > 0){
            $count++;
        }
       
      }
    } catch (\Throwable $th) {
    echo 0;
    }
    echo $count;
  }
  elseif($action == "leavesData"){
    $className = $_POST["className"];
    // $sql = "select * from leaves where student_class = '{$className}'";
    $sql = "select * from leaves where student_class = '{$className}' ORDER BY CASE status WHEN -1 THEN 3 WHEN 1 THEN 2 WHEN 0 THEN 1 ELSE 0 END;";
    $result = mysqli_query($conn,$sql);
    $table = '<table>
    <thead>
      <th>Id</th>
      <th>Application date</th>
      <th>Reason</th>
      <th>Status</th>
      <th></th>
    </thead>
    <tbody>';
    if(mysqli_num_rows($result) > 0){
      while($row = mysqli_fetch_array($result)){
        $status = "unknown";
        if($row["status"] == 0){
          $status = "pending";
        }
        elseif($row["status"] == -1){
          $status = "rejected";
        }
        elseif($row["status"] == 1){
          $status = "accepted";
        }
        $table .="<tr>
        <td>{$row["id"]}</td>
        <td>{$row["application_date"]}</td>
        <td>{$row["reason_subject"]}</td>
        <td>{$status}</td>
        <td data-id='{$row["id"]}'><i class='bx bx-chevron-right'></i></td>
      </tr>";
      }
      $table .= "</tbody></table>";
    }else{
      $table = '<table>
      <thead>
        <tr>
        <th id="id" style="width:100%;">No Data Found</th>
      </thead>
      <tbody>
        </tbody>
    </table>';
    }
    $output[] = array("table"=>$table);
    echo json_encode($output);
  }
  elseif($action == "leaveData"){
    $leaveId = $_POST["leaveId"];
    $sql = "select * from leaves where id = {$leaveId}";
    $result = mysqli_query($conn,$sql);
    $output = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($output);
  }
  elseif($action == "acceptLeaveApplication"){
    $leaveId = $_POST["leaveId"];
    $sql = "update leaves set status = 1 where id = {$leaveId}";
    if( mysqli_query($conn, $sql) > 0){
      echo 1;
    }
    else{
        echo 0;
    }
  }
  elseif($action == "rejectLeaveApplication"){
    $leaveId = $_POST["leaveId"];
    $sql = "update leaves set status = -1 where id = {$leaveId}";
    if( mysqli_query($conn, $sql) > 0){
      echo 1;
    }
    else{
      echo 0;
    }
  }
  mysqli_close($conn);
//   select id from faculty where name = "rahul";
// select subject_code from departments where subject_name = "iot";

  //  date_default_timezone_set('Asia/Kolkata');
  // $date = date('Y/m/d H:i:s');
  // select count(*) from attendance where student_id = 7 and remark = "A";
  // select count(*) from attendance where student_id = 7 and remark = "P";
  // select subject_code ,count(*) from attendance where student_id = 7 and remark = "P" group by subject_code; 
?>


