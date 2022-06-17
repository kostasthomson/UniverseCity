//Δήλωση μετάβλητων 
const inputBtn = document.querySelector(".form-check-input");
const submitBtn = document.querySelector(".btn.btn-primary");
const selectSub = document.querySelector(".select");
//---//

//onload function
window.onload = () => {
    //Αρχικοποίηση στυλ των element
    submitBtn.style.backgroundColor = "grey";
    submitBtn.style.boxShadow = "grey"
    submitBtn.disabled = true;
    inputBtn.disabled = true;
    //---//
};
//---//

function queryCreator() {

    //Δήλωση μετάβλητων 
    let subject = document.getElementById("subjs");
    let value = subject.options[subject.selectedIndex].value;
    //---//

    //Δήλωση μεταβλητών για τα δεδομένα από το session storage
    let user = JSON.parse(sessionStorage.getItem("user"));
    //---//

    //Δήλωση βοηθητικού object
    let queryObject = {
        "stud_am": user.AM, 
        "teacher_id": value
    };
    //---//

    const jsonQueryObject = JSON.stringify(queryObject); //Μετατροπ΄΄η του object -> JSON

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;

            if (dbResult != "Query failed") {

                alert("Η αίτηση έγινε επιτυχώς");
                window.location.reload(true);
            }
        };
    }
    xmlhttp.open("GET", "assets/backend/recommendation_letter_application.php?results=" + jsonQueryObject, true);
    xmlhttp.send();
}

//Μετατροπές στο στυλ των element
document.addEventListener("change", (e) => {
    inputBtn.disabled = false;
});

inputBtn.addEventListener("click", (e) => {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "#366c77";
});
//---//