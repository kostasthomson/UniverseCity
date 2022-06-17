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


for(let element of document.getElementsByTagName('input')) {
    element.addEventListener('keypress', (event) => {
        if(event.keyCode === 13) {
            LogIn();
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
        xmlhttp_subjects.open("GET", "assets/backend/get_enrolled_subjects.php?student_id=" + JSON.parse(sessionStorage.getItem('user')).AM, true);
        xmlhttp_subjects.send();
    } else if (user_type == 'teacher') {
        xmlhttp_subjects.open("GET", "assets/backend/get_teachedby_subjects.php?teacher_id=" + JSON.parse(sessionStorage.getItem('user')).AM, true);
        xmlhttp_subjects.send();
    }
}

function setSchedule() {
    let department = JSON.parse(sessionStorage.getItem('user')).DEPARTMENT;
    let semester= JSON.parse(sessionStorage.getItem('user')).SEMESTER;
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
    xmlhttp.open("GET", "assets/backend/get_schedule.php?user_type="+sessionStorage.getItem('user_type')+"&department="+department+"&semester="+semester, true);
    xmlhttp.send();
}

function setUserNavListInit() {
    let NavListElements;
    switch (sessionStorage.getItem('user-type')) {
        case 'student':
            NavListElements = {
                'Αρχική': 'user_schedule.html',
                'Ωρολόγιο Πρόγραμμα': 'user_schedule.html',
                'Ανακοινώσεις': 'notification_view.html',
                'Εξετάσεις-Βαθμολογίες': 'coming_soon.html',
                'Στατιστικά': 'student_statistics.html',
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
                'Αρχική': 'secretariat_schedule.html',
                'Ωρολόγιο Πρόγραμμα': 'secretariat_schedule.html',
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
                    setSubjects();
                    setSchedule();
                    setUserNavListInit();
                    setNotifications();
                    window.location.href = "loading.html";
                }
            }
        };
        xmlhttp.open("GET", "assets/backend/login.php?am=" + USER_AM + "&pass=" + USER_PASS + "&tname=" + TABLE_NAME, true);
        xmlhttp.send();
    }
}


