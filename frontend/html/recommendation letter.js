function pdf(){
    var source = window.document.getElementsByTagName("body")[0];
    var doc = new jsPDF({
        orientation: 'landscape'
    });
    doc.setFont("courier");
    doc.setFontType("normal");
    doc.setFontSize(24);
    doc.setTextColor(100);
    doc.fromHTML(elementHTML, 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });
}


