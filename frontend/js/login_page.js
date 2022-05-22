//demo class
class User {
    constructor(am, name, pass) {
        this.USER_DATA = {
            AM: am,
            NAME: name,
            PASSWORD: pass
        };
    }

    deleteData(){
        this.USER_DATA={AM:"", NAME:"",PASSWORD:""};
    }

    LogData() {
        console.log(this.USER_DATA);
    }

}

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
            window.location.href="../../NEW/Universecity/index.html";
            const result_array = dbResult.split(",");
            var newUser = new User(result_array[0], result_array[1], result_array[2]);
            if(newUser.am==="ics"){
                sessionStorage.setItem("user","student");
            }else  if(newUser.am==="iis"){
                sessionStorage.setItem("user","teacher");
            }else if(newUser.am==="dai"){
                sessionStorage.setItem("user","secretariat");
            }
            newUser.LogData();
        }else {
            console.log(dbResult);
        }
    }
}; 
xmlhttp.open("GET","../../backend/DB_retrieve.php?am="+USER_AM+"&pass="+USER_PASS,true);
xmlhttp.send();

