const subject_id = [];
const subject_title = [];
const select = document.createElement("select");
select.setAttribute("name", "subjects");
select.setAttribute("id", "subjs");
select.setAttribute("class", "select");

let options = document.createElement("option");
let user = JSON.parse(sessionStorage.getItem("user"));

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const dbResult = this.responseText;
        if (dbResult != "Query failed") {

            const result_array = dbResult.split(",");
            let separatedArray = [[]];

            for(let i=0; i<result_array.length; i++){
                let temp = result_array[i].split(".")
                separatedArray.push(temp);
                separatedArray[i].splice(3, 1);
            }
            separatedArray.shift();
            separatedArray.pop();

            let optionText = document.createTextNode("Επιλεξε καθηγητη");

            options.setAttribute("disabled", "disabled");
            options.setAttribute("selected", "selected");
            options.setAttribute("class", "invalid");
            options.appendChild(optionText);

            select.appendChild(options);   

            for (let i = 0; i < separatedArray.length; i++) {

                let optionText = document.createTextNode("(" + separatedArray[i][0] + ") " + separatedArray[i][1] + " " + separatedArray[i][2]);
                options = document.createElement("option");
                options.setAttribute("value", separatedArray[i][0]);
                options.setAttribute("name", separatedArray[i][0]);
                options.setAttribute("id", i + 1);
                options.appendChild(optionText);

                select.appendChild(options);    
            }
            document.getElementById("test").appendChild(select);
        }
    };
}
xmlhttp.open("GET", "assets/backend/teachersGet.php?", true);
xmlhttp.send();