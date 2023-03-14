
var li_elements = document.querySelectorAll(".sidebar ul li");

var item_elements = document.querySelectorAll(".item");

item_elements.forEach(function (item) {
  if (item.classList[1] != "attendance")
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



const cardBackground = document.querySelector(".container .card-background"),
  nameFields = document.querySelectorAll(".container .data table td:nth-child(2)"),
  idFields = document.querySelectorAll(".data table td:nth-child(1)"),
  closeCardBtns = document.querySelectorAll(".card .close-card");

// const name = cardBackground.querySelector(".card #name");
// const id = cardBackground.querySelector(".card #id");
// const dob = cardBackground.querySelector(".card #dob");
// const email = cardBackground.querySelector(".card #email");
// const contact = cardBackground.querySelector(".card #contact");
// const address = cardBackground.querySelector(".card #address");
// const Class = cardBackground.querySelector(".card #class");
// const div = cardBackground.querySelector(".card #div");
// const rollno = cardBackground.querySelector(".card #rollno");


nameFields.forEach((nameField) => {
  nameField.addEventListener("click", () => {
    cardBackground.style.display = "block";
    // name.innerText = nameField.innerHTML;
    // id.innerHTML = nameField.parentElement.children[0].innerHTML;
    // dob.innerHTML = nameField.parentElement.children[2].innerHTML;
    // Class.innerHTML = nameField.parentElement.children[3].innerHTML;
    // div.innerHTML = nameField.parentElement.children[4].innerHTML;
    // rollno.innerHTML = nameField.parentElement.children[5].innerHTML;
  });
});
// idFields.forEach((id) => {
//     console.log(id.innerHTML);
// })

const attendanceNameFields = document.querySelectorAll(".attendance .data table td:nth-child(2)");

attendanceNameFields.forEach((nameField) => {
  nameField.addEventListener("click", () => {
    document.querySelector(".attendance .data .card-background").style.display = "block";
  });
});

closeCardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".card-background").forEach((card) => {
      card.style.display = "none";
      console.log(card);
    })

  })
})

const editBtns = document.querySelectorAll(".container table tr .editBtn"),
  cardBackground2 = document.querySelector(".container .card-background2");

editBtns.forEach((editBtn) => {
  editBtn.addEventListener("click", () => {
    cardBackground2.style.display = "block";
  })
});

const closeCard2 = document.querySelector(".card-background2 form .card .closeBtn");



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
  else{
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
    //   document.querySelector(".attendance > .studentData").style.display = "block";
    })
  })
