const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const aside = document.querySelector("aside");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const main = document.querySelector("main");
let asideElem = document.querySelectorAll("aside ul li a.nav-link")
const searchBar = document.querySelector(".search-bar");
let icon = document.querySelector(".indicator");
let h1 = document.querySelector("h1");
let iframes = document.querySelectorAll('iframe');



toggle.addEventListener("click", (e) => {
    toggle.classList.toggle("active");
    body.classList.toggle("active");
    aside.classList.toggle("active");
    main.classList.toggle("active");
    footer.classList.toggle("active");
    header.classList.toggle("active");
    searchBar.classList.toggle("active");
    icon.classList.toggle("active");
    h1.classList.toggle("active");





    if (body.classList.contains("active")) {
        icon.src = "../img/white.png";
        icon.style.boxShadow = "none";
        h1.style.color = "#5ab6c9";
        for (e of asideElem) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(47, 46, 46)";
            e.style.color = "#5ab6c9";
        }

        for (e of iframes) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(47, 46, 46)";
            e.style.color = "#5ab6c9";
        }
    } else {
        h1.style.color = "#366c77";
        icon.src = "../img/dark.png";
        for (e of asideElem) {
            e.classList.toggle("active");
            e.style.backgroundColor = "transparent";
            e.style.color = "#366c77";
        }

        for (e of iframes) {
            e.classList.toggle("active");
            e.style.backgroundColor = "#fff";
            e.style.color = "#366c77";
        }
    }






});