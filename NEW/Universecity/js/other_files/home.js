
   
const greeting = document.querySelector('.greeting');
document.getElementById("logo-btn").addEventListener("click", clickOnLogo);

window.onload = () => {
    if(sessionStorage.name){
        location.href = 'login.html';
    } else{
        greeting.innerHTML = `hello ${sessionStorage.name}`;
    }
}

function clickOnLogo(){
    location.href = 'login.html';
}

function test(){
    const visible = document.getElementById("Notifications").style.visibility
    if (visible == "" || visible == "hidden") {
        document.getElementById("Notifications").style.visibility = "visible"
        document.getElementById("Notifications").style.transition = "opacity 2s linear";  
    } else {
        document.getElementById("Notifications").style.visibility = "hidden";
    }
}


const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}