function onScanSuccess(qrCodeMessage) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            document.getElementById("response").innerHTML = dbResult;
            location.replace("QrCodeCorrect.html");
        }
    };

    xmlhttp.open("GET", "assets/backend/qrCode.php?student_pass_id=" + qrCodeMessage, true);
    xmlhttp.send();
}

function onScanError(errorMessage) {
    location.replace("QrCodeFail.html");
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
    fps: 1,
    qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess, onScanError);
