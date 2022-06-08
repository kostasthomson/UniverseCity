const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const aside = document.querySelector("aside");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const main = document.querySelector("main");
const asideElem = document.querySelectorAll("aside ul li a.nav-link")
const searchBar = document.querySelector(".search-bar");
const icon = document.querySelector(".indicator");
const h1 = document.querySelector("h1");
const myframe = document.querySelector('iframe');
let otherPage;
let otherBody;
let hElemennts;
let labelElements;
let pEelements;







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

    if (aside.classList.contains("active")) {
        icon.src = "../img/white.png";
        icon.style.boxShadow = "none";
        h1.style.color = "#5ab6c9";

        for (e of asideElem) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(47, 46, 46)";
            e.style.color = "#5ab6c9";
        }

        myframe.classList.toggle("active");
        myframe.style.color = "#5ab6c9";

        otherPage = myframe.contentWindow;

        otherBody = otherPage.document.querySelector("body");
        card = otherPage.document.querySelector(".card");
        hElemennts = otherPage.document.querySelectorAll(".card-title");
        labelElements = otherPage.document.querySelectorAll("label");
        pEelements = otherPage.document.querySelectorAll("p");



        if (hones = otherPage.document.querySelectorAll("h1")) {
            for (elems of hones) {
                elems.style.color = "#5ab6c9";
            }
        }
        if (table = otherPage.document.querySelectorAll("table")) {

            for (elems of table) {
                elems.style.color = "#5ab6c9";
            }
        }

        if (legend = otherPage.document.querySelectorAll("legend")) {
            for (elems of legend) {
                elems.style.color = "#5ab6c9";
            }
        }

        if (myUl = otherPage.document.querySelectorAll("ul .list-group")) {
            for (elems of myUl) {
                elems.style.color = "#5ab6c9";
            }
        }

        if (myli = otherPage.document.querySelectorAll(".darkmode")) {
            for (elems of myli) {
                elems.style.color = "#5ab6c9";
            }
        }

        card.classList.toggle("active");
        card.style.backgroundColor = "rgba(55, 53, 53, 0.66)";


        for (elems of pEelements) {
            elems.style.color = "rgb(209, 214, 225)";
        }
        for (elems of labelElements) {
            elems.style.color = "rgb(90, 182, 201)";
        }

        for (elems of hElemennts) {
            elems.style.color = "rgb(90, 182, 201)";
        }

        otherBody.classList.toggle("active");
        otherBody.style.backgroundColor = "rgb(47, 46, 46)";

    } else {
        h1.style.color = "#366c77";
        icon.src = "../img/dark.png";

        for (e of asideElem) {
            e.classList.toggle("active");
            e.style.backgroundColor = "transparent";
            e.style.color = "#366c77";
        }

        myframe.classList.toggle("active");
        myframe.style.color = "#366c77";

        otherPage = myframe.contentWindow;

        otherBody = otherPage.document.querySelector("body");
        card = otherPage.document.querySelector(".card");
        hElemennts = otherPage.document.querySelectorAll(".card-title");
        labelElements = otherPage.document.querySelectorAll("label");
        pEelements = otherPage.document.querySelectorAll("p");

        if (table = otherPage.document.querySelectorAll("table")) {

            for (elems of table) {
                elems.style.color = "";
            }
        }

        if (legend = otherPage.document.querySelectorAll("legend")) {
            for (elems of legend) {
                elems.style.color = "";
            }
        }

        for (elems of pEelements) {
            elems.style.color = "";
        }

        for (elems of hElemennts) {
            elems.style.color = "";
        }

        for (elems of labelElements) {
            elems.style.color = "";
        }

        if (myUl = otherPage.document.querySelectorAll("ul .list-group")) {
            for (elems of myUl) {
                elems.style.color = "";
            }
        }

        if (hones = otherPage.document.querySelectorAll("h1")) {
            for (elems of hones) {
                elems.style.color = "#366c77";
            }
        }

        card.classList.toggle("active");
        card.style.backgroundColor = "";




        otherBody.classList.toggle("active");
        otherBody.style.backgroundColor = "";
    }
});