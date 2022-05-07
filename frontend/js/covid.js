document.getElementById("delete").addEventListener("click", refresh);

function refresh(){
      document.location.reload(true);
}

document.getElementById("submit").addEventListener("click", validate);

function validate(){
    const element = document.getElementById("ck");
    if(element.checked){
        document.getElementById("valid").innerHTML = "Η δήλωση έγινε με επιτυχία!!";

    }else{
        console.log("error");
    }
    
}




