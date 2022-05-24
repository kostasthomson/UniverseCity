// form loading animation
const form = [...document.querySelector('.form').children];
form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*250);
})

// form validation  
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const USER_AM = urlParams.get('am');
const USER_PASS = urlParams.get('pass');
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const dbResult = this.responseText;
        if(dbResult!="Fail" && dbResult!="Unrecorded") {
            window.location.href = "../loading.html?login_data="+dbResult;
            // window.location.replace("../loading.html?login_data="+dbResult);
        }
    }
}; 
xmlhttp.open("GET","../assets/backend/DB_retrieve.php?am="+USER_AM+"&pass="+USER_PASS,true);
xmlhttp.send();

