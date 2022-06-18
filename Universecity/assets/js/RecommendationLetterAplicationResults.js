//Δήλωση μεταβλητών για τα δεδομένα από το session storage
const user = JSON.parse(sessionStorage.getItem("user"));
const subjects = JSON.parse(sessionStorage.getItem("subjects"));
//---//

//Δήλωση βοηθητικών array
let separatedArray = [[]];
let subArray = [];
//---//

//Δήλωση βοηθητικού Object
let queryObject;
//---//

let ol = document.createElement("ol"); //Δημιουργία ordered list element

subjects.forEach(e => {
    subArray.push(e.code);
});

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const dbResult = this.responseText;
        
        if (dbResult != "Query failed") {

            const result_array = dbResult.split(","); //Τμηματοποίηση των αποτελεσμάτων του πίνακα dbresult στον πίνακα result_array, χωρισμένα σε ","
            
            for(let i=0; i<result_array.length; i++){
                let temp = result_array[i].split(".")
                separatedArray.push(temp);
                separatedArray[i].splice(3, 1);
            }

            separatedArray.shift();
            separatedArray.pop();

            listCreator(); //Κλήση συνάρτησης ListCreator
        }
    };
}
xmlhttp.open("GET", "assets/backend/studentsGet.php?AM=" + user.AM + "&subjects=" + subArray, true);
xmlhttp.send();

function listCreator(){

    //Καταχώρηση περαιτέρω χαρακτηριστικών στην ordered List 
    ol.setAttribute("id", "subList");
    ol.setAttribute("class", "list-group list-group-numbered");
    //---//

    
    document.getElementById("li-card-body").appendChild(ol); //Προσθήκη ordered List στο div element με id "li-card-body"

    for(let i=0;i<separatedArray.length;i++){
        
        let li = document.createElement("li"); //Δημιουργία list items element

        //Καταχώρηση περαιτέρω χαρακτηριστικών στα list items
        li.setAttribute("class", "list-group-item");
        li.setAttribute("id", i);
        //---//

        let a = document.createElement("a"); //Δημιουργία anchor element

        //Καταχώρηση περαιτέρω χαρακτηριστικών στα anchors
        a.setAttribute("id", i);
        a.setAttribute("onclick", "recFill(this.id)");
        a.style.cursor = "pointer";
        //---//

        let span = document.createElement("span"); //Δημιουργία span element
        span.innerHTML = separatedArray[i][1] + " " + separatedArray[i][2] + " (" + separatedArray[i][0] + ")"; //Καταχώρηση κειμένου στα spans
        
        a.appendChild(span); //Προσθήκη span στο anchors element
        li.appendChild(a); //Προσθήκη anchor στο list items element

        document.getElementById("subList").appendChild(li); //Προσθήκη list items στο div element με id "subList"
    }
}

function tableCreator(liItemId){

    var xmlhttpTableFill = new XMLHttpRequest();
    xmlhttpTableFill.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;

            if (dbResult != "Query failed") {

                let validateSubArray = [[]];

                const result_array = dbResult.split(",");

                for(let i=0; i<result_array.length; i++){

                    let temp = result_array[i].split(".")
                    validateSubArray[i].splice(3, 1);

                    validateSubArray.push(temp);
                }

                validateSubArray.shift();
                validateSubArray.pop();

                //Επιλογή των element με id "tableSubject" & "subjects"
                let table = document.querySelector("#tableSubject"); 
                let tbody = document.querySelector("#subjects");
                //---//
                
                tbody.innerHTML = ""; //Άδειασμα πίνακα

                for(let i=0;i<validateSubArray.length;i++){

                    //Δημιουργία table header, table row, table data
                    let th = document.createElement("th"); 
                    let tr = document.createElement("tr");
                    let tdSubject = document.createElement("td");
                    let tdSemester = document.createElement("td");
                    let tdGrade = document.createElement("td");
                    //---//

                    //Καταχώρηση περαιτέρω χαρακτηριστικών στα table header, table row, table data
                    th.setAttribute("scope", "row");
                    th.innerHTML = i+1;
                    tr.appendChild(th); //Προσθήκη table header στο table row element

                    tdSubject.innerHTML = validateSubArray[i][0];
                    tr.appendChild(tdSubject); //Προσθήκη table data στο table row element

                    tdSemester.innerHTML = validateSubArray[i][1];
                    tr.appendChild(tdSemester); //Προσθήκη table data στο table row element

                    tdGrade.innerHTML = validateSubArray[i][2];
                    tr.appendChild(tdGrade); //Προσθήκη table data στο table row element

                    tbody.appendChild(tr); //Προσθήκη table row στο table body element

                    table.appendChild(tbody); //Προσθήκη table body στο table element
                    //---//
                }
            }
        };
    }
    xmlhttpTableFill.open("GET", "assets/backend/validateSubAndTeacher.php?AM=" + user.AM + "&stud_am=" + queryObject.stud_am, true);
    xmlhttpTableFill.send();
}

function recFill(liItemId){

    let separatedGradesArray = [[]]; 

    //Καταχώρηση δεδομένων στο object
    queryObject = {
        "stud_am": separatedArray[liItemId][0], 
        "stud_firstName": separatedArray[liItemId][1],
        "stud_lastName": separatedArray[liItemId][2],
    };
    //---//

    const jsonQueryObject = JSON.stringify(queryObject); //Μετατροπ΄΄η του object -> JSON

    var xmlhttpRecFill = new XMLHttpRequest();
    xmlhttpRecFill.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;

            if (dbResult != "Query failed") {

                const result_array = dbResult.split(","); //Τμηματοποίηση των αποτελεσμάτων του πίνακα dbresult στον πίνακα result_array, χωρισμένα σε ","

                for(let i=0; i<result_array.length; i++){
                    let temp = result_array[i].split(".")
                    separatedGradesArray.push(temp);
                    separatedGradesArray[i].splice(4, 1);
                }

                separatedGradesArray.shift();
                separatedGradesArray.pop();

                let sum=0;
                let avg=0.0;

                //Υπολογισμ΄ός αθροίσματος βαθμών
                for(let i=0; i<separatedGradesArray.length;i++){
                    sum += parseInt(separatedGradesArray[i][3]);
                }
                //---//

                if(separatedGradesArray.length > 0){

                    avg = sum/separatedGradesArray.length; //Υπολογισμ΄ός Μ.Ο βαθμών
                
                    //Τοποθέτηση στοιχείων στα elements
                    let textName = document.querySelector("#textName");
                    textName.setAttribute("value", queryObject.stud_firstName + " " + queryObject.stud_lastName);
                    textName.setAttribute("pseudo-id", queryObject.stud_am);

                    let textGrade = document.querySelector("#textGrade");
                    textGrade.setAttribute("value", avg.toFixed(1));

                    let textYear = document.querySelector("#textYear");
                    textYear.setAttribute("value", 2025);

                    let textUni = document.querySelector("#textUni");
                    textUni.setAttribute("value", "Πανεπ. Μακεδονίας");   
                    //---//

                    tableCreator(liItemId); //Κλήση συνάρτησης tableCreator

                }     
            }
        };
    }
    xmlhttpRecFill.open("GET", "assets/backend/recommendation_letter_application_results.php?results=" + jsonQueryObject, true);
    xmlhttpRecFill.send();
}