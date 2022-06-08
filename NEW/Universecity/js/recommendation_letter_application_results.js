const user = JSON.parse(sessionStorage.getItem("user"));
let separatedArray = [[]];

let ul = document.createElement("ul");

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const dbResult = this.responseText;

        if (dbResult != "Query failed") {

            const result_array = dbResult.split(",");

            for(let i=0; i<result_array.length; i++){
                let temp = result_array[i].split(".")
                separatedArray.push(temp);
                separatedArray[i].splice(5, 1);
            }
            separatedArray.shift();
            separatedArray.pop();

            listCreator();
        }
    };
}
xmlhttp.open("GET", "assets/backend/studentsGet.php?AM=" + user.AM, true);
xmlhttp.send();


function listCreator(){

    ul.setAttribute("id", "subList");
    ul.setAttribute("class", "list-group");
    document.getElementById("li-card-body").appendChild(ul);

    for(let i=0;i<separatedArray.length;i++){
        
        var li = document.createElement("li");
        li.setAttribute("class", "card-body");
        li.setAttribute("id", i);
        li.setAttribute("onclick", "recFill(this.id)");

        li.innerHTML = "Φοιτητής: " + separatedArray[i][1] + " " + separatedArray[i][2] + " (" + separatedArray[i][0] + ")";
        document.getElementById("subList").appendChild(li);
    }
    
}

function recFill(liItemId){

    let queryObject = {
        "stud_am": separatedArray[liItemId][0], 
        "stud_firstName": separatedArray[liItemId][1],
        "stud_lastName": separatedArray[liItemId][2],
        "subject_id": separatedArray[liItemId][3],
        "subject_title": separatedArray[liItemId][4]
    };

    const jsonQueryObject = JSON.stringify(queryObject);

    var xmlhttpRecFill = new XMLHttpRequest();
    xmlhttpRecFill.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;

            if (dbResult != "Query failed") {

                const result_array = dbResult.split(",");

                console.log(result_array);

            }
        };
    }
    xmlhttpRecFill.open("GET", "assets/backend/recommendation_letter_application_results.php?results=" + jsonQueryObject, true);
    xmlhttpRecFill.send();
}