class User {
    constructor(am, first_name, last_name, email, department) {
        this.AM = am;
        this.FIRST_NAME = first_name;
        this.LAST_NAME = last_name;
        this.EMAIL = email;
        this.DEPARTMENT = department;
    }
}

class Student extends User {
    constructor(am, first_name, last_name, email, department, semester, study_direction) {
        super(am, first_name, last_name, email, department);
        this.SEMESTER = semester;
        this.STUDY_DIRECTION = study_direction;
    }
}

class Teacher extends User {
    constructor(am, first_name, last_name, email, department, office, title, biolink) {
        super(am, first_name, last_name, email, department);
        this.OFFICE = office;
        this.TITLE = title;
        this.BIOLINK = biolink;
    }
}

class Secretariat extends User {
    constructor(am, first_name, last_name, email, department) {
        super(am, first_name, last_name, email, department);
    }
}

// form loading animation
const form = [...document.querySelector('.form').children];
form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i * 250);
})

const ValidAm_TableNames = {
    'ics': 'STUDENTS',
    'ait': 'TEACHERS',
    'aid': 'SECRETARIATS'
};

function LogIn() {
    const USER_AM = document.querySelector('.form > .am').value;
    if (ValidAm_TableNames[USER_AM.slice(0, 3)]) {
        const TABLE_NAME = ValidAm_TableNames[USER_AM.slice(0, 3)];
        const USER_PASS = document.querySelector('.form > .password').value;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
                if (dbResult != "Fail" && dbResult != "Unrecorded") {
                    const data = dbResult.split(",");
                    const AM = data[0];
                    const FIRST_NAME = data[1];
                    const LAST_NAME = data[2];
                    const EMAIL = data[3];
                    const DEPARTMENT = data[4];
                    let USER;
                    if (TABLE_NAME == 'STUDENTS') {
                        const SEMESTER = data[5];
                        const STUDY_DIRECTION = data[6];
                        USER = new Student(AM, FIRST_NAME, LAST_NAME, EMAIL, DEPARTMENT, SEMESTER, STUDY_DIRECTION);
                    } else if (TABLE_NAME == 'TEACHERS') {
                        const OFFICE = data[5];
                        const TITLE = data[6];
                        const BIOLINK = data[7];
                        USER = new Teacher(AM, FIRST_NAME, LAST_NAME, EMAIL, DEPARTMENT, OFFICE, TITLE, BIOLINK);
                    } else {
                        USER = new Secretariat(AM, FIRST_NAME, LAST_NAME, EMAIL, DEPARTMENT);
                    }
                    sessionStorage.setItem('user', JSON.stringify(USER));
                    sessionStorage.setItem('user-type', USER.constructor.name.toLowerCase());
                    window.location.href = "../loading.html";
                }
            }
        };
        xmlhttp.open("GET", "../assets/backend/login.php?am=" + USER_AM + "&pass=" + USER_PASS + "&tname=" + TABLE_NAME, true);
        xmlhttp.send();
    }
}


