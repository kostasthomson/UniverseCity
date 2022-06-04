const inputBtn = document.querySelector(".form-check-input");
const submitBtn = document.querySelector(".btn.btn-primary");
const covidPdf = document.querySelector(".form-control");
const inputs = document.querySelectorAll("input[type=text]");

const regexClass = /[^α-ω0-9,-]/gi;
const regexSeats = /[^0-9,]/g;

let classroom = Array.from(document.querySelectorAll(".form-control"));
let seats = [];



let temp = classroom.map(obj => obj.value);
let seatText = seats.map(obj => obj.value);

let classText = temp.map(element => {
  return element.toUpperCase();
});






// classroom.forEach(function (elem) {
//   elem.addEventListener("input", (e) => {
//     let str = "";
//     let sanitizedString = "";
//     str = e.target.value;
//     sanitizedString = str.replace(/[^α-ω0-9,-]/gi, '');
//     console.log(sanitizedString);
//     if (sanitizedString !== e.target.value) {
//       e.target.value = sanitizedString;
//     }
//   });
// });

seats.forEach(function (obj) {
  obj.addEventListener("input", (el) => {
    console.log("hi");
    let str = "";
    let sanitizedString = "";
    str = el.target.value;
    sanitizedString = str.replace(/[0-9,]/g, '');
    console.log(sanitizedString);
    if (sanitizedString !== e.target.value) {
      el.target.value = sanitizedString;
    }
  });
});



covidPdf.addEventListener("change", (e) => {
  inputBtn.disabled = false;
});

submitBtn.addEventListener("click", (e) => {







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
