var schedule = [
    { Days: "Δευτέρα", Hours: "9-12", lessons: "MethamaticI" },
    { Days: "Δευτέρα", Hours: "12-13", lessons: "MethamaticII" },
    { Days: "Δευτέρα", Hours: "16-18", lessons: "Statistics" },
    { Days: "Τρίτη", Hours: "9-12", lessons: "MathematicII" },
    { Days: "Τετάρτη", Hours: "9-12", lessons: "Statistics" },
    { Days: "Πέμπτη", Hours: "9-12", lessons: "MethamaticI" },
    { Days: "Παρασκευή", Hours: "9-12", lessons: "MathematicII" },
]

var buildTable = function buildTable(data) {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var keys = Object.keys(data[0]);

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

    data.forEach(function (rowData) {
        tr = document.createElement("tr");
        for (var i = 2; i < keys.length; i++) {
            var key = keys[i];
            var colData = document.createElement("td");
            var grade = document.createElement("td");
            colData.appendChild(document.createTextNode(rowData[key]));
            grade.appendChild(document.createTextNode(rowData[key]));
            if (typeof rowData[key] == "number") {
                colData.style.textAlign = "right";
            }
            tr.appendChild(colData, grade);
        }
        table.appendChild(tr);
    });
    return table;
}

document.body.appendChild(buildTable(schedule));

function changeSchedule() {
    console.log("Εδώ θα επιλέγει την ώρα και την μέρα και το μάθημα που θέλει να αλλάξει");
}
