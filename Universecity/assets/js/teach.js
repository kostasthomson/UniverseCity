var lessons = ["MethamaticI", "MathematicII", "Statistics", "Technology"];
var students = [
    { studentName: "ics2111", lesson: "MethamaticI" },
    { studentName: "ics2112", lesson: "MathematicII" },
    { studentName: "ics2113", lesson: "Statistics" },
    { studentName: "ics2114", lesson: "MethamaticI" },
    { studentName: "ics2115", lesson: "MathematicII" },
    { studentName: "ics2116", lesson: "Technology" },
    { studentName: "ics2117", lesson: "MethamaticI" },
    { studentName: "ics2118", lesson: "Statistics" },
    { studentName: "ics2119", lesson: "Statistics" },
    { studentName: "ics2120", lesson: "Technology" },
    { studentName: "ics2121", lesson: "MethamaticI" },
    { studentName: "ics2122", lesson: "Technology" },
]

function myLessons() {

    //empty the list
    var myList = document.getElementById('list');
    myList.innerHTML = '';

    //create elements for textArea and ul
    var textArea = document.createElement('textarea');
    textArea.setAttribute('id', 'textAreaList');
    var ul = document.createElement('ul');
    ul.setAttribute('id', 'lessonList');

    document.getElementById('list').appendChild(ul);
    lessons.forEach(renderLessonList);

    //for every elemnt that lesson has create li and the textArea ( Lesson and description )
    function renderLessonList(element) {
        var li = document.createElement('li');
        var textArea = document.createElement('textarea');
        li.setAttribute('class', 'item');

        ul.appendChild(li);
        ul.appendChild(textArea);

        li.innerHTML = li.innerHTML + element;
    }
}

//adding the lesson in the lesson list
function addLesson() {
    var x = document.getElementById("lesson-box").value;

    if (x != '' && !(lessons.includes(x))) {
        lessons.push(x);
        myLessons();
    }
}

//delete the lesson from the lesson list 
function deleteLesson() {
    var x = document.getElementById("lesson-box").value;
    if (x != '' && lessons.includes(x)) {
        lessons.pop(x);
        myLessons();
    }
}


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

    data.forEach(function (rowData) {
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

function saveEverything() {
    console.log("Αποθήκευση Δεδομένων");
}

myLessons();
document.body.appendChild(buildTable(students));