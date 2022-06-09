const toggle = document.querySelector(".toggle");
const icon = document.querySelector("div img");
const body = document.querySelector("body");
const universecityAll = document.querySelector(".img1");
const inputs = document.querySelectorAll("input");
const mybutton = document.querySelector("button");
const myform = document.querySelector(".form");
const heading = document.querySelector(".heading");



toggle.addEventListener("click", (e) => {
    toggle.classList.toggle("active");
    body.classList.toggle("active");
    if (body.classList.contains("active")) {
        icon.src = "../img/white.png";
        icon.style.boxShadow = "none";
        universecityAll.src = "../img/universityInverse.png";
        universecityAll.style.boxShadow = "none";


        for (e of inputs) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(27, 29, 30)";
            e.style.color = "white";
        }

        heading.style.color = "rgb(27, 29, 30)";
        mybutton.style.backgroundColor = "rgb(27, 29, 30)";
        mybutton.style.color = "5ab6c9";
        myform.style.backgroundColor = "#5ab6c9";



    } else {
        //!Resetting beggins 
        icon.src = "../img/dark.png";
        universecityAll.src = "../img/Universecity.png";




        for (e of inputs) {
            e.classList.toggle("active");
            e.style.backgroundColor = "";
            e.style.color = "";
        }


        heading.style.color = "";
        mybutton.style.backgroundColor = "";
        mybutton.style.color = "";
        myform.style.backgroundColor = "";
    }
});