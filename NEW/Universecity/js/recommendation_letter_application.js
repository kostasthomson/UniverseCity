const inputBtn = document.querySelector(".form-check-input");
const submitBtn = document.querySelector(".btn.btn-primary");
const selectSub = document.querySelector(".select");



window.onload = () => {
    submitBtn.style.backgroundColor = "grey";
    submitBtn.style.boxShadow = "grey"
    submitBtn.disabled = true;
    inputBtn.disabled = true;
};




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
                window.location.reload(true);
            }
        };
    }
    xmlhttp.open("GET","assets/backend/recommendation_letter_application.php?results=" + jsonQueryObject, true);
    xmlhttp.send();
}


document.addEventListener("change" , (e) => {
    inputBtn.disabled = false;
    console.log("%cThis is a blue text", "color:red");
    console.log("hi");
    
});

inputBtn.addEventListener("click" , (e) => {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "#366c77";
    submitBtn.style.boxShadow = "0rem 0.7rem 1.2rem #3996a9"

});
