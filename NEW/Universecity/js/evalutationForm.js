// const selectedSub = document.querySelector(".select");
// const  radioBtns = document.querySelectorAll(".styleRadio");
// const text = document.querySelector(".textarea");
// const disabled = document.querySelector(".invalid");

// selectedSub.addEventListener('change', (e) => {
//     //clear text
//     text.value= "";
//     let  selectedValue = selectedSub.value;
    
//     //clear buttons
//     let size = radioBtns.length;
//     for(let i=0;i<size;i++)
//     {
//         radioBtns[i].checked = false;
//     }
    
//     //remove text decoration from disabled button
//     disabled.className= "";
//  });

 function fillOptions(){
    
    let array =[];

    const inputs = document.querySelectorAll("input");
    const textArea = document.querySelector("textarea");

    inputs.forEach(e => {
        if(e.checked){
            array.push(e.value);
        }
    });

    return array;
 }

 function sendRequest(){

    let options = fillOptions();

    console.log(options);

    let queryObject = {
        "subject": subject,
   
        "options": options
    };

    console.log(queryObject);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if(dbResult!="Query failed") {
            
                
                const result_array = dbResult.split(",");
                console.log(result_array);

            }else {
                console.log(dbResult);
            }
        }
    }; 
    xmlhttp.open("GET","evaluation.php?subjects="+subject+"&optradio1="+q1+"&optradio2="+q2+"&optradio3="+q3+"&optradio4="+q4+"&optradio5="+q5+"&optradio6="+q6+"&optradio7="+q7+"&optradio8="+q8+"&optradio9="+q9+"&optradio10="+q10+"&optradio11="+q11+"&optradio12="+q12+"&more_info="+text,true);
    xmlhttp.send();

 }



