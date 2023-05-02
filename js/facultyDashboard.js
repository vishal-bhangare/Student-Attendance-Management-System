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

  var temp = document.querySelector("." + optionMenu.parentElement.parentElement.classList[1] + " .sBtn-text");
  if (temp != null) {
    temp.style.width = max + 4 + "px";
  }
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
    });
  });
})



const closeCardBtns = document.querySelectorAll(".card .close-card");

closeCardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".card-background").forEach((card) => {
      card.style.display = "none";
      console.log(card);
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
const tableCells = document.querySelectorAll(".timetable .content table tbody tr td .unscheduled");

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


const attendanceStatusBtns = document.querySelectorAll(".timetable > .takeAttendance table tbody .status");

attendanceStatusBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const status = btn.innerText;
    if (status == "A") {
      btn.innerText = "P";
      btn.style.cssText = `
      background-color: #11d84d;
      `;
    } else {
      btn.innerText = "P";
      btn.style.cssText = `
      background-color: #e71f4d;
    `;
    }
  })
})

document.querySelector(".timetable > .content .card .takeAttendanceBtn").addEventListener("click", () => {
  document.querySelector(".timetable > .takeAttendance").style.display = "block";
})
document.querySelector(".timetable > .takeAttendance .close-card ").addEventListener("click", () => {
  document.querySelector(".timetable > .takeAttendance").style.display = "none";
})

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
  $(".students .data .options .option").on("click", function () {
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

    $(document).on("click", ".students .card-background3 .removeBtn", function () {
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
})