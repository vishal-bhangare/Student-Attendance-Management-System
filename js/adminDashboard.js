var li_elements = document.querySelectorAll(".sidebar ul li");

var item_elements = document.querySelectorAll(".item");

item_elements.forEach(function (item) {
  if (item.classList[1] != "faculty") item.style.display = "none";
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
  console.log(nameField.parentElement.children[0].innerHTML);
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
  removeBtn.addEventListener("click", () =>{
    cardBackground3.style.display = "block";
  })
});
cancelBtn.addEventListener("click", () =>{
  cardBackground3.style.display = "none";
})
const addBtn = document.querySelector(".container .header .addBtn");
addBtn.addEventListener("click", () => {
  document.querySelector(".container .card-background2 .card .saveBtn").innerText = "Add";
  document.querySelector(".container .card-background2 .card .saveBtn").style.padding = "1px 15px";
  cardBackground2.style.display = "block";
})