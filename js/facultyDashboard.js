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

const optionMenus = document.querySelectorAll(".select-menu");

optionMenus.forEach((optionMenu) => {

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
      document.querySelector(".timetable .select-menu").style.width = "fit-content";
      let selectedOption = option.querySelector(".option-text").innerText;
      sBtn_text.innerText = selectedOption;
      option.classList.add("selected");
      optionMenu.classList.remove("active2");
    });
  });
})



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
const Class = cardBackground.querySelector(".card #class");
const div = cardBackground.querySelector(".card #div");
const rollno = cardBackground.querySelector(".card #rollno");


nameFields.forEach((nameField) => {
  // console.log(nameField.parentElement.children[0].innerHTML);


  nameField.addEventListener("click", () => {
    cardBackground.style.display = "block";
    name.innerText = nameField.innerHTML;
    id.innerHTML = nameField.parentElement.children[0].innerHTML;
    dob.innerHTML = nameField.parentElement.children[2].innerHTML;
    Class.innerHTML = nameField.parentElement.children[3].innerHTML;
    div.innerHTML = nameField.parentElement.children[4].innerHTML;
    rollno.innerHTML = nameField.parentElement.children[5].innerHTML;
  });
});
// idFields.forEach((id) => {
//     console.log(id.innerHTML);
// })
closeCard.addEventListener("click", () => {
  name.innerHTML = "";
  id.innerHTML = "";
  dob.innerHTML = "";
  Class.innerHTML = "";
  div.innerHTML = "";
  rollno.innerHTML = "";
  cardBackground.style.display = "none";
});

const editBtns = document.querySelectorAll(".container table tr .editBtn"),
  cardBackground2 = document.querySelector(".container .card-background2");

editBtns.forEach((editBtn) => {
  editBtn.addEventListener("click", () => {
    cardBackground2.style.display = "block";
  })
});

const closeCard2 = document.querySelector(".card-background2 form .card .closeBtn");

closeCard2.addEventListener("click", () => {
  cardBackground2.style.display = "none";
});

const cardBackground3 = document.querySelector(".container .card-background3"),
  removeBtns = document.querySelectorAll(".container .data table tr .removeBtn"),
  cancelBtn = document.querySelector(".container .card-background3 .card .cancelBtn");

removeBtns.forEach((removeBtn) => {
  removeBtn.addEventListener("click", () => {
    cardBackground3.style.display = "block";
  })
});
cancelBtn.addEventListener("click", () => {
  cardBackground3.style.display = "none";
})
const addBtn = document.querySelector(".container .header .addBtn");
addBtn.addEventListener("click", () => {
  document.querySelector(".container .card-background2 .card .saveBtn").innerText = "Add";
  document.querySelector(".container .card-background2 .card .saveBtn").style.padding = "1px 15px";
  cardBackground2.style.display = "block";
})
var role = "faculty";

if (role == "hod") {
  document.querySelector(".students .container .header .addBtn").style.display = "block";
  document.querySelector(".students .container .header").style.justifyContent = "space-between";
  // document.querySelector(".students .container .header div").style.margin =  "50px";
  document.querySelectorAll(".students .container .data table tr td:last-child").forEach((td) => {
    td.style.display = "block";
  })
  document.querySelector(".students .container .data table thead th:last-child").style.display = "table-cell";
}

document.querySelector(".timetable .select-menu").style.width = $(".timetable .options").outerWidth() + "px";
document.querySelector(".timetable .select-menu").style.minWidth = $(".timetable .options").outerWidth() + "px";



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
  console.log("YEsss");
}
else {

  const dayBtns = document.querySelectorAll(".timetable .content button");

  dayBtns.forEach((btn) => {
    btn.classList.remove("selected");
  })

}
const tableCells = document.querySelectorAll(".timetable .content table tbody tr td .empty");

document.querySelector(".timetable .header .addBtn").addEventListener("click", ()=>{
  tableCells.forEach((addBtn) =>{
      addBtn.style.display="flex";
  })
})