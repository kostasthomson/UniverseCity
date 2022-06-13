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

  window.onafterprint = function(){

    const user = JSON.parse(sessionStorage.getItem("user"));

    console.log(user);
    let textName = document.querySelector("#textName");

    let li_item_id = textName.getAttribute('pseudo-id');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            let result_array = dbResult.split(",");

            if (dbResult != "Query failed") {
              
                alert("Η αίτηση έγινε επιτυχώς");
                window.location.reload(true);
            }
        };
    }
    xmlhttp.open("GET", "assets/backend/recommendation_letter_delete_application.php?stud_am=" + li_item_id + "&teac_am=" + user.AM, true);
    xmlhttp.send();
  }
}