const selectedSub = document.querySelector(".select");
const  radioBtns = document.querySelectorAll(".styleRadio");
const text = document.querySelector(".textarea");
const disabled = document.querySelector(".invalid");

selectedSub.addEventListener('change', (e) => {
    //clear text
    text.value= "";
    let  selectedValue = selectedSub.value;
    
    //clear buttons
    let size = radioBtns.length;
    for(let i=0;i<size;i++)
    {
        radioBtns[i].checked = false;
    }
    
    //remove text decoration from disabled button
    disabled.className= "";
 });

 var temp;

 function fillOptions(){
    
    let array =[];
    
    const inputs = document.querySelectorAll("input");
    
     inputs.forEach(e => {
        if(e.checked){
            array.push(e.value);
        }
    });

    return array;
 }

 function sendRequest(){

    let options = fillOptions();

    let subject = document.getElementById("subjs");
    let value = subject.options[subject.selectedIndex].value;

    const textArea = document.getElementById("textArea").value;

    // alert(options);
    // alert(value);
    // alert(textArea);

    let queryObject = {
        "subject": value,
   
        "options": options,

        "text": textArea
    };

    const jsonQueryObject = JSON.stringify(queryObject);
    // alert(jsonQueryObject);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if(dbResult!="Query failed") {
            
                alert("Η υποβολή σου έγινε επιτυχώς!");
                const result_array = dbResult.split(",");
                console.log(result_array);

            }
        }
    }; 
    // xmlhttp.open("POST","assets/backend/evaluation.php");
    // xmlhttp.send(jsonQueryObject);

    xmlhttp.open("GET","assets/backend/evaluation.php?results=" + jsonQueryObject, true);
    xmlhttp.send();
 }