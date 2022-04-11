// xmlhttp.open("GET", "/backend/THOMSON/DB_retrieve.php?am=" + USER_AM + "&pass=" + USER_PASS, true);
// xmlhttp.send();

//create a dumy arrays for database
const lessons = ["MethamaticI", "MathematicII", "Statistics"]
var titles = ["Τα μαθήματα μου", "Μέσος όρος των μαθημάτων μου"]
var students = [
    { studentName: "ics2111", studentGrade: 7, lesson: "MethamaticI" },
    { studentName: "ics2112", studentGrade: 8, lesson: "MathematicII" },
    { studentName: "ics2113", studentGrade: 7, lesson: "Statistics" },
    { studentName: "ics2114", studentGrade: 6, lesson: "MethamaticI" },
    { studentName: "ics2115", studentGrade: 5, lesson: "MathematicII" },
    { studentName: "ics2116", studentGrade: 8, lesson: "Statistics" },
    { studentName: "ics2117", studentGrade: 9, lesson: "MethamaticI" },
    { studentName: "ics2118", studentGrade: 3, lesson: "Statistics" },
    { studentName: "ics2119", studentGrade: 6, lesson: "Statistics" },
    { studentName: "ics2120", studentGrade: 1, lesson: "MathematicII" },
    { studentName: "ics2121", studentGrade: 3, lesson: "MethamaticI" },
    { studentName: "ics2122", studentGrade: 7, lesson: "Statistics" },
]



var buildTable = function buildTable(data) {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var keys = Object.keys(data[0]);
    //console.log(keys); //StudentName - studentGrade - lesson (3)


    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var colHeader = document.createElement("th");
        colHeader.appendChild(document.createTextNode(key));
        tr.appendChild(colHeader);
    }
    table.appendChild(tr);

    data.forEach(function(rowData) {
        tr = document.createElement("tr");
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var colData = document.createElement("td");
            colData.appendChild(document.createTextNode(rowData[key]));
            if (typeof rowData[key] == "number") {
                colData.style.textAlign = "right";
            }
            tr.appendChild(colData);
        }
        table.appendChild(tr);
    });
    return table;
};







var buildEvaluationTable = function buildEvaluationTable(data, titles) {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var keys = Object.keys(data[0]);

    for (var i = 0; i < titles.length; i++) {
        var colHeader = document.createElement("th");
        colHeader.appendChild(document.createTextNode(titles[i]));
        tr.appendChild(colHeader);
    }

    table.appendChild(tr);

    data.forEach(function(rowData) {
        tr = document.createElement("tr");
        for (var i = 2; i < keys.length; i++) {
            var key = keys[i];
            var colData = document.createElement("td");
            var grade = document.createElement("td");
            colData.appendChild(document.createTextNode(rowData[key]));
            grade.appendChild(document.createTextNode(rowData[key]));

            var grade = findAverage(rowData[key]);
            console.log(JSON.stringify(grade));

            if (typeof rowData[key] == "number") {
                colData.style.textAlign = "right";
            }
            tr.appendChild(colData, grade);
        }
        table.appendChild(tr);
    });
    return table;
}

function findAverage(lessonName) {
    var total = 0;
    var counter = 0;
    for (var i = 0; i < students.length; i++) {
        if (typeof students[i].studentGrade !== 'undefined' && students[i].lesson == lessonName) {
            total += students[i].studentGrade;
            //console.log(JSON.stringify(students[i].studentGrade));
            counter++;
        }
    }

    var avg = total / counter;
    //console.log(JSON.stringify("Average: " + avg + " total: " + total + " length: " + students.length, null, 2));

    return avg;
}

document.body.appendChild(buildTable(students));
document.body.appendChild(buildEvaluationTable(students, titles));