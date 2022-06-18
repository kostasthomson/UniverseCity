//Δημιουργία element select και προσθήκη χαρακτηριστικών
const select = document.createElement("select");
select.setAttribute("name", "subjects");
select.setAttribute("id", "subjs");
select.setAttribute("class", "select");
//---//

//Δημιουργία element option και προσθήκη χαρακτηριστικών
let options = document.createElement("option");

let optionText = document.createTextNode("Επιλεξε μαθημα");

options.setAttribute("disabled", "disabled");
options.setAttribute("selected", "selected");
options.setAttribute("class", "subject");
options.setAttribute("value", -1);
options.appendChild(optionText);

select.appendChild(options);
//---//

//Δήλωση μεταβλητών για τα δεδομένα από το session storage
let user = JSON.parse(sessionStorage.getItem("user"));
let subjects = JSON.parse(sessionStorage.getItem("subjects"));
//---//

for (let i = 0; i < subjects.length; i++) {


    let optionText = document.createTextNode(subjects[i].title); //Τίτλος για τα option elements
    options = document.createElement("option");
    //Καταχώρηση περαιτέρω χαρακτηριστικών
    options.setAttribute("value", subjects[i].code);
    options.setAttribute("name", subjects[i].code);
    options.setAttribute("class", "subject");
    options.setAttribute("id", i + 1);
    options.appendChild(optionText);
    //---//
    select.appendChild(options); //Προσθήκη option στο select element
}

document.getElementById("optionSet").appendChild(select); //Προσθήκη select στο div element με id "optionSet"

