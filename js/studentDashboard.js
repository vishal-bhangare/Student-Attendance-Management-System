var li_elements = document.querySelectorAll(".sidebar ul li");

var item_elements = document.querySelectorAll(".item");

item_elements.forEach(function (item) {
  if (item.classList[1] != "leaves") item.style.display = "none";
});

for (var i = 0; i < li_elements.length; i++) {
  li_elements[i].addEventListener("click", function () {
    li_elements.forEach(function (li) {
      li.classList.remove("active");
    });
    this.classList.add("active");

    var li_value = this.getAttribute("data-li");
    item_elements.forEach(function (item) {
      item.style.display = "none";
    });
    if (li_value == "home") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "attendance") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "timetable") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "leaves") {
      document.querySelector("." + li_value).style.display = "block";
    } else {
      console.log("");
    }
  });
}

const optionMenus = document.querySelectorAll(".select-menu ");

optionMenus.forEach((optionMenu) => {
  let max = 0;
  if (optionMenu.parentElement.parentElement.classList.length > 1) {
    optionMenu.parentElement.parentElement.classList[1];
    document
      .querySelectorAll(
        "." +
        optionMenu.parentElement.parentElement.classList[1] +
        " .options .option .option-text"
      )
      .forEach((elm) => {
        if (max < getTextWidth(elm.innerText)) {
          max = getTextWidth(elm.innerText);
        }
      });
  } else {
    document
      .querySelectorAll(
        "." +
        optionMenu.parentElement.parentElement.classList[0] +
        " .options .option .option-text"
      )
      .forEach((elm) => {
        if (max < getTextWidth(elm.innerText)) {
          max = getTextWidth(elm.innerText);
        }
      });
  }
  // console.log(max);

  var temp = document.querySelector(
    "." + optionMenu.parentElement.parentElement.classList[1] + " .sBtn-text"
  );
  if (temp != null) {
    temp.style.width = max + 4 + "px";
  }
  document.querySelector(
    "." + optionMenu.parentElement.parentElement.classList[0] + " .select-menu"
  ).style.minWidth = "fit-content";

  const selectBtns = optionMenu.querySelectorAll(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text");

  selectBtns.forEach((selectBtn) => {
    selectBtn.addEventListener("click", () =>
      optionMenu.classList.toggle("active2")
    );
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((option) => {
        option.classList.remove("selected");
      });
      let selectedOption = option.querySelector(".option-text").innerText;
      sBtn_text.innerText = selectedOption;
      option.classList.add("selected");
      optionMenu.classList.remove("active2");
    });
  });
});

const editBtns = document.querySelectorAll(".container table tr .editBtn"),
  cardBackground2 = document.querySelector(".container .card-background2");

editBtns.forEach((editBtn) => {
  editBtn.addEventListener("click", () => {
    cardBackground2.style.display = "block";
  });
});

function getTextWidth(text) {
  inputText = text;
  font = "15px Poppins";

  canvas = document.createElement("canvas");
  context = canvas.getContext("2d");
  context.font = font;
  width = context.measureText(inputText).width;
  formattedWidth = Math.ceil(width);

  return formattedWidth;
}

const mediaQuery = window.matchMedia("(max-width: 480px)");
if (mediaQuery.matches) {
  const dayBtns = document.querySelectorAll(".timetable .content button");
  for (var i = 0; i < dayBtns.length; i++) {
    dayBtns[i].addEventListener("click", function () {
      dayBtns.forEach(function (li) {
        li.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  }
} else {
  const dayBtns = document.querySelectorAll(".timetable .content button");
  dayBtns.forEach((btn) => {
    btn.classList.remove("selected");
  });
}

const toggleBtn = document.querySelector(".toggle-sidebar");
const sidebar = document.querySelector(".sidebar");
window.onload = () => {
  if (window.matchMedia("(max-width:768px)").matches) {
    toggleBtn.addEventListener("click", () => {
      const sidebarStatus = window.getComputedStyle(sidebar).visibility;
      if (sidebarStatus == "visible") {
        sidebar.style.visibility = "hidden";
        toggleBtn.style.left = "0";
        document.querySelector(".main").style.cssText = `
    width: 100%;
    left: 0;
    `;
        document.querySelector(".toggle-sidebar > i").style.transform =
          "rotate(0deg)";
        document.querySelector(".toggle-sidebar > i").style.translate = "0 0";
      } else {
        sidebar.style.visibility = "visible";

        document.querySelector(".toggle-sidebar > i").style.transform =
          "rotate(-180deg)";
        document.querySelector(".toggle-sidebar > i").style.translate =
          "-2px 0";
        toggleBtn.style.left = "260px";
      }
    });
  } else {
    toggleBtn.addEventListener("click", () => {
      const sidebarStatus = window.getComputedStyle(sidebar).visibility;
      if (sidebarStatus == "visible") {
        sidebar.style.visibility = "hidden";
        toggleBtn.style.left = "0";
        document.querySelector(".main").style.cssText = `
    width: 100%;
    left: 0;
    `;
        document.querySelector(".toggle-sidebar > i").style.transform =
          "rotate(0deg)";
        document.querySelector(".toggle-sidebar > i").style.translate = "0 0";
      } else {
        sidebar.style.visibility = "visible";
        document.querySelector(".main").style.cssText = `
    width: calc(100% - 260px);
    left: 260px;
    `;
        document.querySelector(".toggle-sidebar > i").style.transform =
          "rotate(-180deg)";
        document.querySelector(".toggle-sidebar > i").style.translate =
          "-2px 0";
        toggleBtn.style.left = "260px";
      }
    });
  }
};

if (window.matchMedia("(max-width:768px)").matches) {
  sidebar.style.visibility = "hidden";
  toggleBtn.style.left = "0";
  document.querySelector(".main").style.cssText = `
    width: 100%;
    left: 0;
    `;
  document.querySelector(".toggle-sidebar > i").style.transform =
    "rotate(0deg)";
  document.querySelector(".toggle-sidebar > i").style.translate = "0 0";
}
window.onresize = () => {
  if (window.matchMedia("(max-width:768px)").matches) {
    sidebar.style.visibility = "hidden";
    toggleBtn.style.left = "0";
    document.querySelector(".main").style.cssText = `
      width: 100%;
      left: 0;
      `;
    document.querySelector(".toggle-sidebar > i").style.transform =
      "rotate(0deg)";
    document.querySelector(".toggle-sidebar > i").style.translate = "0 0";
  } else {
    sidebar.style.visibility = "visible";
    document.querySelector(".main").style.cssText = `
    width: calc(100% - 260px);
    left: 260px;
    `;
    document.querySelector(".toggle-sidebar > i").style.transform =
      "rotate(-180deg)";
    document.querySelector(".toggle-sidebar > i").style.translate = "-2px 0";
    toggleBtn.style.left = "260px";
  }
};

$(document).ready(function () {
  username = sessionStorage.getItem("username");
  userId = sessionStorage.getItem("userid");
  $(".user-details #username").text(username);
  $("#logout").on("click", function () {
    window.location.href = "/studentFacultyLogin.html";
    sessionStorage.clear();
  });
  $(".nav-links .attendanceBtn").on("click", function () {
    $(".attendance .studentData").css("display", "block");
    var studentId = $(this).data("id");
    $.ajax({
      url: "/php/student.php",
      type: "POST",
      dataType: "json",
      data: { action: "loadAttendanceTable", studentId: userId },
      success: (data) => {
        console.log(data);
        if (data) {
          $.each(data, (key, value) => {
            $(".attendance > #table-data").empty();
            $(".attendance > #table-data").append(value.table);
            $(".attendance .info #studentName").text(value.name);
            $(".attendance .info #studentClass").text(value.class);
            $(".attendance .info #studentRollno").text(value.rollno);
            console.log(value.name + "--" + value.class + "--" + value.rollno);
          });
        }
      },
    });
  });
  $(document).on(
    "click",
    ".attendance > #table-data tbody td:last-child",
    function () {
      $(".attendance > .attendanceDetails").css("display", "block");
      $(".attendance > #table-data").css("display", "none");
      $(".attendance > .header").css("display", "none");
      $(".attendance > .endSection").css("display", "none");

      var subjectCode = $(this).data("subjectcode");
      console.log(subjectCode);
      $(".attendance > .attendanceDetails .info #student_name").text(
        $(this).data("studentname")
      );
      $(".attendance > .attendanceDetails .info #subject_name").text(
        $(this).data("subjectname")
      );
      $(".attendance > .attendanceDetails .info #rollno").text(
        $(this).data("studentrollno")
      );
      $(".attendance > .attendanceDetails .info #subject_code").text(
        subjectCode
      );
      $(".attendance > .attendanceDetails .info #student_class").text(
        $(this).data("studentclass")
      );
      $(".attendance > .attendanceDetails .info #faculty_name").text(
        $(this).data("facultyname")
      );

      $.ajax({
        url: "/php/student.php",
        type: "POST",
        data: {
          action: "attendanceDetails",
          studentId: userId,
          subjectCode: subjectCode,
        },
        success: (data) => {
          console.log(data);
          if (data) {
            $(".attendance > .attendanceDetails #table-data").empty();
            $(".attendance > .attendanceDetails #table-data").append(data);
          }
        },
      });
    }
  );
  $(".attendance > .attendanceDetails #close").on("click", function () {
    $(".attendance > .attendanceDetails").css("display", "none");
    $(".attendance > #table-data").css("display", "block");
    $(".attendance > .header").css("display", "block");
    $(".attendance > .endSection").css("display", "flex");
  });

  $(".nav-links .timetableBtn").on("click", function () {
    class_name = sessionStorage.getItem("class").toUpperCase();
    console.log(class_name);
    $.ajax({
      url: "/php/student.php",
      type: "POST",
      data: { action: "loadTimetable", className: class_name },
      success: (data) => {
        console.log(data);
        if (data) {
          $(".timetable .content > #table-data").html(data);
        }
      },
    });
  });
  $(document).on(
    "click",
    ".timetable .content > #table-data tbody tr td div",
    function () {
      lectureId = $(this).data("id");
      $.ajax({
        url: "/php/student.php",
        type: "POST",
        dataType: "json",
        data: { action: "lectureDetails", lectureId: lectureId },
        success: (data) => {
          // console.log(data);
          if (data) {
            $.each(data, (key, value) => {
              $(".timetable > .content .lecture-details #day").text(value.day);
              $(".timetable > .content .lecture-details #from_time").text(
                value.from_time
              );
              $(".timetable > .content .lecture-details #to_time").text(
                value.to_time
              );
              $(".timetable > .content .lecture-details #subject").text(
                value.subject
              );
              $(".timetable > .content .lecture-details #faculty").text(
                value.faculty
              );
            });
          }
          $(".timetable .lecture-details").css("display", "block");
        },
      });
    }
  );
  $(".timetable .card-background .card i").on("click", function () {
    $(".timetable .card-background").css("display", "none");
  });

  $(".attendance .endSection #reportBtn").on("click", function () {
    $(".attendance").printThis({
      header: "<h2><center>Attendance report</center></h2>",
    });
  });

  $(".sidebar .leavesBtn").on("click", function () {
    userId = sessionStorage.getItem("userid");
    $.ajax({
      url: "/php/student.php",
      type: "POST",
      dataType: "JSON",
      data: { action: "studentData", id: userId },
      success: function (data) {
        if (data) {
          console.log(data);
          // $.each(data, (key, value) => {
            $(".leaves .container #student_id").val(data[0].studentData[0].id);
            $(".leaves .container #name").val(data[0].studentData[0].name);
            $(".leaves .container #class").val(data[0].studentData[0].class);
            $(".leaves .container #div").val(data[0].studentData[0].division);
            $(".leaves .container #rollno").val(data[0].studentData[0].rollno);
            $(".leaves .data #table-data").html(data[0].table)
          // });
        } else {
          $("#error-msg")
            .html("Error occured !!!")
            .slideDown()
            .delay(2000)
            .slideUp();
        }
      },
    });
  });
  $(".leaves .data .header #new").on("click",function(){
    $(".leaves .container").css("display","grid");
    $(" .leaves .data").css("display","none");
  })
  $(".leaves .container #submit").on("click", function () {
    student_id = sessionStorage.getItem("userid");
    student_name = $(".leaves .container #name").val();
    student_rollno = $(".leaves .container #rollno").val();
    student_class = ($(".leaves .container #class").val()).toUpperCase();
    student_div = $(".leaves .container #div").val();
    from_date = $(".leaves .container #from_date").val();
    to_date = $(".leaves .container #to_date").val();
    reason_subject = $(".leaves .container #reason_subject").val();
    reason_body = $(".leaves .container #reason_body").val();
    if ($(".leaves .container #attachment").val() == "") {
      attachment = 0;
    } else {
      attachment = 1;
    }
   
   if(student_id == "" || student_name == ""|| student_rollno == ""|| student_class == ""|| from_date == ""|| student_div == ""|| to_date == ""||reason_subject == ""|| reason_body == ""){
    $("#error-msg")
    .html("all fields required")
    .slideDown()
    .delay(2000)
    .slideUp();
   }
   else{
    $.ajax({
      url: "/php/student.php",
      type: "POST",
      data: {
        action: "leaveApplication",
        studentId: student_id,
        studentName: student_name,
        studentRollno: student_rollno,
        studentClass: student_class,
        studentDiv: student_div,
        fromDate: from_date,
        toDate: to_date,
        reasonSubject: reason_subject,
        reasonBody: reason_body,
        attachment: attachment
      },
      success: (data) => {
        console.log(data);
        if (data == 1) {
          $(".leaves .container #name").val("");
          $(".leaves .container #rollno").val("");
          $(".leaves .container #class").val("");
          $(".leaves .container #div").val("");
          $(".leaves .container #from_date").val("");
          $(".leaves .container #to_date").val("");
          $(".leaves .container #reason_subject").val("");
          $(".leaves .container #reason_body").val("");
          $("#success-msg")
            .html("leave application submitted")
            .slideDown()
            .delay(2000)
            .slideUp();
        } else {
          $("#error-msg")
            .html("Error occured")
            .slideDown()
            .delay(2000)
            .slideUp();
        }
      },
    });
   }
  });
  $(".leaves .container #close").on("click", function () {
    $(".leaves .container").css("display","none");
    $(" .leaves .data").css("display","block");
  });

});
