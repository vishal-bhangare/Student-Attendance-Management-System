var li_elements = document.querySelectorAll(".sidebar ul li");

var item_elements = document.querySelectorAll(".item");

item_elements.forEach(function (item) {
    if(item.classList[1] != "home")
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
        }
        else if (li_value == "faculty") {
            document.querySelector("." + li_value).style.display = "block";
        }
        else if (li_value == "students") {
            document.querySelector("." + li_value).style.display = "block";
        }
        else if (li_value == "academics") {
            document.querySelector("." + li_value).style.display = "block";
        }
        else if (li_value == "records") {
            document.querySelector("." + li_value).style.display = "block";
        }
        else {
            console.log("");
        }
    });
}


const optionMenu = document.querySelector(".select-menu"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active2"));

options.forEach(option => {
    option.addEventListener("click", () => {
        options.forEach(option => {
            option.classList.remove("selected");
        });
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        option.classList.add("selected");
        optionMenu.classList.remove("active2");
    });
});
