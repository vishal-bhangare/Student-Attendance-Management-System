<?php
  $action = $_POST["action"];
  // $action = "loadAttendanceTable";
  $conn = mysqli_connect(
    'pal.h.filess.io',
    'projectams_starraceam',
    '1be59674ef7040c39135fe87671a20efe42d9dde',
    'projectams_starraceam',
    3306
  )or die("Connection Failed");

  if($action == "loadAttendanceTable"){
    $studentId = $_POST["studentId"];

    // $studentId = 1;
    
    try {
      $sql = "SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));";
      mysqli_query($conn,$sql);
      $sql = "select (select subject_name from departments where subject_code = A.subject_code) as subject_name,
      (select concat(designation,'.',name) from faculty where id = A.faculty_id) as faculty_name,
       count(*) as total ,
      (select count(*) from attendance where student_id = {$studentId} and subject_code = A.subject_code and remark='P') as present,
      (select count(*) from attendance where student_id = {$studentId} and subject_code = A.subject_code and remark='A') as absent,
      (select name from students where id = {$studentId} ) as student_name,
      (select class from students where  id= {$studentId} ) as student_class,
      (select division from students where  id= {$studentId} ) as student_div,
      (select rollno from students where  id= {$studentId} ) as student_rollno,
      subject_code
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
                  <th style="width: 5%"></th>
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
                  <td data-subjectcode={$row["subject_code"]} data-subjectname='{$row["subject_name"]}' data-facultyname={$row["faculty_name"]}  data-studentname='{$row["student_name"]}'  data-studentclass={$row["student_class"]}  data-studentrollno={$row["student_rollno"]}><i class='bx bx-chevron-right'></i></td>
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
      else{
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
      
      
    }catch (\Throwable $th) {
      
      echo $th;
    }
    
  }
  else if($action == "attendanceDetails"){
    $studentId = $_POST["studentId"];
    $subjectCode = $_POST["subjectCode"];

    // $studentId = 1;
    
    try {
      $sql = "select timestamp,(select concat(substring(from_time,1,5),'-',substring(to_time,1,5)) from schedule where id= A.lecture_id) as lecture_time, remark from attendance as A where student_id = {$studentId} and subject_code = '{$subjectCode}'; ";
      $result = mysqli_query($conn,$sql);
      $table = '<table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Day</th>
          <th>Lecture time</th>
          <th style="width: 10%">Remark</th>
        </tr>
      </thead>
      <tbody>';
      if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
          $timestamp = $row["timestamp"];
          $day = date('l', strtotime($timestamp));
          $table .="<tr>
          <td>$timestamp</td>
          <td>$day</td>
          <td>{$row["lecture_time"]}</td>
          <td>
            <div class='remark' data-value='{$row["remark"]}'>{$row["remark"]}</div>
          </td>
        </tr>";
        }
        $table .= "</tbody></table>";
        echo $table;
      }
      else{
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
      
    }catch (\Throwable $th) {
      
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
  elseif($action == "studentData"){
    $id = $_POST["id"];
    $sql = "select * from students where id = {$id}";
    $result = mysqli_query($conn,$sql);
    $output = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($output);
  }
  elseif($action == "leaveApplication"){
    $studentId = $_POST["studentId"];
    $studentName = $_POST["studentName"];
    $studentRollno = $_POST["studentRollno"];
    $studentClass = $_POST["studentClass"];
    $studentDiv = $_POST["studentDiv"];
    $fromDate = $_POST["fromDate"];
    $toDate = $_POST["toDate"];
    $reasonSubject = $_POST["reasonSubject"];
    $reasonBody = $_POST["reasonBody"];
    $attachment = $_POST["attachment"];
    $status = 0;
    $sql = "insert into leaves(student_id,student_name,student_class,student_rollno,student_div,from_date,to_date,reason_subject,reason_body,attachment,status) values({$studentId},'{$studentName}','{$studentClass}',{$studentRollno},'{$studentDiv}','{$fromDate}','{$toDate}','{$reasonSubject}','{$reasonBody}',{$attachment},{$status})";
    if( mysqli_query($conn, $sql) > 0){
      echo 1;
    }
    else{
        echo 0;
    }
  }
  mysqli_close($conn); 

?>


