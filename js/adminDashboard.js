var li_elements = document.querySelectorAll(".sidebar ul li");

var item_elements = document.querySelectorAll(".item");

item_elements.forEach(function (item) {
  if (item.classList[1] != "home") item.style.display = "none";
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
    } else if (li_value == "faculty") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "students") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "academics") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "records") {
      document.querySelector("." + li_value).style.display = "block";
    } else {
      console.log("");
    }
  });
}

const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active2")
);

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

const cardBackground = document.querySelector(".container .card-background"),
  nameFields = document.querySelectorAll(".data table td:nth-child(2)"),
  idFields = document.querySelectorAll(".data table td:nth-child(1)"),
  closeCard = document.querySelector(".card .close-card");

const name = cardBackground.querySelector(".card #name");
const id = cardBackground.querySelector(".card #id");
const dob = cardBackground.querySelector(".card #dob");
const email = cardBackground.querySelector(".card #email");
const contact = cardBackground.querySelector(".card #contact");
const address = cardBackground.querySelector(".card #address");
const department = cardBackground.querySelector(".card #department");
const designation = cardBackground.querySelector(".card #designation");


nameFields.forEach((nameField) => {

  nameField.addEventListener("click", () => {
    cardBackground.style.display = "block";
    name.innerText = nameField.innerHTML;
    id.innerHTML = nameField.parentElement.children[0].innerHTML;
    dob.innerHTML = nameField.parentElement.children[2].innerHTML;
    department.innerHTML = nameField.parentElement.children[3].innerHTML;
    designation.innerHTML = nameField.parentElement.children[4].innerHTML;
  });
});
// idFields.forEach((id) => {
//     console.log(id.innerHTML);
// })
closeCard.addEventListener("click", () => {
  name.innerHTML = "";
  id.innerHTML = "";
  dob.innerHTML = "";
  department.innerHTML = "";
  designation.innerHTML = "";
  cardBackground.style.display = "none";
});

const editBtns = document.querySelectorAll(".container table tr .editBtn"),
  cardBackground2 = document.querySelector(".container .card-background2");

const addBtn = document.querySelector(".container .header .addBtn");
addBtn.addEventListener("click", () => {

  cardBackground2.style.display = "block";
})


const toggleBtn = document.querySelector(".toggle-sidebar");
const sidebar = document.querySelector(".sidebar");
window.onload = () => {
  if (window.matchMedia('(max-width:768px)').matches) {

    sidebar.style.visibility = "hidden";
    toggleBtn.style.left = "0";
    document.querySelector(".main").style.cssText = `
    width: 100%;
    left: 0;
    `;
    document.querySelector(".toggle-sidebar > i").style.transform = "rotate(0deg)";
    document.querySelector(".toggle-sidebar > i").style.translate = "0 0";

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

      }
      else {
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

// if (window.matchMedia('(max-width:768px)').matches) {
// sidebar.style.visibility = "hidden";
// toggleBtn.style.left = "0";
// document.querySelector(".main").style.cssText = `
// width: 100%;
// left: 0;
// `;
// document.querySelector(".toggle-sidebar > i").style.transform = "rotate(0deg)";
// document.querySelector(".toggle-sidebar > i").style.translate = "0 0";

// }
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

$(document).on("click", ".container .card-background3 .card .cancelBtn", function () {
  document.querySelector(".container .card-background3").style.display = "none";
  document.querySelector(".container").style.overflow = "auto";
})


$(document).on("click", ".card-background4 .card .closeBtn", function () {
  document.querySelector(".container .card-background4").style.display = "none";
  document.querySelector(".container").style.overflow = "auto";
})

$(document).on("click", ".card-background2 .card .closeBtn", function () {
  document.querySelector(".container .card-background2").style.display = "none";
  document.querySelector(".container").style.overflow = "auto";
})







$(document).ready(function () {
  $(".card-background2 .addBtn").on("click", (btn) => {

    btn.preventDefault();
    var name = $(".card-background2 #name");
    var dob = $(".card-background2 #dob");
    var email = $(".card-background2 #email");
    var contact = $(".card-background2 #contact");
    var address = $(".card-background2 #address");
    var department = $(".card-background2 #department");
    var designation = $(".card-background2 #designation");

    if (name.val() == "" || dob.val() == "" || email.val() == "" || contact.val() == "" || address.val() == "" || department.val() == "" || designation.val() == "") {
      $("#error-msg").html("All field are required").slideDown().delay(2000).slideUp();
    }
    else {
      $.ajax({
        url: "/php/admin.php",
        type: "POST",
        data: {
          action: "addFaculty",
          name: name.val(),
          dob: dob.val(),
          email: email.val(),
          contact: contact.val(),
          address: address.val(),
          department: department.val(),
          designation: designation.val(),
        },
        success: function (data) {
          console.log(data);
          if (data == 1) {
            name.val("");
            dob.val("");
            email.val("");
            contact.val("");
            address.val("");
            department.val("");
            designation.val("");
            $("#success-msg").html("Faculty Added").slideDown().delay(2000).slideUp();
            loadData();
          }
          else if (data == 0) {
            name.val("");
            dob.val("");
            email.val("");
            contact.val("");
            address.val("");
            department.val("");
            designation.val("");
            $("#error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
          }
        }
      })
    }
  })
  function loadData() {
    $.ajax({
      url: "/php/admin.php",
      type: "POST",
      data: { action: "loadData" },
      success: function (data) {
        $("#table-data").empty()
        $("#table-data").append(data);

      }
    })
  }

  $("#facultyBtn").on("click", (btn) => {
    ;
    loadData()
  })

  $(document).on("click", ".container .data table tr .removeBtn", function () {

    document.querySelector(".container .card-background3").style.display = "block";
    document.querySelector(".container").style.overflow = "hidden";

    var element = this;
    var facultyId = $(this).data('id');

    $(document).on("click", ".card-background3 .removeBtn", function () {
      $.ajax({
        url: "/php/admin.php",
        type: "POST",
        data: { action: "removeFaculty", facultyId: facultyId },
        success: function (data) {
          if (data == 1) {
            document.querySelector(".container .card-background3").style.display = "none";
            $("#success-msg").html("Record removed").slideDown().delay(2000).slideUp();
            $(element).closest("tr").fadeOut();
          }
          else if (data == 0) {
            $("#error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
          }
        }
      })
    })
  })

  $(document).on("click", ".container .data table tr .editBtn", function () {
    var element = this;
    var facultyId = $(this).data('id');

    $.ajax({
      url: "/php/admin.php",
      type: "POST",
      dataType: "JSON",
      data: { action: "facultyData", id: facultyId },
      success: function (data) {
        // console.log(data);
        if (data) {
          $.each(data, (key, value) => {
            $(".card-background4 #id").val(value.id);
            $(".card-background4 #name").val(value.name);
            $(".card-background4 #dob").val(value.dob);
            $(".card-background4 #email").val(value.email);
            $(".card-background4 #contact").val(value.contact);
            $(".card-background4 #address").val(value.address);
            $(".card-background4 #department").val(value.department);
            $(".card-background4 #designation").val(value.designation);

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
    var dob = $(".card-background4 #dob");
    var email = $(".card-background4 #email");
    var contact = $(".card-background4 #contact");
    var address = $(".card-background4 #address");
    var department = $(".card-background4 #department");
    var designation = $(".card-background4 #designation");
    console.log(id.val());
    if (
      id.val() == "" || name.val() == "" || dob.val() == "" ||
      email.val() == "" || contact.val() == "" ||
      address.val() == "" || department.val() == "" || designation.val() == ""
      ){
      $("#error-msg").html("All field are required").slideDown().delay(2000).slideUp();
    }
    else {
      $.ajax({
        url: "/php/admin.php",
        type: "POST",
        data: {
          action: "updateFaculty",
          id: id.val(),
          name: name.val(),
          dob: dob.val(),
          email: email.val(),
          contact: contact.val(),
          address: address.val(),
          department: department.val(),
          designation: designation.val(),
        },
        success: function (data) {
          console.log(data);
          if (data == 1) {
            $("#success-msg").html("Faculty Added").slideDown().delay(2000).slideUp();
            loadData();
            document.querySelector(".container .card-background4").style.display = "none";
          }
          else if (data == 0) {
            $("#error-msg").html("Error occured !!!").slideDown().delay(2000).slideUp();
          }
        }
      })
    }
  })
});

