const selectedSub = document.querySelector(".select");
const radioBtnsNodes = document.querySelectorAll(".styleRadio");
const labelInput = document.querySelector("radio-inline");
const text = document.querySelector(".form-control");
const disabled = document.querySelector(".invalid");
const submitBtn = document.querySelector(".submitBtn");
const textarea = document.querySelector(".textarea");
let radioCounter = 0;

const RADIO_EACH_ROW = 6;

function fillOptions() {

    let array = [];

    const inputs = document.querySelectorAll("input");

    inputs.forEach(e => {
        if (e.checked) {
            array.push(e.value);
        }
    });

    return array;
}

function sendRequest() {

    for (radio of radioBtnsNodes) {
        if (radio.checked) {
            radioCounter++;
        }
    }

    let options = fillOptions();
    let subject = document.getElementById("subjs");
    let value = subject.options[subject.selectedIndex].value;
    const textArea = document.getElementById("floatingTextarea").value;

    let user = JSON.parse(sessionStorage.getItem("user"));

    let queryObject = {
        "subject": value,

        "options": options,

        "text": textArea,

        "AM": user.AM
    };

    const jsonQueryObject = JSON.stringify(queryObject);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if (dbResult != "Query failed" && (radioCounter + 1) * RADIO_EACH_ROW >= radioBtnsNodes.length) {

                alert("Η υποβολή σου έγινε επιτυχώς!");
                window.location.reload(true);
                const result_array = dbResult.split(",");
            }
        }
    };
    xmlhttp.open("GET", "assets/backend/evaluation_form.php?results=" + jsonQueryObject, true);
    xmlhttp.send();
}

window.onload = () => {
    radioCounter = 0;
    submitBtn.style.backgroundColor = "grey";
    submitBtn.style.boxShadow = "grey"
};

document.addEventListener("change", (e) => {
    let counter = 0;

    for (radio of radioBtnsNodes) {
        if (radio.checked) {
            counter++;
        }
    }

    if (counter >= 12) {
        submitBtn.style.backgroundColor = "#366c77";

    }
});

selectedSub.addEventListener('change', (e) => {
    //clear text
    text.value = "";
    let selectedValue = selectedSub.value;

    //clear buttons
    let size = radioBtnsNodes.length;
    for (let i = 0; i < size; i++) {
        radioBtnsNodes[i].checked = false;
    }

    //remove text decoration from disabled button
    disabled.className = "";

    radioCounter = 0;

    submitBtn.style.backgroundColor = "grey";
    submitBtn.style.boxShadow = "grey"
});