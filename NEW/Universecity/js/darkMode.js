const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const aside = document.querySelector("aside");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const main = document.querySelector("main");
const asideElem = document.querySelectorAll("aside ul li a.nav-link");
const otherIcon = document.getElementById("asideElem");
const searchBar = document.querySelector(".search");
const workingText = document.querySelector(".nav-link.nav-profile.d-flex.align-items-center.pe-0");
const docShow = document.querySelectorAll("li .dropdown-header");
const h6list = document.querySelectorAll("header h6");
const icon = document.querySelector(".indicator");
const h1 = document.querySelector("h1");
const h4list = document.querySelectorAll("header h4");
const myframe = document.querySelector('iframe');
const temp1 = Array.from(document.querySelectorAll("ul"));
const spanlist = document.querySelectorAll("span");
const universecityPlanet = document.querySelector(".planet");
const universecityText = document.querySelector(".logo-text");
const sidebar = document.querySelector("aside ul.sidebar-nav");


console.log(sidebar);
temp1.shift(); //!remove the first element which contains the notify and Img Icon 





toggle.addEventListener("click", (e) => {
    //!Consistent dark mode through page changes,time out is necessecary to work
    sidebar.onclick = function () {
        setTimeout(function () {
            toggle.click();

        }, 5);
        setTimeout(function () {
            toggle.click();

        }, 60);




    };

    //!elements that CAN be stylized via css in index.html 
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
        searchBar.style.backgroundColor = "rgb(24, 26, 27);";
        searchBar.style.color = "#5ab6c9";



        for (e of asideElem) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(24, 26, 27)";
            e.style.color = "#5ab6c9";
        }



        for (e of docShow) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(24, 26, 27)";
            e.style.color = "#5ab6c9";
        }


        for (e of spanlist) {
            e.classList.toggle("active");
            e.style.color = "#5ab6c9";
        }

        for (e of temp1) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(24, 26, 27)";
            e.style.color = "#5ab6c9";
        }

        for (e of h6list) {
            e.classList.toggle("active");
            e.style.backgroundColor = "rgb(24, 26, 27)";
            e.style.color = "#5ab6c9";
        }




        for (elems of h4list) {
            elems.style.color = "#5ab6c9";
        }

        myframe.classList.toggle("active");
        myframe.style.color = "#5ab6c9";

        //!: Existing elements in index over, we head now to iframe elements that need initialization and special "care" 

        let otherPage = myframe.contentWindow;

        let otherBody = otherPage.document.querySelector("body");
        let hElemennts = otherPage.document.querySelectorAll(".card-title");
        let labelElements = otherPage.document.querySelectorAll("label");
        let pEelements = otherPage.document.querySelectorAll("p");
        let textareas = otherPage.document.querySelectorAll("textarea");
        let accordionBody = otherPage.document.querySelectorAll(".accordion-body");
        let inputs = otherPage.document.querySelectorAll("input");
        let buttons = otherPage.document.querySelectorAll("button");
        let seatbox = otherPage.document.querySelectorAll(".seatBoxContainer");
        let selectBox = otherPage.document.querySelectorAll("selectCourse");
        let card = otherPage.document.querySelector(".card");
        let liList = otherPage.document.querySelector("li");
        let nav = otherPage.document.querySelector("nav");
        let sections = otherPage.document.querySelectorAll("section");
        let headerBox = otherPage.document.querySelector("header.box");
        let containers = otherPage.document.querySelectorAll(".container");
        let selections = otherPage.document.querySelectorAll("select");
        let listGroup = otherPage.document.querySelectorAll(".list-group-item-item");
        let options = otherPage.document.querySelectorAll("option")

        for (elems of pEelements) {
            elems.style.color = "rgb(209, 214, 225)";
        }
        for (elems of labelElements) {
            elems.style.color = "rgb(90, 182, 201)";
        }

        for (elems of hElemennts) {
            elems.style.color = "rgb(90, 182, 201)";
        }

        if (options = otherPage.document.querySelectorAll("option")) {
            for (e of options) {
                e.classList.toggle("active");
                e.style.color = "#5ab6c9";
            }

        }

        if (listGroup = otherPage.document.querySelectorAll(".list-group-item")) {

            for (e of listGroup) {
                e.classList.toggle("active");
                e.style.backgroundColor = "rgb(27, 29, 30)";
            }

        }


        if (selections = otherPage.document.querySelectorAll("select")) {
            for (e of selections) {
                e.classList.toggle("active");
                e.style.backgroundColor = "rgb(27, 29, 30)";
            }
        }
        if (containers = otherPage.document.querySelectorAll(".container")) {
            for (e of containers) {
                e.classList.toggle("active");
                e.style.backgroundColor = "#212222";
            }
        }


        if (nav = otherPage.document.querySelector("nav")) {
            nav.classList.toggle("active");
            nav.style.backgroundColor = "rgb(27, 29, 30)";

        }
        if (headerBox = otherPage.document.querySelector("header.box")) {
            headerBox.classList.toggle("active");
            headerBox.style.backgroundColor = "rgb(27, 29, 30)";

        }

        if (liList = otherPage.document.querySelectorAll("li")) {
            for (e of liList) {
                e.classList.toggle("active");
                e.style.color = "#5ab6c9";
            }
        }

        if (sections = otherPage.document.querySelectorAll("section")) {
            for (e of sections) {
                e.classList.toggle("active");
                e.style.backgroundColor = "rgb(27, 29, 30)";
            }
        }

        if (card = otherPage.document.querySelector(".card")) {
            card.classList.toggle("active");
            card.style.backgroundColor = "rgb(27, 29, 30)";

        }
        if (seatbox = otherPage.document.querySelectorAll(".seatBoxContainer")) {
            for (e of seatbox) {
                e.classList.toggle("active");
                e.style.backgroundColor = "rgb(27, 29, 30)";
            }
        }

        if (selectBox = otherPage.document.querySelectorAll(".selectCourse")) {
            for (e of selectBox) {
                e.classList.toggle("active");
                e.style.backgroundColor = "rgb(27, 29, 30)";
            }
        }

        if (buttons = otherPage.document.querySelectorAll("button")) {
            for (e of buttons) {
                e.classList.toggle("active");
                e.style.backgroundColor = "rgb(27, 29, 30)";
                e.style.color = "#5ab6c9";
            }
        }

        if (inputs = otherPage.document.querySelectorAll("input")) {
            for (e of inputs) {
                e.classList.toggle("active");
                e.style.backgroundColor = "rgb(27, 29, 30)";
                e.style.color = "#5ab6c9";
            }
        }

        if (accordionBody = otherPage.document.querySelectorAll(".accordion-body")) {
            for (e of accordionBody) {
                e.classList.toggle("active");
                e.style.backgroundColor = "rgb(27, 29, 30)";
                e.style.color = "#5ab6c9";
            }
        }

        if (textareas = otherPage.document.querySelectorAll("textarea")) {
            for (e of textareas) {
                e.classList.toggle("active");
                e.style.backgroundColor = "rgb(27, 29, 30)";
                e.style.color = "#5ab6c9";
            }
        }

        if (divButton = otherPage.document.querySelector(".selectCourse")) {
            divButton.style.backgroundColor = "rgb(27, 29, 30)";
        }

        if (seatButton = otherPage.document.querySelector("seatBoxContainer")) {
            seatButton.style.backgroundColor = "rgb(27, 29, 30)";
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

        if (myUl = otherPage.document.querySelectorAll("ul .list-group-item")) {
            for (elems of myUl) {
                elems.style.color = "#5ab6c9";
            }
        }

        if (myli = otherPage.document.querySelectorAll(".darkmode")) {
            for (elems of myli) {
                elems.style.color = "#5ab6c9";
            }
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

        if (otherBody = otherPage.document.querySelector("body")) {
            otherBody.classList.toggle("active");
            otherBody.style.backgroundColor = "rgb(27, 29, 30)";
        }

    } else {
        h1.style.color = "#366c77";
        icon.src = "../img/Logo.png";
        universecityPlanet.src = "../img/Logo.png";
        universecityText.src = "../img/Universecity - text.png";
        searchBar.style.backgroundColor = "";
        searchBar.style.color = "#366c77";


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

        for (e of h6list) {
            e.classList.toggle("active");
            e.style.backgroundColor = "";
            e.style.color = "";
        }


        for (elems of h4list) {
            elems.style.color = "";
        }

        for (e of spanlist) {
            e.classList.toggle("active");
            e.style.color = "";
        }




        myframe.classList.toggle("active");
        myframe.style.color = "#366c77";

        //!: Existing elements in index over, we head now to iframe elements that need initialization and special "care" 

        let otherPage = myframe.contentWindow;

        let otherBody = otherPage.document.querySelector("body");
        let card = otherPage.document.querySelectorAll(".card");
        let hElemennts = otherPage.document.querySelectorAll(".card-title");
        let labelElements = otherPage.document.querySelectorAll("label");
        let pEelements = otherPage.document.querySelectorAll("p");
        let textareas = otherPage.document.querySelectorAll("textarea");
        let accordionBody = otherPage.document.querySelectorAll(".accordion-body");
        let inputs = otherPage.document.querySelectorAll("input");
        let buttons = otherPage.document.querySelectorAll("button");
        let seatbox = otherPage.document.querySelectorAll(".seatBoxContainer");
        let selectBox = otherPage.document.querySelectorAll("selectCourse");
        let liList = otherPage.document.querySelectorAll("li");
        let nav = otherPage.document.querySelector("nav");
        let sections = otherPage.document.querySelectorAll("section.box");
        let headerBox = otherPage.document.querySelector("header.box");
        let containers = otherPage.document.querySelectorAll(".container");
        let selections = otherPage.document.querySelectorAll("select");
        let listGroup = otherPage.document.querySelectorAll(".list-group-item");
        let options = otherPage.document.querySelectorAll("option")

        for (elems of pEelements) {
            elems.style.color = "";
        }

        for (elems of hElemennts) {
            elems.style.color = "#366c77";
        }

        for (elems of labelElements) {
            elems.style.color = "";
        }

        if (options = otherPage.document.querySelectorAll("option")) {
            for (e of options) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
            }

        }
        if (listGroup = otherPage.document.querySelectorAll(".list-group-item")) {

            for (e of listGroup) {
                e.classList.toggle("active");
                e.style.backgroundColor = "white";
            }

        }
        if (selections = otherPage.document.querySelectorAll("select")) {
            for (e of selections) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
                e.style.color = "";
            }
        }

        if (containers = otherPage.document.querySelectorAll(".container")) {
            for (e of containers) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
            }
        }

        if (nav = otherPage.document.querySelector("nav")) {
            nav.classList.toggle("active");
            nav.style.backgroundColor = "#f6f9ff";
            nav.style.color = "#366c77";

        }
        if (headerBox = otherPage.document.querySelector("header.box")) {
            headerBox.classList.toggle("active");
            headerBox.style.backgroundColor = "#366c77";
            headerBox.style.color = "white";

        }



        if (sections = otherPage.document.querySelectorAll("section.box")) {
            for (e of sections) {
                e.classList.toggle("active");
                e.style.backgroundColor = "white";
            }
        }


        if (liList = otherPage.document.querySelectorAll("li")) {
            for (e of liList) {
                e.classList.toggle("active");
                e.style.color = "#5ab6c9";
            }
        }
        if (card = otherPage.document.querySelectorAll(".card")) {
            for (e of card) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
            }
        }


        if (selectBox = otherPage.document.querySelectorAll(".selectCourse")) {
            for (e of selectBox) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
            }
        }

        if (seatbox = otherPage.document.querySelectorAll(".seatBoxContainer")) {
            for (e of seatbox) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
                e.style.color = "";
            }
        }

        if (buttons = otherPage.document.querySelectorAll("button")) {
            for (e of buttons) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
                e.style.color = "";
            }
        }

        if (inputs = otherPage.document.querySelectorAll("input")) {
            for (e of inputs) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
                e.style.color = "";
            }
        }


        if (accordionBody = otherPage.document.querySelectorAll(".accordion-body")) {
            for (e of accordionBody) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
                e.style.color = "";
            }
        };



        if (textareas = otherPage.document.querySelectorAll("textarea")) {
            for (e of textareas) {
                e.classList.toggle("active");
                e.style.backgroundColor = "";
                e.style.color = "";
            }
        }
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

        if (myUl = otherPage.document.querySelectorAll("ul .list-group-item")) {
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



        if (seatButton = otherPage.document.querySelector("seatBoxContainer")) {
            seatButton.style.backgroundColor = "";
        }







        if (otherBody = otherPage.document.querySelector("body")) {
            otherBody.classList.toggle("active");
            otherBody.style.backgroundColor = "";
        }
    }
});