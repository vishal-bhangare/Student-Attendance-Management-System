const studentBtn = document.querySelector(".student");
const facultyBtn = document.querySelector(".faculty");
const moveBtn = document.querySelector(".moveBtn");
const studentForm = document.querySelector("#studentForm");
const facultyForm = document.querySelector("#facultyForm");

facultyBtn.addEventListener("click", ()=>{
    moveBtn.classList.add("right");
    facultyForm.classList.add("facultyForm");
    studentForm.classList.remove("studentForm");
    moveBtn.innerHTML = "Faculty";
})
studentBtn.addEventListener("click", ()=>{
    moveBtn.classList.remove("right");
    facultyForm.classList.remove("facultyForm");
    studentForm.classList.add("studentForm");
    moveBtn.innerHTML = "Student";
})

document.querySelector("#studentForm #submitBtn").addEventListener("click",()=>{
    window.open("http://127.0.0.1:8080/php/index","_self")
})