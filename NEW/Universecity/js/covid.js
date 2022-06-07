const inputBtn = document.querySelector(".form-check-input");
const submitBtn = document.querySelector(".btn.btn-primary");
const covidPdf = document.querySelector(".form-control");
const inputs = document.querySelectorAll("input[type=text]");

const regexClass = /[^α-ω0-9,-]/gi;
const regexSeats = /[^0-9,]/g;

let classroom = Array.from(document.querySelectorAll(".form-control"));
let seats = [];







document.addEventListener("input", (e) => {
  if (classroom.includes(e.target)) {
    let indexC = classroom.indexOf(e.target);
    let str = "";
    let sanitizedString = "";
    str = e.target.value;
    sanitizedString = str.replace(regexClass, '');
    if (sanitizedString !== e.target.value) {
      e.target.value = sanitizedString;
      classroom[indexC] = e.target;
    }
  } else if (seats.includes(e.target)) {
    let indexS = seats.indexOf(e.target);
    let str = "";
    let sanitizedString = "";
    str = e.target.value;
    sanitizedString = str.replace(regexSeats, '');
    if (sanitizedString !== e.target.value) {
      e.target.value = sanitizedString;
      seats[indexS] = e.target;
    }
  }
});






covidPdf.addEventListener("change", (e) => {
  inputBtn.disabled = false;
});

submitBtn.addEventListener("click", (e) => {

  let classTemp = classroom.map(obj => obj.value.toUpperCase());
  let seatTemp = seats.map(obj => obj.value);




  let classText = [[]];
  let seatText = [];
  let index = 0;

  //!sanitization process for TEXT
  for (string of classTemp) {
    // for (let j = 0; j < string.length; j++) {
    //   if (string[j] == "," || string[j] == "-" && !(string[j + 1] == "-") && !(string[j + 1] == ",")) {
    //     //TODO;
    //   }
    // }
    let commaSeperatedString = string.split(",");
    let count = string.split(",").length;
    for (let i = 0; i < count; i++) {
      let splittedString = commaSeperatedString[i].split('-');
      let type = splittedString[0];
      let num = splittedString[1];
      let expectednum = parseInt(num);
      if (num == expectednum) {
        if (type.includes("ΑΜΦ")) {
          splittedString[0] = "ΑΜΦΙΘΕΑΤΡΟ";
        }
        else if (type.includes("ΑΙΘ")) {
          splittedString[0] = "ΑΙΘΟΥΣΑ";
        }
        else if (type.includes("ΕΡΓ")) {
          splittedString[0] = "ΕΡΓΑΣΤΗΡΙΟ";
        }
      }
      else {
        splittedString[0] = "";
        splittedString[1] = "";
      }
      commaSeperatedString[i] = splittedString[0] + " " + splittedString[1];

    }
    classText[index] = commaSeperatedString.toString().split(",");
    index++;
  }

  //!sanitization process for SEATS
  for (string of seatTemp) {
    let commaSeperatedString = string.split(",");
    if (commaSeperatedString[0].charAt(0) == ",") {
      commaSeperatedString[0] = commaSeperatedString[0].slice(1);
    }


    string = commaSeperatedString.join();
    seatText.push(string);
  }








  console.log(classText);
  console.log(seatText);





  let queryObject = {
    "covidList": classText,
    "seatList": seatText
  };




  const jsonQueryObject = JSON.stringify(queryObject);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const dbResult = this.responseText;
      if (dbResult != "Query failed") {
        alert("Η αίτηση έγινε επιτυχώς");
        let resultArray = dbResult.split(",");
        //console.log(resultArray);

      }
    };
  }
  xmlhttp.open("GET", "assets/backend/covid.php?results=" + jsonQueryObject, true);
  xmlhttp.send();
});




inputBtn.addEventListener("click", (e) => {
  submitBtn.disabled = false;
  submitBtn.style.backgroundColor = "#366c77";
  submitBtn.style.boxShadow = "0rem 0.7rem 1.2rem #3996a9"
});

function makeDate() {
  const DATE_DAYS = 5;
  let count = 0;
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  document.getElementById("tab1").innerHTML = day + "/" + month + "/" + year;

  for (let i = 1; i < DATE_DAYS; i++) {

    let text = document.getElementById

    if (day - count == 0) {
      date.setDate(0) //? set to the last day of previous month
      year = date.getMonth() + 1;
      day = date.getDate();
      month = date.getDate();
      document.getElementById("tab" + (i + 1)).innerHTML = (day - i) + "/" + month + "/" + year;

    }
    else {
      document.getElementById("tab" + (i + 1)).innerHTML = (day - i) + "/" + month + "/" + year;
    }
  }
}

window.onload = () => {
  submitBtn.style.backgroundColor = "grey";
  submitBtn.style.boxShadow = "grey"
  submitBtn.disabled = true;
  inputBtn.disabled = true;

  classroom.shift();  //?Remove the first element of inputs which is the covid file one- we dont need it 
  classroom.pop();  //?Remove the last element of inputs which is the text one - we dont need that either
  //*! Make two seperate lists, one containing the class and the other one the seats 



  let isSeat = false;

  for (let e of classroom) {
    if (isSeat) {
      seats.push(e);
      isSeat = false;
    } else {
      isSeat = true;
    }


  }
  classroom = classroom.filter(obj => !seats.includes(obj)); //? remove duplicates,so we only have the classroom not the seats)
  console.log(seats);
  console.log(classroom);

  makeDate();
};
