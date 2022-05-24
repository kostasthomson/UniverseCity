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

