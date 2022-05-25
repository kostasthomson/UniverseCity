function onScanSuccess(qrCodeMessage) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const dbResult = this.responseText;
      console.log(dbResult);
      
    }
  };
  xmlhttp.open("GET","assets/backend/qrCode.php?student_pass_id=" + qrCodeMessage,true);
  xmlhttp.send();

  //If it isn't "undefined" and it isn't "null", then it exists.
}
function onScanError(errorMessage) {
  //handle scan error
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess, onScanError);
