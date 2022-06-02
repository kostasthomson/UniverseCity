// form loading animation
const form = [...document.querySelector('.form').children];
form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*250);
})

const valid_user_am = ['ics', 'aid', 'ait'];
const table_names = ['STUDENTS', 'SECRETARIATS', 'TEACHERS'];
function LogIn() {
    const USER_AM = document.querySelector('.form > .am').value;
    if(valid_user_am.includes(USER_AM.slice(0,3))) {
        const TABLE_NAME = table_names[valid_user_am.indexOf(USER_AM)];
        const USER_PASS = document.querySelector('.form > .password').value;
        console.log(USER_AM, TABLE_NAME, USER_PASS);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
                if(dbResult!="Fail" && dbResult!="Unrecorded") {
                    window.location.href = "../loading.html?login_data="+dbResult;
                }
            }
        }; 
        xmlhttp.open("GET","../assets/backend/DB_retrieve.php?am="+USER_AM+"&pass="+USER_PASS+"&tname="+TABLE_NAME,true);
        xmlhttp.send();
    }
}


