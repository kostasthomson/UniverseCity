//demo class
class User {
    constructor(am, name, pass) {
        this.USER_DATA = {
            AM: am,
            NAME: name,
            PASSWORD: pass
        };
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
const BUTTON = document.getElementsByName('button');
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const dbResult = this.responseText;
        if(dbResult!="Done" && dbResult!="not a registered user") {
            const result_array = dbResult.split(",", 3);
            const newUser = new User(result_array[0], result_array[1], result_array[2]);
            newUser.LogData();
        }
    }
}; 
xmlhttp.open("GET","/backend/THOMSON/DB_retrieve.php?am="+USER_AM+"&pass="+USER_PASS,true);
xmlhttp.send();
