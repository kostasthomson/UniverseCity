const selectedSub = document.querySelector(".select");
const  radioBtns = document.querySelectorAll(".styleRadio");
const text = document.querySelector(".textarea");

selectedSub.addEventListener('change', (e) => {
    //clear text
    text.value= "";
    let  selectedValue = selectedSub.value;
    
    
    for(let i=0;i<radioBtns.length;i++)
    {
        radioBtns[i].checked = false;
    }
    

    
   
      
    
    
    console.log("Selected: " + selectedValue);
    console.log("gama8");
 });

