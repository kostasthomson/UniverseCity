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
<<<<<<< Updated upstream
        const TABLE_NAME = table_names[valid_user_am.indexOf(USER_AM.slice(0,3))]; // USER_AM alone didn't work
=======
        const TABLE_NAME = table_names[valid_user_am.indexOf(USER_AM.slice(0,3))];
>>>>>>> Stashed changes
        const USER_PASS = document.querySelector('.form > .password').value;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
                if(dbResult!="Fail" && dbResult!="Unrecorded") {
                    console.log(dbResult);
                    const data = dbResult.split(",");
                    let queryResutls;
                    if(TABLE_NAME == 'STUDENTS') {
                        queryResutls = "?AM="+data[0]+"&FIRST_NAME="+data[1]+"&LAST_NAME="+data[2]+"&EMAIL="+data[3]+"&DEPARTMENT="+data[4]+"&SEMESTER="+data[5]+"&STUDY_DIRECTION="+data[6];
                    } else if (TABLE_NAME == 'TEACHERS') {
                        queryResutls = "?AM="+data[0]+"&FIRST_NAME="+data[1]+"&LAST_NAME="+data[2]+"&EMAIL="+data[3]+"&OFFICE="+data[4]+"&TITLE="+data[5]+"&BIOLINK="+data[6];
                    } else {
                        queryResutls = "?AM="+data[0]+"&FIRST_NAME="+data[1]+"&LAST_NAME="+data[2]+"&EMAIL="+data[3]+"&DEPARTMENT="+data[4];
                    }
                    window.location.href = "../loading.html"+queryResutls;
                }
            }
        }; 
        xmlhttp.open("GET","../assets/backend/DB_retrieve.php?am="+USER_AM+"&pass="+USER_PASS+"&tname="+TABLE_NAME,true);
        xmlhttp.send();
    }
}


