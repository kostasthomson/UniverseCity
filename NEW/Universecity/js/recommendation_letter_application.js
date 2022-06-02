function queryCreator(){

    let subject = document.getElementById("subjs");
    let value = subject.options[subject.selectedIndex].value;

    let queryObject= {
        "stud_am" : "ics21001",
        "subject_id" : value
    };

    const jsonQueryObject = JSON.stringify(queryObject);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if(dbResult!="Query failed") {
                alert("Η αίτηση έγινε επιτυχώς");
            }
        };
    }
    xmlhttp.open("GET","assets/backend/recommendation_letter_application.php?results=" + jsonQueryObject, true);
    xmlhttp.send();
}
