var students = {
  "ics2111": {studentGrade: 7, lesson: "MethamaticI" },
  "ics2112": {studentGrade: 8, lesson: "MathematicII" },
  "ics2113": {studentGrade: 7, lesson: "Statistics" },
  "ics2114": {studentGrade: 6, lesson: "MethamaticI" },
  "ics2115": {studentGrade: 5, lesson: "MathematicII" },
  "ics2116": {studentGrade: 8, lesson: "Statistics" },
  "ics2117": {studentGrade: 9, lesson: "MethamaticI" },
  "ics2118": {studentGrade: 3, lesson: "Statistics" },
  "ics2119": {studentGrade: 6, lesson: "Statistics" },
  "ics2120": {studentGrade: 1, lesson: "MathematicII" },
  "ics2121": {studentGrade: 3, lesson: "MethamaticI" },
  "http://en.m.wikipedia.org": {studentGrade: 7, lesson: "Statistics" },
}

function onScanSuccess(qrCodeMessage) {
  document.getElementById("result").innerHTML =
    '<span class="result">' + qrCodeMessage + "</span>";
  console.log(qrCodeMessage);
  //If it isn't "undefined" and it isn't "null", then it exists.
  if (qrCodeMessage in students) {
    console.log(students[qrCodeMessage].studentGrade)
    alert("Element exists");
  } else {
    alert("Element does not exist");
  }
}
function onScanError(errorMessage) {
  //handle scan error
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess, onScanError);
