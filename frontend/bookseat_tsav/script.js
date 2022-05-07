const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied )');
const count = document.getElementById('count');
const total = document.getElementById('total');
const warning = document.getElementById('warning');
const lesson = document.getElementById("lesson").value;











function updateSelectedSeatCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    
    
    //copy selected seats into arr
    // map through array
    //return new array of indexes
    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    });
   
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex),'true');
    const selectedCount = selectedSeats.length;
    
    if(selectedCount > 1) {
        warning.innerText = "Warning! You have selected more than 1 seat";
    }
    else{
        warning.innerText = "";
    }
    count.innerText = selectedCount; 
}

function updateUIfromLocStor(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
        }
    });
    }
}

container.addEventListener('click',(e) => {
    if(e.target.classList.contains('seat') && !(e.target.classList.contains('occupied')) && !(e.target.classList.contains('forbidden'))){
        e.target.classList.toggle('selected');
    }
 

        updateSelectedSeatCount();
        
        
});
   
function reloadFunc(){
   localStorage.setItem('myItem',lesson);
    if(lesson !== null){
        window.location.reload();
        if (localStorage.getItem('myItem')) {
            document.getElementById("selectedItem").options[localStorage.getItem('selectedItem')].selected = true;
        }
        
      
        
        
        
} 
}

   
   
   
   
   
   
   
   
   
   
   
   
   
   
  