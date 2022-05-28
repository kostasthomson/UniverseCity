function genPDF() {
	
    var doc = new jsPDF();          
    var elementHandler = {
    '#ignorePDF': function (element, renderer) {
        return true;
        }
    };
    var source = window.document.getElementsByTagName("body")[0];
    doc.fromHTML(
        source,
        15,
        15,
        {
        'width': 180,'elementHandlers': elementHandler
        });

    doc.save('test.pdf');
	
}


const slideValue = document.querySelector("span");
      const inputSlider = document.querySelector("input[type=range]");
      inputSlider.oninput = (()=>{
        let value = inputSlider.value;
        slideValue.textContent = value;
        slideValue.style.left = (value*21) + "%";
        slideValue.classList.add("show");
      });
      inputSlider.onblur = (()=>{
        slideValue.classList.remove("show");
      });
    