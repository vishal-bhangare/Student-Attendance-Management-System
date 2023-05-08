const studentBtn = document.querySelector(".student");
const facultyBtn = document.querySelector(".faculty");
const moveBtn = document.querySelector(".moveBtn");
const studentForm = document.querySelector("#studentForm");
const facultyForm = document.querySelector("#facultyForm");

facultyBtn.addEventListener("click", () => {
  moveBtn.classList.add("right");
  document.querySelector("#facultyForm").classList.add("facultyForm");
  document.querySelector("#studentForm").classList.remove("studentForm");
  moveBtn.innerHTML = "Faculty";
})
studentBtn.addEventListener("click", () => {
  moveBtn.classList.remove("right");
  document.querySelector("#facultyForm").classList.remove("facultyForm");
  document.querySelector("#studentForm").classList.add("studentForm");
  moveBtn.innerHTML = "Student";
})
$(document).ready(function () {
  $("#facultyForm #loginBtn").on("click", (btn) => {
    btn.preventDefault();
    var user = $("#facultyForm #username");
    var pass = $("#facultyForm #password");

    $.ajax({
      url: "/php/studentFacultyLogin.php",
      type: "POST",
      data: { action: "facultyLogin", username: user.val(), password: pass.val() },
      success: function (data) {
        console.log(data);
        if (data) {
          var data = JSON.parse(data);
          if (data[0].status == 1) {
            window.location.href = '/facultyDashboard.html';
            sessionStorage.setItem("email", user.val());
            sessionStorage.setItem("username", data[0].name);
            sessionStorage.setItem("role", data[0].role);
            sessionStorage.setItem("status", "user-logged-in")
            user.val("");
            pass.val("");
          }
          else if (data[0].status == 0) {
            user.val("");
            pass.val("");
            alert("Invalid username or password");
          }
        }
        else{
          alert("Error occured!");
        }
      }
    })
  })
  $("#studentForm #loginBtn").on("click", (btn) => {
    btn.preventDefault();
    var user = $("#studentForm #studentUsername");
    var pass = $("#studentForm #studentPassword");
    console.log( user.val(),pass.val());
    $.ajax({
      url: "/php/studentFacultyLogin.php",
      type: "POST",
      data: { action: "studentLogin", username: user.val(), password: pass.val() },
      success: function (data) {
        console.log(data);
        if (data) {
          var data = JSON.parse(data);
          if (data[0].status == 1) {
            window.location.href = '/studentDashboard.html';
            sessionStorage.setItem("email", user.val());
            sessionStorage.setItem("username", data[0].name);
            sessionStorage.setItem("userid", data[0].id)
            sessionStorage.setItem("class", data[0].class)
            user.val("");
            pass.val("");
          }
          else if (data[0].status == 0) {
            user.val("");
            pass.val("");
            alert("Invalid username or password");
          }
        }
        else{
          alert("Error occured!");
        }
      }
    })
  })
});