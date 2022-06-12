


function button_print() {

  setTimeout(function(){
    document.getElementById("hide-title").style.display = "none";
    document.getElementById("hide-div").style.display = "none";
    document.getElementById("card_id").style.left = "0%";

    window.print();

    document.getElementById("card_id").style.left = "25%"; 
    document.getElementById("hide-div").style.display = "block";
    document.getElementById("hide-title").style.display = "block";
  },300);
}