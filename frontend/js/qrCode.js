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

function onScanSuccess(qrCodeMessage) {
  document.getElementById("result").innerHTML =
    '<span class="result">' + qrCodeMessage + "</span>";
  console.log(document.getElementById("result").innerHTML);
  var element = document.getElementById("result");
  //If it isn't "undefined" and it isn't "null", then it exists.
  console.log(students.includes("ics2121"));
  if (students.includes("ics2121")) {
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
