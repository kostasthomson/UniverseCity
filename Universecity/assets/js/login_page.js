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
});

sessionStorage.clear();

for(let element of document.getElementsByTagName('input')) {
    element.addEventListener('keypress', (event) => {
        if(event.keyCode === 13) {
            ValidateInput();
        }
    })
}


function setSubjects() {
    let xmlhttp_subjects = new XMLHttpRequest();
    xmlhttp_subjects.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            sessionStorage.setItem('subjects', dbResult);
        }
    };
    const user_type = sessionStorage.getItem('user-type');
    if (user_type == 'student') {
        xmlhttp_subjects.open("GET", "assets/backend/get_enrolled_subjects.php?student_id=" + JSON.parse(sessionStorage.getItem('user')).am, true);
        xmlhttp_subjects.send();
    } else if (user_type == 'teacher') {
        xmlhttp_subjects.open("GET", "assets/backend/get_teachedby_subjects.php?teacher_id=" + JSON.parse(sessionStorage.getItem('user')).am, true);
        xmlhttp_subjects.send();
    }
}

function setSchedule() {
    let department = JSON.parse(sessionStorage.getItem('user')).department;
    let semester= JSON.parse(sessionStorage.getItem('user')).semester;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            let schedule_list = JSON.parse(dbResult);
            const translate = {
                'Δευτέρα': 'Monday',
                'Τρίτη': 'Tuesday',
                'Τετάρτη': 'Wednesday',
                'Πέμπτη': 'Thursday',
                'Παρασκευή': 'Friday',
            }
            let schedule = {
                'Δευτέρα': [],
                'Τρίτη': [],
                'Τετάρτη': [],
                'Πέμπτη': [],
                'Παρασκευή': []
            }

            Object.keys(schedule).forEach(key => {
                schedule_list.forEach(element => {
                    schedule[key].push(element[translate[key]]);
                });
            });
            sessionStorage.setItem('schedule', JSON.stringify(schedule));
        }
    };
    if(JSON.parse(sessionStorage.getItem('user')).type == 'student')
        xmlhttp.open("GET", "assets/backend/get_schedule.php?department="+department+"&semester="+ semester, true);
    else
    xmlhttp.open("GET", "assets/backend/get_schedule.php?department="+department+"&semester=0", true);
    xmlhttp.send();
}

function setUserNavListInit() {
    let NavListElements;
    switch (sessionStorage.getItem('user-type')) {
        case 'student':
            NavListElements = {
                'Αρχική': 'user_schedule.html',
                'Ωρολόγιο Πρόγραμμα': 'user_schedule.html',
                'Ανακοινώσεις': 'NotificationView.html',
                'Εξετάσεις-Βαθμολογίες': 'coming_soon.html',
                'Στατιστικά': 'coming_soon.html',
                'Δήλωση Θέσης': 'bookSeat.html',
                'Σάρωση QR': 'QrScanner.html',
                'Αξιολόγηση Καθηγητών': 'evaluation_form.html',
                'Συστατική Επιστολή': 'recommendation_letter_application.html',
                'Δήλωση Κρούσματος': 'covid_report.html',
                'Βοήθεια': 'help.html'
            };
            break;
        case 'teacher':
            NavListElements = {
                'Αρχική': 'user_schedule.html',
                'Ωρολόγιο Πρόγραμμα': 'coming_soon.html',
                'Ανακοινώσεις': 'announcement_creation.html',
                'Διαχείριση Μαθημάτων': 'coming_soon.html',
                'Εξετάσεις-Βαθμολογίες': 'coming_soon.html',
                'Προβολή Προσωπικής Αξιολόγησης': 'evaluation_results.html',
                'Συστατική Επιστολή': 'recommendation_letter.html'
            };
            break;
        case 'secretariat':
            // document.getElementById('page-content').src = 'secretariat_schedule.html';
            NavListElements = {
                'Αρχική': 'secretariat_set_schedule.html',
                'Ωρολόγιο Πρόγραμμα': 'secretariat_set_schedule.html',
                'Ανακοινώσεις': 'announcement_creation.html',
                'Διαχείριση Ενεργειών': 'coming_soon.html'
            };
            break;
    }
    sessionStorage.setItem('user_nav_list', JSON.stringify(NavListElements));
}

function setNotifications() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            sessionStorage.setItem('notifications', dbResult);// [new_notification] //ΕΔΩ ΜΠΑΙΝΕΙ DB
        }
    };
    xmlhttp.open("GET", "assets/backend/get_announcements.php", true);
    xmlhttp.send();
}

function PrintInvalid() {
    console.log('invalid');
    const div = document.createElement("div");
    div.setAttribute('class', 'Invalid-div');
    const p = document.createElement('p');
    p.setAttribute('class', 'Invalid-text');
    p.setAttribute('style', 'color: red');
    p.innerHTML = 'Αποτυχία σύνδεσης! Μη έγκυρα διαπιστευτήρια.'
    div.appendChild(p);
    document.body.insertBefore(div, document.querySelector('.toggle'));
}

function checkDataBase(credentials) {
    return new Promise(resolve => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
                if(dbResult) 
                    resolve(JSON.parse(dbResult));
                else
                    resolve(null);    
            }
        };
        xmlhttp.open("GET", "assets/backend/login.php?am=" + credentials.am + "&password=" + credentials.password + "&table=" + credentials.table, true);
        xmlhttp.send();
    });
}

async function ValidateInput() {
    const am_to_table = {
        'ics': 'STUDENTS',
        'ait': 'TEACHERS',
        'aid': 'SECRETARIATS'
    };
    const am = document.querySelector('.form > .am').value;
    const password = document.querySelector('.form > .password').value; 
    const credentials = {
        'am': am, 
        'password': password,
        'table': am_to_table[am.slice(0, 3)]
    };
    if(credentials.table) {
        let dbData = await checkDataBase(credentials);
        if(dbData) {
            dbData.type = credentials.table.slice(0,-1).toLowerCase();
            delete dbData.password;
            LogIn(dbData);
        } else {
            PrintInvalid();
        }
    } else {
        PrintInvalid();
    }
}

function LogIn(data) {
    console.log(data);
    sessionStorage.setItem('user', JSON.stringify(data));
    sessionStorage.setItem('user-type', data.type);
    setSubjects();
    setSchedule();
    setUserNavListInit();
    setNotifications();
    window.location.href = "loading.html";
}


