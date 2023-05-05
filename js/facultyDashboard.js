var li_elements = document.querySelectorAll(".sidebar ul li");

var item_elements = document.querySelectorAll(".item");

item_elements.forEach(function (item) {
  if (item.classList[1] != "timetable")
    item.style.display = "none";
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
    } else if (li_value == "students") {
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
    optionMenu.parentElement.parentElement.classList[1]
    document.querySelectorAll("." + optionMenu.parentElement.parentElement.classList[1] + " .options .option .option-text").forEach((elm) => {
      if (max < getTextWidth(elm.innerText)) {
        max = getTextWidth(elm.innerText);
      }
    })
  } else {
    document.querySelectorAll("." + optionMenu.parentElement.parentElement.classList[0] + " .options .option .option-text").forEach((elm) => {
      if (max < getTextWidth(elm.innerText)) {
        max = getTextWidth(elm.innerText);
      }
    })
  }
  // console.log(max);


  document.querySelector("." + optionMenu.parentElement.parentElement.classList[0] + " .select-menu").style.minWidth = "fit-content";

  const selectBtns = optionMenu.querySelectorAll(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text");

  selectBtns.forEach((selectBtn) => {
    selectBtn.addEventListener("click", () =>
      optionMenu.classList.toggle("active2")
    );
  })

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((option) => {
        option.classList.remove("selected");
      });
      let selectedOption = option.querySelector(".option-text").innerText;
      sBtn_text.innerText = selectedOption;
      option.classList.add("selected");
      optionMenu.classList.remove("active2");
      var temp = document.querySelector("." + optionMenu.parentElement.parentElement.classList[1] + " .sBtn-text");
      if (temp != null) {
        temp.style.width = max + 4 + "px";
      }
    });
  });
})



const closeCardBtns = document.querySelectorAll(".card .close-card");

closeCardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".card-background").forEach((card) => {
      card.style.display = "none";
    })

  })
})




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

const mediaQuery = window.matchMedia('(max-width: 480px)');
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
}
else {

  const dayBtns = document.querySelectorAll(".timetable .content button");
  dayBtns.forEach((btn) => {
    btn.classList.remove("selected");
  })

}
document.querySelector(".timetable .header .manageBtn").addEventListener("click", () => {
  tableCells.forEach((addBtn) => {
    addBtn.style.display = "flex";
  })
})

const tableCards = document.querySelectorAll(".timetable table tbody tr td div.scheduled");

tableCards.forEach(card => {
  card.addEventListener("click", () => {
    card.style.background = "blue";

    document.querySelector(".timetable .content .card-background").style.display = "block";

    document.querySelector(".timetable ").style.overflowY = "auto";

  })
});

document.querySelector(".timetable .content .card i").addEventListener("click", () => {
  document.querySelector(".timetable .content .card-background").style.display = "none";
  document.querySelector(".timetable ").style.overflowY = "auto";
})

const toggleBtn = document.querySelector(".toggle-sidebar");
const sidebar = document.querySelector(".sidebar");
window.onload = () => {
  if (window.matchMedia('(max-width:768px)').matches) {
    toggleBtn.addEventListener("click", () => {
      const sidebarStatus = window.getComputedStyle(sidebar).visibility;
      if (sidebarStatus == "visible") {
        sidebar.style.visibility = "hidden";
        toggleBtn.style.left = "0";
        document.querySelector(".main").style.cssText = `
    width: 100%;
    left: 0;
    `;
        document.querySelector(".toggle-sidebar > i").style.transform = "rotate(0deg)";
        document.querySelector(".toggle-sidebar > i").style.translate = "0 0";

      } else {
        sidebar.style.visibility = "visible";

        document.querySelector(".toggle-sidebar > i").style.transform = "rotate(-180deg)";
        document.querySelector(".toggle-sidebar > i").style.translate = "-2px 0";
        toggleBtn.style.left = "260px";

      }

    })
  }
  else {
    toggleBtn.addEventListener("click", () => {
      const sidebarStatus = window.getComputedStyle(sidebar).visibility;
      if (sidebarStatus == "visible") {
        sidebar.style.visibility = "hidden";
        toggleBtn.style.left = "0";
        document.querySelector(".main").style.cssText = `
    width: 100%;
    left: 0;
    `;
        document.querySelector(".toggle-sidebar > i").style.transform = "rotate(0deg)";
        document.querySelector(".toggle-sidebar > i").style.translate = "0 0";

      } else {
        sidebar.style.visibility = "visible";
        document.querySelector(".main").style.cssText = `
    width: calc(100% - 260px);
    left: 260px;
    `;
        document.querySelector(".toggle-sidebar > i").style.transform = "rotate(-180deg)";
        document.querySelector(".toggle-sidebar > i").style.translate = "-2px 0";
        toggleBtn.style.left = "260px";

      }

    })
  }
}

if (window.matchMedia('(max-width:768px)').matches) {
  sidebar.style.visibility = "hidden";
  toggleBtn.style.left = "0";
  document.querySelector(".main").style.cssText = `
    width: 100%;
    left: 0;
    `;
  document.querySelector(".toggle-sidebar > i").style.transform = "rotate(0deg)";
  document.querySelector(".toggle-sidebar > i").style.translate = "0 0";

}
window.onresize = () => {
  if (window.matchMedia('(max-width:768px)').matches) {
    sidebar.style.visibility = "hidden";
    toggleBtn.style.left = "0";
    document.querySelector(".main").style.cssText = `
      width: 100%;
      left: 0;
      `;
    document.querySelector(".toggle-sidebar > i").style.transform = "rotate(0deg)";
    document.querySelector(".toggle-sidebar > i").style.translate = "0 0";
  }
  else {
    sidebar.style.visibility = "visible";
    document.querySelector(".main").style.cssText = `
    width: calc(100% - 260px);
    left: 260px;
    `;
    document.querySelector(".toggle-sidebar > i").style.transform = "rotate(-180deg)";
    document.querySelector(".toggle-sidebar > i").style.translate = "-2px 0";
    toggleBtn.style.left = "260px";
  }
}


const attendanceDetailsBtns = document.querySelectorAll(".attendance > .data > table tbody tr td i");
attendanceDetailsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".attendance > .studentData").style.display = "block";
  })
})
document.querySelector(".attendance .studentData .close-card").addEventListener("click", () => {
  document.querySelector(".attendance > .studentData").style.display = "none";
})

$.fn.gparent = function (recursion) {
  //console.log( 'recursion: ' + recursion );
  if (recursion > 1) return $(this).parent().gparent(recursion - 1);
  return $(this).parent();
};

$(document).ready(function () {
  let start, end, total, nop, limit;
  let cur = 1;

  username = sessionStorage.getItem("username");
  role = sessionStorage.getItem("role");
  $(".user-details #username").text(username);
  if (role == "hod") {
    $(".students .header").css("justify-content", "space-between");
    $(".students .header .addBtn").css("display", "block")
  }
  $("#logout").on("click", function () {
    window.location.href = "/studentFacultyLogin.html";
    sessionStorage.clear();
  })

  function loadTable(pageLimit, curPage, role) {
    $.ajax({
      url: "/php/faculty.php",
      type: "POST",
      dataType: "json",
      data: { action: "loadTable", pageLimit: pageLimit, curPage: curPage, role: role },
      success: (data) => {
        console.log(data);
        if (data) {
          $.each(data, (key, value) => {
            $(".students #table-data").empty();
            $(".students #table-data").append(value.table);
            start = value.start;
            end = value.end;
            total = value.total;
            nop = value.nop;
            $(".students .pages #info").text(start + " - " + end + " of " + total);

            if (nop == 1) {
              $(".previous").css("color", "grey").css("pointer-events", "none");
              $(".left").css("color", "grey").css("pointer-events", "none");
              $(".next").css("color", "grey").css("pointer-events", "none");
              $(".right").css("color", "grey").css("pointer-events", "none");

            }
            else if (curPage == 1 && nop > 1) {
              $(".previous").css("color", "grey").css("pointer-events", "none");
              $(".left").css("color", "grey").css("pointer-events", "none");

              $(".next").css("color", "#111").css("pointer-events", "auto");
              $(".right").css("color", "#111").css("pointer-events", "auto");
            }
            else if ((curPage > 1 && curPage < nop) && (nop > 1)) {
              $(".previous").css("color", "#111").css("pointer-events", "auto");
              $(".left").css("color", "#111").css("pointer-events", "auto");
              $(".next").css("color", "#111").css("pointer-events", "auto");
              $(".right").css("color", "#111").css("pointer-events", "auto");
            }
            else if (curPage == nop && nop > 1) {
              $(".next").css("color", "grey").css("pointer-events", "none");
              $(".right").css("color", "grey").css("pointer-events", "none");
              $(".previous").css("color", "#111").css("pointer-events", "auto");
              $(".left").css("color", "#111").css("pointer-events", "auto");
            }
          });
        }

      }
    })
  }

  $("#students").on("click", function () {
    loadTable(10, 1, role);
    console.log("called");
  })
  $(document).on("click", ".students .data table td:nth-child(2)", function () {
    document.querySelector(".students .container .card-background").style.display = "block"
    var studentId = $(this).data('id');

    $.ajax({
      url: "/php/admin.php",
      type: "POST",
      dataType: "JSON",
      data: { action: "studentData", id: studentId },
      success: function (data) {
        // console.log(data);
        if (data) {
          $.each(data, (key, value) => {
            $(".students .card-background #id").text(value.id);
            $(".students .card-background #name").text(value.name);
            $(".students .card-background #class").text(value.class);
            $(".students .card-background #div").text(value.div);
            $(".students .card-background #rollno").text(value.rollno);
            $(".students .card-background #dob").text(value.dob);
            $(".students .card-background #contact").text(value.contact);
            $(".students .card-background #email").text(value.email);
            $(".students .card-background #address").text(value.address);

          })
        }
        else {
          $("#error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
        }
      }
    })
  })
  $(".students .next").on("click", function () {
    limit = $(".students .select-menu .sBtn-text").text();
    cur = nop;
    loadTable(limit, cur, role);
  });

  $(".students .right").on("click", function () {
    limit = $(".students .select-menu .sBtn-text").text();
    cur += 1;
    loadTable(limit, cur, role);
  });

  $(".students .previous").on("click", function () {
    limit = $(".students .select-menu .sBtn-text").text();
    cur = 1;
    loadTable(limit, cur, role);
  });

  $(".students .left").on("click", function () {
    limit = $(".students .select-menu .sBtn-text").text();
    cur -= 1;
    loadTable(limit, cur, role);
  });
  $(".students .data .select-menu .options .option").on("click", function () {
    limit = $(".students .select-menu .sBtn-text").text();
    loadTable(limit, 1, role);
  })
  $(".students .search-bar #search").on("keyup", function () {
    var search_value = $(".students .search-bar #search").val();
    $.ajax({
      url: "/php/faculty.php",
      type: "POST",
      data: { action: "searchStudent", value: search_value, role: role },
      success: function (data) {
        console.log(data);
        $(".students #table-data").html(data);
      }
    })
  })
  $(".header .addBtn").on("click", function () {
    $(".card-background2").css("display", "block");
  })
  $(document).on("click", ".card-background2 .addBtn", function (btn) {
    btn.preventDefault();
    var name = $(".card-background2 #name");
    var student_class = $(".card-background2 #student_class");
    var div = $(".card-background2 #div");
    var rollno = $(".card-background2 #rollno");
    var dob = $(".card-background2 #dob");
    var email = $(".card-background2 #email");
    var contact = $(".card-background2 #contact");
    var address = $(".card-background2 #address");

    if (name.val() == "" || student_class.val() == "" || div.val() == "" || rollno.val() == "" || dob.val() == "" || email.val() == "" || contact.val() == "" || address.val() == "") {
      $("#error-msg").html("All field are required").slideDown().delay(2000).slideUp();
    }
    else {
      $.ajax({
        url: "/php/faculty.php",
        type: "POST",
        data: {
          action: "addStudent",
          name: name.val(),
          student_class: student_class.val(),
          div: div.val(),
          rollno: rollno.val(),
          dob: dob.val(),
          email: email.val(),
          contact: contact.val(),
          address: address.val()
        },
        success: function (data) {
          console.log(data);
          if (data == 1) {
            name.val("");
            student_class.val("");
            div.val("");
            rollno.val("");
            dob.val("");
            email.val("");
            contact.val("");
            address.val("");
            $("#success-msg").html("Student Added").slideDown().delay(2000).slideUp();
            limit = $(".students .select-menu .sBtn-text").text();
            loadTable(limit, 1, role);

          }
          else if (data == 0) {
            name.val("");
            student_class.val("");
            div.val("");
            rollno.val("");
            dob.val("");
            email.val("");
            contact.val("");
            address.val("");
            $("#error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
          }
        }
      })
    }
  })
  $(document).on("click", ".card-background2 .closeBtn", function (btn) {
    btn.preventDefault();
    $(".card-background2").css("display", "none");
  })
  $(document).on("click", ".students .data table .editBtn", function (btn) {
    $(".card-background4").css("display", "block");
  })
  $(document).on("click", ".students .card-background4 .closeBtn", function (btn) {
    btn.preventDefault
    $(".card-background4").css("display", "none");
  })
  $(document).on("click", ".students .container .data table tr .removeBtn", function () {

    document.querySelector(".students .container .card-background3").style.display = "block";
    document.querySelector(".students .container").style.overflow = "hidden";

    var element = this;
    var studentId = $(this).data('id');

    $(document).on("click", ".students > .card-background3 .removeBtn", function () {
      $.ajax({
        url: "/php/faculty.php",
        type: "POST",
        data: { action: "removeStudent", studentId: studentId },
        success: function (data) {
          if (data == 1) {
            document.querySelector(".students .container .card-background3").style.display = "none";
            $("#success-msg").html("Record removed").slideDown().delay(2000).slideUp();
            $(element).closest("tr").fadeOut();
            limit = $(".students .select-menu .sBtn-text").text();
            loadTable(limit, 1, role);
          }
          else if (data == 0) {
            $("#error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
          }
        }
      })
    })
  })

  $(document).on("click", ".students .container .data table tr .editBtn", function () {
    var element = this;
    var studentId = $(this).data('id');
    $.ajax({
      url: "/php/faculty.php",
      type: "POST",
      dataType: "JSON",
      data: { action: "studentData", id: studentId },
      success: function (data) {
        // console.log(data);
        if (data) {
          $.each(data, (key, value) => {
            $(".students .card-background4 #id").val(value.id);
            $(".students .card-background4 #name").val(value.name);
            $(".students .card-background4 #class").val(value.class);
            $(".students .card-background4 #div").val(value.division);
            $(".students .card-background4 #rollno").val(value.rollno);
            $(".students .card-background4 #dob").val(value.dob);
            $(".students .card-background4 #email").val(value.email);
            $(".students .card-background4 #contact").val(value.contact);
            $(".students .card-background4 #address").val(value.address);

          })
          $(document).on("click", ".container table tr .editBtn", function () {
            document.querySelector(".container .card-background4").style.display = "block";
            document.querySelector(".container").style.overflow = "hidden";
          })
        }
        else {
          $("#error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
        }
      }
    })
  })

  $(".card-background4 .saveBtn").on("click", (btn) => {
    btn.preventDefault();
    var id = $(".card-background4 #id");
    var name = $(".card-background4 #name");
    var student_class = $(".card-background4 #student_class");
    var div = $(".card-background4 #div");
    var rollno = $(".card-background4 #rollno");
    var dob = $(".card-background4 #dob");
    var email = $(".card-background4 #email");
    var contact = $(".card-background4 #contact");
    var address = $(".card-background4 #address");

    $.ajax({
      url: "/php/faculty.php",
      type: "POST",
      data: {
        action: "updateStudent",
        id: id.val(),
        name: name.val(),
        student_class: student_class.val(),
        div: div.val(),
        rollno: rollno.val(),
        dob: dob.val(),
        email: email.val(),
        contact: contact.val(),
        address: address.val()
      },
      success: function (data) {
        console.log(data);
        if (data == 1) {
          limit = $(".students .select-menu .sBtn-text").text();
          loadTable(limit, 1, role);
          $("#success-msg").html("Data updated").slideDown().delay(2000).slideUp();

          document.querySelector(".students .container .card-background4").style.display = "none";
        }
        else if (data == 0) {
          $("#error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
        }
      }
    })

  })
  function loadAttendanceTable(pageLimit, curPage, class_name) {
    $.ajax({
      url: "/php/faculty.php",
      type: "POST",
      dataType: "json",
      data: { action: "loadAttendanceTable", pageLimit: pageLimit, curPage: curPage, className: class_name },
      success: (data) => {
        console.log(data);
        if (data) {
          $.each(data, (key, value) => {
            $(".attendance > .data #table-data").empty();
            $(".attendance > .data #table-data").append(value.table);
            start = value.start;
            end = value.end;
            total = value.total;
            nop = value.nop;
            $(".attendance .pages #info").text(start + " - " + end + " of " + total);

            if (nop == 1) {
              $(".attendance .previous").css("color", "grey").css("pointer-events", "none");
              $(".attendance .left").css("color", "grey").css("pointer-events", "none");
              $(".attendance .next").css("color", "grey").css("pointer-events", "none");
              $(".attendance .right").css("color", "grey").css("pointer-events", "none");

            }
            else if (curPage == 1 && nop > 1) {
              $(".attendance .previous").css("color", "grey").css("pointer-events", "none");
              $(".attendance .left").css("color", "grey").css("pointer-events", "none");

              $(".attendance .next").css("color", "#111").css("pointer-events", "auto");
              $(".attendance .right").css("color", "#111").css("pointer-events", "auto");
            }
            else if ((curPage > 1 && curPage < nop) && (nop > 1)) {
              $(".attendance .previous").css("color", "#111").css("pointer-events", "auto");
              $(".attendance .left").css("color", "#111").css("pointer-events", "auto");
              $(".attendance .next").css("color", "#111").css("pointer-events", "auto");
              $(".attendance .right").css("color", "#111").css("pointer-events", "auto");
            }
            else if (curPage == nop && nop > 1) {
              $(".attendance .next").css("color", "grey").css("pointer-events", "none");
              $(".attendance .right").css("color", "grey").css("pointer-events", "none");
              $(".attendance .previous").css("color", "#111").css("pointer-events", "auto");
              $(".attendance .left").css("color", "#111").css("pointer-events", "auto");
            }
          });
        }

      }
    })
  }
  $(".attendance .header .select-menu .options .option").on("click", function () {
    $(".attendance .select-class").css("display", "none");
    $(".attendance .data").css("display", "block");
    class_name = $(".attendance .header .select-menu .sBtn-text").text();
    loadAttendanceTable(10, 1, class_name);
    console.log(class_name);
  })
  $(document).on("click", ".attendance #table-data tbody td:last-child", function () {
    $(".attendance .studentData").css("display", "block");
    var studentId = $(this).data('id');
    $.ajax({
      url: "/php/faculty.php",
      type: "POST",
      dataType: "json",
      data: { action: "loadStudentAttendanceTable", studentId: studentId },
      success: (data) => {
        console.log(data);
        if (data) {
          $.each(data, (key, value) => {
            $(".attendance > .studentData #table-data").empty();
            $(".attendance > .studentData #table-data").append(value.table);
            $(".attendance > .studentData .info #studentName").text(value.name);
            $(".attendance > .studentData .info #studentClass").text(value.class);
            $(".attendance > .studentData .info #studentRollno").text(value.rollno);
            console.log(value.name + "--" + value.class + "--" + value.rollno);
          });
        }

      }
    })
  })
  function loadTimetable(class_name) {
    console.log(class_name);
    $.ajax({
      url: "/php/faculty.php",
      type: "POST",
      data: { action: "loadTimetable", className: class_name },
      success: (data) => {
        // console.log(data);
        if (data) {
          $(".timetable .content > #table-data").html(data);
        }

      }
    })
  }
  manageBtn = $(".timetable .header .manageBtn");
  $(".timetable .header .select-menu .options .option").on("click", function () {
    $(".timetable .select-class").css("display", "none");
    $(".timetable .content").css("display", "block");
    manageBtn.css("display", "block");

    class_name = $(".timetable .header .select-menu .sBtn-text").text();

    loadTimetable(class_name);
  })
  addBtn = $(".timetable .header .addBtn");
  removeBtn = $(".timetable .header .removeBtn");
  modifyBtn = $(".timetable .header .modifyBtn");

  isManageBtnClicked = false;
  manageBtn.on("click", function () {
    isManageBtnClicked = !isManageBtnClicked;

    if (isManageBtnClicked) {
      $(this).css("background", "#e9972c");
      $(this).css("color", "#fff");
      modifyBtn.css("display", "block")
      removeBtn.css("display", "block")
      addBtn.css("display", "block")
    } else {
      $(this).css("background", "#fff");
      $(this).css("color", "#e9972c");
      isAddBtnClicked = false;
      isRemoveBtnClicked = false;
      isModifyBtnClicked = false;
      modifyBtn.css("color", "#e9972c").css("display", "none")
      removeBtn.css("color", "#ef476f").css("display", "none")
      addBtn.css("color", "#239dc5").css("display", "none")
      $(".timetable .header button").css("background", "#fff");
    }
  })
  isAddBtnClicked = false;
  addBtn.on("click", function () {
    $(".timetable .card-background").css("display", "block");
  })
  isModifyBtnClicked = false;
  modifyBtn.on("click", function () {
    isModifyBtnClicked = !isModifyBtnClicked;
    if (isModifyBtnClicked) {
      $(this).css("background", "#e9972c")
      $(this).css("color", "#fff")
    } else {
      $(this).css("background", "#fff")
      $(this).css("color", "#e9972c")
    }
  })

  isRemoveBtnClicked = false;
  removeBtn.on("click", function () {
    isRemoveBtnClicked = !isRemoveBtnClicked;
    if (isRemoveBtnClicked) {
      $(this).css("background", "#ef476f")
      $(this).css("color", "#fff")
    } else {
      $(this).css("background", "#fff")
      $(this).css("color", "#ef476f")
    }
  })
  $(".timetable .card-background .closeBtn").on("click", () => {
    $(".timetable .card-background").css("display", "none")
    isAddBtnClicked = false;
  })

  $(".timetable #from_time").change(function () {
    if ($(this).val() < "07:00") {
      alert("Value must be 07:00 or later.")
    }
    else if ($(this).val() > "12:10") {
      alert("Value must be 12:10 or earlier.")
    }
    else {
      if ($(".timetable #subject").val() != "break") {
        var raw = $(this).val();
        var from = new Date(2023, 00, 01, raw.substring(0, 2), raw.substring(3, 6));
        var to = new Date(from.getTime() + 50 * 60000);
        $(".timetable #to_time").val(to.toLocaleTimeString('it-IT').substring(0, 5));
      }
      else if ($(".timetable #subject").val() == "break") {
        var raw = $(this).val();
        var from = new Date(2023, 00, 01, raw.substring(0, 2), raw.substring(3, 6));
        var to = new Date(from.getTime() + 15 * 60000);
        $(".timetable #to_time").val(to.toLocaleTimeString('it-IT').substring(0, 5));
      }
    }

  });
  $(".timetable #subject").on("click", function () {
    $(".timetable #from_time").val("")
    $(".timetable #to_time").val("")
  })
  $(".timetable .add-lecture .card .addBtn").on("click", function () {
    from = $(".timetable .add-lecture #from_time").val();
    to = $(".timetable .add-lecture #to_time").val();;
    subject = $(".timetable .add-lecture #subject").val();
    faculty = $(".timetable .add-lecture #faculty").val();
    day = $(".timetable .add-lecture #day").val();
    class_name = $(".timetable .header .select-menu .sBtn-text").text();
    console.log(from, to, subject, faculty, day);
    if (from != "" && to != "" && subject != null && faculty != null && day != null) {
      $.ajax({
        url: "/php/faculty.php",
        type: "POST",
        dataType: "JSON",
        data: { action: "scheduleLecture", className: class_name, day: day, subject: subject, faculty: faculty, from: from, to: to },
        success: function (data) {
          console.log(data);
          if (data == 1) {
            $(".timetable #success-msg").html("Lecture scheduled").slideDown().delay(2000).slideUp();
            $(".timetable .add-lecture #from_time").val("");
            $(".timetable .add-lecture #to_time").val("");
            $(".timetable .add-lecture #subject").val("");
            $(".timetable .add-lecture #faculty").val("");
            $(".timetable .add-lecture #day").val("");
            class_name = $(".timetable .header .select-menu .sBtn-text").text();
            loadTimetable(class_name);
          }
          else {
            $(".timetable #error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
            $(".timetable .add-lecture #from_time").val("");
            $(".timetable .add-lecture #to_time").val("");
            $(".timetable .add-lecture #subject").val("");
            $(".timetable .add-lecture #faculty").val("");
            $(".timetable .add-lecture #day").val("");
          }
        }
      })
    }
    else {
      alert("all fields required")
    }

  })
  $(document).on("click", ".timetable > .content #table-data tbody tr td div", function () {
    lectureId = $(this).data('id');
    if (isModifyBtnClicked) {
      $.ajax({
        url: "/php/faculty.php",
        type: "POST",
        dataType: "json",
        data: { action: "lectureDetails", lectureId: lectureId },
        success: (data) => {
          console.log(data);
          if (data) {
            $.each(data, (key, value) => {
              $(".timetable > .content .modify-lecture #day").val(value.day);
              $(".timetable > .content .modify-lecture #from_time").val(value.from_time);
              $(".timetable > .content .modify-lecture #to_time").val(value.to_time);
              $(".timetable > .content .modify-lecture #subject").val(value.subject);
              $(".timetable > .content .modify-lecture #faculty").val(value.faculty);
              $(".timetable > .content .modify-lecture #id").val(value.id);
            });
          }
          $(".timetable > .content .modify-lecture").css("display", "block");
        }
      })
    }
    else if (isRemoveBtnClicked) {
      $(".timetable > .content .remove-lecture #id").text(lectureId);
      $(".timetable > .content .remove-lecture").css("display", "block");
    }
    else {
      $.ajax({
        url: "/php/faculty.php",
        type: "POST",
        dataType: "json",
        data: { action: "lectureDetails", lectureId: lectureId },
        success: (data) => {
          // console.log(data);
          if (data) {
            $.each(data, (key, value) => {
              $(".timetable > .content .lecture-details #id").text(lectureId);
              $(".timetable > .content .lecture-details #day").text(value.day);
              $(".timetable > .content .lecture-details #from_time").text(value.from_time);
              $(".timetable > .content .lecture-details #to_time").text(value.to_time);
              $(".timetable > .content .lecture-details #subject").text(value.subject);
              $(".timetable > .content .lecture-details #faculty").text(value.faculty);
            });
          }
          $(".timetable > .content .lecture-details").css("display", "block");
        }
      })
    }
  })
  $(".timetable > .content .lecture-details i").on("click", function () {
    $(".timetable > .content .lecture-details").css("display", "none");
  })
  $(".timetable > .content .modify-lecture .closeBtn").on("click", function () {
    $(".timetable > .content .modify-lecture").css("display", "none");
  })
  $(".timetable > .content .modify-lecture .closeBtn").on("click", function () {
    $(".timetable > .content .modify-lecture").css("display", "none");
  })
  $(".timetable > .content .remove-lecture .cancelBtn").on("click", function () {
    $(".timetable > .content .remove-lecture").css("display", "none");
  })

  $(".timetable > .content .modify-lecture .saveBtn").on("click", () => {
    class_name = $(".timetable .header .select-menu .sBtn-text").text();
    id = $(".timetable > .content .modify-lecture #id").val();
    day = $(".timetable > .content .modify-lecture #day").val();
    from = $(".timetable > .content .modify-lecture #from_time").val();
    to = $(".timetable > .content .modify-lecture #to_time").val();
    subject = $(".timetable > .content .modify-lecture #subject").val();
    faculty = $(".timetable > .content .modify-lecture #faculty").val();
    if (from != "" && to != "" && subject != null && faculty != null && day != null) {
      $.ajax({
        url: "/php/faculty.php",
        type: "POST",
        data: { action: "modifyLecture", id: id, className: class_name, day: day, subject: subject, faculty: faculty, from: from, to: to },
        success: function (data) {
          console.log(data);
          if (data == 1) {
            $(".timetable #success-msg").html("Data saved").slideDown().delay(2000).slideUp();
            loadTimetable(class_name);

            $(".timetable > .content .modify-lecture").css("display", "none");
          }
          else {
            $(".timetable #error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
          }
        }
      })
    }
    else {
      alert("all fields required")
    }
  })
  $(".timetable > .content .remove-lecture #removeBtn").on("click", function () {
    class_name = $(".timetable .header .select-menu .sBtn-text").text();
    $(this).data('id');
    $.ajax({
      url: "/php/faculty.php",
      type: "POST",
      dataType: "json",
      data: { action: "removeLecture", lectureId: lectureId },
      success: (data) => {
        console.log(data);
        if (data == 1) {
          $(".timetable #success-msg").html("Record removed").slideDown().delay(2000).slideUp();
          loadTimetable(class_name);
          $(".timetable > .content .remove-lecture").css("display", "none");
        }
        else {
          $("#error-msg").html("Error occured!!!").slideDown().delay(2000).slideUp();
        }
      }
    })
  })
  $(document).on("click", ".timetable .lecture-details button.takeAttendanceBtn", function () {
    $(".timetable .takeAttendance").css("display", "block");
    $(".timetable > .content .lecture-details").css("display", "none");
    lectureId = $(".timetable > .content .lecture-details #id").text();

    faculty = $(".timetable > .content .lecture-details #faculty").text();
    subject = $(".timetable > .content .lecture-details #subject").text();
    from = $(".timetable > .content .lecture-details #from_time").text();
    to = $(".timetable > .content .lecture-details #to_time").text();
    time = from + "-" + to;
    class_name = $(".timetable .header .select-menu .sBtn-text").text();

    $(".timetable .takeAttendance .header #class").text(class_name);
    $(".timetable .takeAttendance .header #time").text(time);
    $(".timetable .takeAttendance .header #faculty").text(faculty);
    $(".timetable .takeAttendance .header #subject").text(subject);

    $.ajax({
      url: "/php/faculty.php",
      type: "POST",
      dataType: "json",
      data: { action: "loadSubmissionAttendanceTable", className: class_name, facutlyName: faculty, subjectName: subject },
      success: (data) => {
        console.log(data);
        if (data) {
          $.each(data, (key, value) => {
            $(".timetable .takeAttendance #table-classdata").html(value.table);
            $(".timetable .takeAttendance .header #subject_code").text(value.subjectCode);
            $(".timetable .takeAttendance .header #faculty_id").text(value.facutlyID);
          });
        }

      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
      }

    })

  })
  $(document).on("click", ".timetable .takeAttendance .header .close-card", function () {
    $(".timetable .takeAttendance").css("display", "none");
  })

  $(document).on("click", ".timetable .takeAttendance .data table tbody td .remark", function () {
    remark = $(this).text()
    if (remark == "A") {
      $(this).text("P");
      $(this).css("background-color", "#25df6f")
    }
    else if (remark == "P") {
      $(this).text("A");
      $(this).css("background-color", "#e71f4d");
    }
  })
  $(document).on("click", ".timetable .takeAttendance .data #submitAttendanceBtn", function () {
    if ($(".timetable .takeAttendance .data #confirmAttendance").is(":checked")) {
      faculty_id = $(".timetable .takeAttendance .header #faculty_id").text();
      subject_code = $(".timetable .takeAttendance .header #subject_code").text();
      class_name = $(".timetable .header .select-menu .sBtn-text").text();

      var attendance_data = [];
      $(".timetable .takeAttendance #table-classdata tr").each(function () {
        var rowDataArray = [];
        var actualData = $(this).find('td');
        if (actualData.length > 0) {
          actualData.each(function () {
            rowDataArray.push($(this).text());
          });
          attendance_data.push(rowDataArray);
        }
      });
      $.ajax({
        url: "/php/faculty.php",
        type: "POST",
        data: { action: "submitAttendance", className: class_name, facutlyId: faculty_id, subjectCode: subject_code, attendanceData: attendance_data },
        success: (data) => {
          console.log(data);
          if (data > 0) {
            $(".timetable #success-msg").html("Attendance submitted.").slideDown().delay(2000).slideUp();
            $(".timetable .takeAttendance").css("display", "none");
          }
          else {
            $(".timetable #error-msg").html("Error occured, try again.").slideDown().delay(2000).slideUp();
          }

        },
        error: function (xhr, status, error) {
          var errorMessage = xhr.status + ': ' + xhr.statusText
          alert('Error - ' + errorMessage);
        }

      })
    }
    else {
      $(".timetable #error-msg").html("please confirm attendance!!").slideDown().delay(2000).slideUp();
    }

  })
  // confirmAttendance
  // submitAttendanceBtn
})