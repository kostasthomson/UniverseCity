const user = JSON.parse(sessionStorage.getItem("user"));

let separatedArray = [[]];

let queryObject;


let ol = document.createElement("ol");

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const dbResult = this.responseText;

        if (dbResult != "Query failed") {

            const result_array = dbResult.split(",");
            
            for(let i=0; i<result_array.length; i++){
                let temp = result_array[i].split(".")
                separatedArray.push(temp);
                separatedArray[i].splice(3, 1);
            }

            separatedArray.shift();
            separatedArray.pop();

            listCreator();
        }
    };
}
xmlhttp.open("GET", "assets/backend/studentsGet.php?AM=" + user.AM, true);
xmlhttp.send();

function recFill(liItemId){

    let separatedGradesArray = [[]];

    queryObject = {
        "stud_am": separatedArray[liItemId][0], 
        "stud_firstName": separatedArray[liItemId][1],
        "stud_lastName": separatedArray[liItemId][2],
    };

    const jsonQueryObject = JSON.stringify(queryObject);

    var xmlhttpRecFill = new XMLHttpRequest();
    xmlhttpRecFill.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;

            if (dbResult != "Query failed") {

                const result_array = dbResult.split(",");

                for(let i=0; i<result_array.length; i++){
                    let temp = result_array[i].split(".")
                    separatedGradesArray.push(temp);
                    separatedGradesArray[i].splice(4, 1);
                }

                separatedGradesArray.shift();
                separatedGradesArray.pop();

                let sum=0;
                let avg=0.0;

                for(let i=0; i<separatedGradesArray.length;i++){
                    sum += parseInt(separatedGradesArray[i][3]);
                }

                if(separatedGradesArray.length > 0){

                    avg = sum/separatedGradesArray.length; 
                
                    let textName = document.querySelector("#textName");
                    textName.setAttribute("value", queryObject.stud_firstName + " " + queryObject.stud_lastName);

                    let textGrade = document.querySelector("#textGrade");
                    textGrade.setAttribute("value", avg);

                    let textYear = document.querySelector("#textYear");
                    textYear.setAttribute("value", 2025);

                    let textUni = document.querySelector("#textUni");
                    textUni.setAttribute("value", "Πανεπ. Μακεδονίας");   

                    tableCreator(liItemId);

                } 
                
            }
        };
    }
    xmlhttpRecFill.open("GET", "assets/backend/recommendation_letter_application_results.php?results=" + jsonQueryObject, true);
    xmlhttpRecFill.send();
}

function listCreator(){

    ol.setAttribute("id", "subList");
    ol.setAttribute("class", "list-group list-group-numbered");
    document.getElementById("li-card-body").appendChild(ol);

    for(let i=0;i<separatedArray.length;i++){
        
        let li = document.createElement("li");
        let a = document.createElement("a");
        let span = document.createElement("span");

        li.setAttribute("class", "list-group-item");

        a.setAttribute("id", i);
        a.setAttribute("onclick", "recFill(this.id)");
        a.style.cursor = "pointer";


        span.innerHTML = "Φοιτητής: " + separatedArray[i][1] + " " + separatedArray[i][2] + " (" + separatedArray[i][0] + ")";
        
        a.appendChild(span);
        li.appendChild(a);

        document.getElementById("subList").appendChild(li);
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

                console.log(validateSubArray);

                console.log(queryObject.stud_am);

                let table = document.querySelector("#tableSubject");
                let tbody = document.querySelector("#subjects");
                let tdSubject = document.createElement("td");
                let tdSemester = document.createElement("td");
                let tdGrade = document.createElement("td");
                let th = document.createElement("th");
                

                tbody.innerHTML = "";

                let tr = document.createElement("tr");

                for(let i=0;i<validateSubArray.length;i++){

                    
                

                    th.setAttribute("scope", "row");
                    th.innerHTML = i+1;
                    tr.appendChild(th);

                    tdSubject.innerHTML = validateSubArray[i][0];
                    tr.appendChild(tdSubject);

                    tdSemester.innerHTML = validateSubArray[i][1];
                    tr.appendChild(tdSemester);

                    tdGrade.innerHTML = validateSubArray[i][2];
                    tr.appendChild(tdGrade);

                    tbody.appendChild(tr);

                    table.appendChild(tbody);
                }

            }

        };
    }
    xmlhttpTableFill.open("GET", "assets/backend/validateSubAndTeacher.php?AM=" + user.AM + "&stud_am=" + queryObject.stud_am, true);
    xmlhttpTableFill.send();

}