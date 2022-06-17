function button_print() {

  //Timeout function
  setTimeout(function(){

    //Αλλαγές στο στυλ των div για την σωστή θέση τους στην εκτύπωση
    document.getElementById("hide-title").style.display = "none";
    document.getElementById("hide-div").style.display = "none";
    document.getElementById("card_id").style.left = "0%";
    //---//

    window.print(); //Μέθοδος για εκτύπωση

    //Περαιτέρω αλλαγές στο στυλ των div για την επαναφορά τους στην αρχική θέση τους
    document.getElementById("card_id").style.left = "25%"; 
    document.getElementById("hide-div").style.display = "block";
    document.getElementById("hide-title").style.display = "block";
    //---//

  },300);
  //---//

  //onafterprint function
  window.onafterprint = function(){

    //Δήλωση μεταβλητών για τα δεδομένα από το session storage
    const user = JSON.parse(sessionStorage.getItem("user"));
    //---//

    //Επιλογή του element με id "textName"
    let textName = document.querySelector("#textName");
    //---//

    //Επιλογή του χαρακτηριστικού "pseudo-id" του element textName
    let li_item_id = textName.getAttribute('pseudo-id');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            let result_array = dbResult.split(",");

            if (dbResult != "Query failed") {
              
                alert("Η συστατική επιστολή κατέβηκε επιτυχώς!");
                window.location.reload(true);
            }
        };
    }
    xmlhttp.open("GET", "../backend/recommendation_letter_delete_application.php?stud_am=" + li_item_id + "&teac_am=" + user.AM, true);
    xmlhttp.send();
  }
  //---//
}