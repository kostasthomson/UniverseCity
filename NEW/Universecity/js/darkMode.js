const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const aside = document.querySelector("aside");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const main = document.querySelector("main");
const asideElem = document.querySelectorAll("aside ul li a.nav-link");
const notificationIcon = document.querySelector(".header-nav .nav-icon");
const otherIcon = document.getElementById("asideElem");
const searchBar = document.querySelector(".search-bar");
const workingIcon = document.querySelector("i .bi.bi-bell");
const workingText = document.querySelector(".nav-link.nav-profile.d-flex.align-items-center.pe-0");
const docShow = document.querySelectorAll("li .dropdown-header");
const h5list = document.querySelectorAll("header h6");
const icon = document.querySelector(".indicator");
const h1 = document.querySelector("h1");
const h4list = document.querySelectorAll("header h4");
const myframe = document.querySelector('iframe');
const temp1 = Array.from(document.querySelectorAll("ul"));
const spanlist = document.querySelectorAll("span");
let universecityPlanet = document.querySelector(".planet");
let universecityText = document.querySelector(".logo-text");

temp1.shift();
console.log(docShow);
console.log(temp1);
let otherPage;
let otherBody;
let hElemennts;
let labelElements;
let pEelements;
let divButton;







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
    otherIcon.classList.toggle("active");
    workingText.classList.toggle("active");




    if (aside.classList.contains("active")) {
        icon.src = "../img/Logo-white.png";
        icon.style.boxShadow = "none";
        universecityText.src = "../img/Universecity - textInverse.png";
        universecityPlanet.src = "../img/logo-white.png";
        universecityPlanet.style.boxShadow = "none";
        universecityText.style.boxShadow = "none";
        h1.style.color = "#5ab6c9";



        for (e of asideElem) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgba(87, 77, 77, 0.14)";
            e.style.color = "#5ab6c9";
        }



        for (e of docShow) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(47, 46, 46)";
            e.style.color = "#5ab6c9";
        }


        for (e of spanlist) {
            e.classList.toggle("active");
            e.style.color = "#5ab6c9";
        }

        for (e of temp1) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(47, 46, 46)";
            e.style.color = "#5ab6c9";
        }

        for (e of h5list) {
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



        if (divButton = otherPage.document.querySelector(".selectCourse")) {
            divButton.style.backgroundColor = "#343333";
        }

        if (seatButton = otherPage.document.querySelector("seatBoxContainer")) {
            seatButton.style.backgroundColor = "#343333";
        }
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
        card.style.backgroundColor = "rgba(87, 77, 77, 0.14)";


        for (elems of pEelements) {
            elems.style.color = "rgb(209, 214, 225)";
        }
        for (elems of labelElements) {
            elems.style.color = "rgb(90, 182, 201)";
        }

        for (elems of hElemennts) {
            elems.style.color = "rgb(90, 182, 201)";
        }

        for (elems of h4list) {
            elems.style.color = "#5ab6c9";
        }

        if (myel = otherPage.document.querySelectorAll("li")) {
            for (elems of myel) {
                elems.style.color = "#5ab6c9";
            }
        }


        if (myQuestions = otherPage.document.querySelectorAll(".questions")) {
            for (elems of myQuestions) {
                elems.style.backgroundColor = "#4a4c4f5e";
            }
        }


        otherBody.classList.toggle("active");
        otherBody.style.backgroundColor = "rgb(47, 46, 46)";

    } else {
        h1.style.color = "#366c77";
        icon.src = "../img/Logo.png";
        universecityPlanet.src = "../img/Logo.png";
        universecityText.src = "../img/Universecity - text.png";
        for (e of asideElem) {
            e.classList.toggle("active");
            e.style.backgroundColor = "transparent";
            e.style.color = "#366c77";
        }



        for (e of temp1) {
            e.classList.toggle("active");
            e.style.backgroundColor = "";
            e.style.color = "";
        }

        for (e of docShow) {
            e.classList.toggle("active");
            e.style.backgroundColor = "";
            e.style.color = "";
        }

        for (e of h5list) {
            e.classList.toggle("active");
            e.style.backgroundColor = "";
            e.style.color = "";
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

        if (myel = otherPage.document.querySelectorAll("li")) {
            for (elems of myel) {
                elems.style.color = "";
            }
        }

        for (elems of pEelements) {
            elems.style.color = "";
        }

        for (elems of hElemennts) {
            elems.style.color = "#366c77";
        }

        for (elems of labelElements) {
            elems.style.color = "";
        }
        for (elems of h4list) {
            elems.style.color = "";
        }

        if (myUl = otherPage.document.querySelectorAll("ul .list-group")) {
            for (elems of myUl) {
                elems.style.color = "";
            }
        }

        if (hones = otherPage.document.querySelectorAll("h1")) {
            for (elems of hones) {
                elems.style.color = "";
            }
        }



        if (myQuestions = otherPage.document.querySelectorAll(".questions")) {
            for (elems of myQuestions) {
                elems.style.backgroundColor = "";
            }
        }

        for (e of spanlist) {
            e.classList.toggle("active");
            e.style.color = "";
        }

        if (seatButton = otherPage.document.querySelector("seatBoxContainer")) {
            seatButton.style.backgroundColor = "";
        }

        card.classList.toggle("active");
        card.style.backgroundColor = "";




        otherBody.classList.toggle("active");
        otherBody.style.backgroundColor = "";
    }
});