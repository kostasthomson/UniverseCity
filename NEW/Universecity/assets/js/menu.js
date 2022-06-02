//demo class
class User {
    constructor(am, first_name, last_name, email) {
        this.AM = am;
        this.FIRST_NAME = first_name;
        this.LAST_NAME = last_name;
        this.EMAIL = email;
    }
}

class Student extends User {
    constructor(am, first_name, last_name, email, department, semester, study_direction) {
        super(am, first_name, last_name, email);
        this.DEPARTMENT = department;
        this.SEMESTER = semester;
        this.STUDY_DIRECTION = study_direction;
    }
}

class Teacher extends User {
    constructor(am, first_name, last_name, email, office, title, biolink) {
        super(am, first_name, last_name, email);
        this.OFFICE = office;
        this.TITLE = title;
        this.BIOLINK = biolink;
    }
}

class Secretariat extends User {
    constructor(am, first_name, last_name, email, department) {
        super(am, first_name, last_name, email);
        this.DEPARTMENT = department;
    }
}

const src_links = {
// Links for secretariat 0-3
    'Αρχική': 'index.html',
    'Ωρολόγιο Πρόγραμμα': 'programma.html',
    'Ανακοινώσεις': 'anakoinoseis.html',
    'Διαχείριση Ενεργειών': 'email.html',
// Links for student 4-7
    'Αξιολόγηση Καθηγητών': 'evaluation_form.html',
    'Δήλωση Κρούσματος': 'covid_report.html',
    'Δήλωση Θέσης':'bookSeat.html',
    'Μαθήματα':'bathmoi.html',
// Links for techer 8-9
    'Προβολή Προσωπικής Αξιολόγησης':'evaluation.html',
    'Συστατική Επιστολή':'recommendation_letter.html'
};

function ChangeFrameContent(name) {
    const frame = document.getElementById('page-content');
    frame.src = src_links[name];
    frame.setAttribute('data-content-name', name);
    updatePageTitle();
}

function createListElement(element_name) {
    const li = document.createElement('li');
    li.setAttribute('class', 'nav-item');

    const a = document.createElement('a');
    a.setAttribute('class', 'nav-link');
    a.setAttribute('onclick', `ChangeFrameContent('${element_name}')`);

    const i = document.createElement('i');

    switch(element_name) {
        case 'Ωρολόγιο Πρόγραμμα':
            i.setAttribute('class', 'bi-calendar-week');
            break;
        case 'Ανακοινώσεις':
            i.setAttribute('class', 'bi bi-bell');
            break;
        case 'Στατιστικά':
            i.setAttribute('class', 'bi bi-graph-up');
            break;
        case 'Αξιολόγηση Καθηγητών':
            i.setAttribute('class', 'bi bi-person-badge');
            break;
        case 'Δήλωση Κρούσματος':
            i.setAttribute('class', 'bi bi-file-text');
            break; 
        case 'Δήλωση Θέσης':
            i.setAttribute('class', 'bi bi-calendar-week');
            break;    
        case 'Μαθήματα':
            i.setAttribute('class', 'bi bi-calendar-week');
            break; 
        
        case 'Βοήθεια':
            i.setAttribute('class', 'bi bi-info-circle');
            break; 
        
        // TEACHER
        case 'Προβολή Προσωπικής Αξιολόγησης':
            i.setAttribute('class', 'bi bi-person-badge');
            break;
        case 'Εξετάσεις-Βαθμολογίες':
            i.setAttribute('class', 'bi bi-journal-bookmark-fill');
            break; 
        case 'Συστατική Επιστολή':
            i.setAttribute('class', 'bi bi-envelope-check');
            break; 
        case 'Διαχείριση Μαθημάτων':
            i.setAttribute('class', 'bi-bookmark-check');
            break; 

        
        //SECRETARIAT
        case 'Διαχείριση Ενεργειών':
            i.setAttribute('class', 'bi bi-toggles2');
            break;      
    }
    const span = document.createElement('span');
    span.innerHTML = element_name;
    a.append(i,span);
    li.appendChild(a);
    return li;
}

function clearElementList() {
    const ul = document.getElementById('sidebar-nav');
    while(ul.childElementCount > 1) {
        ul.removeChild(ul.lastChild);
    }
}

function setUserNavList() {
    const UserNavList = sessionStorage.getItem('user_nav_list').split(',');
    const ul = document.getElementById('sidebar-nav');
    clearElementList();
    UserNavList.forEach(item => {
        ul.appendChild(createListElement(item));
    });
}

function UserNavListInit() {
    let NavListElements;
    switch(sessionStorage.getItem('user-class')) {
        case 'student':
            NavListElements = ['Ωρολόγιο Πρόγραμμα', 'Ανακοινώσεις', 'Δήλωση Θέσης', 'Εξετάσεις-Βαθμολογίες', 'Στατιστικά', 'Αξιολόγηση Καθηγητών', 'Δήλωση Κρούσματος', 'Βοήθεια'];
            break;
        case 'teacher':
            NavListElements = ['Ωρολόγιο Πρόγραμμα', 'Ανακοινώσεις', 'Διαχείριση Μαθημάτων', 'Εξετάσεις-Βαθμολογίες', 'Προβολή Προσωπικής Αξιολόγησης','Συστατική Επιστολή'];
            break;
        case 'secretariat':
            NavListElements = ['Ωρολόγιο Πρόγραμμα', 'Ανακοινώσεις', 'Διαχείριση Ενεργειών'];
            break;
    }
    sessionStorage.setItem('user_nav_list', NavListElements);
}


function changeUser(button) {
    let newUser = button.getAttribute('data-user');
    if(newUser != sessionStorage.getItem('user-class')) {
        let currUser = new User(['test_am', 'test_name', 'test_pass']);
        sessionStorage.setItem('user', JSON.stringify(currUser))
        sessionStorage.setItem('user-class', newUser);
        UserNavListInit();
        setUserNavList();
        updateNotifications();
    }
}

function setUpButtons() {
    let footer = document.getElementById('footer');
    let div = document.createElement('div');
    div.setAttribute('id', 'login-buttons');
    let users = ['student', 'teacher', 'secretariat'];
    users.forEach(user => {
        let button = document.createElement('button');
        button.setAttribute('id', user+'-button');
        button.setAttribute('onclick', 'changeUser(this)');
        button.setAttribute('data-user', user);
        button.innerHTML = 'Login as '+user;
        div.appendChild(button);
    })
    footer.appendChild(div);
}

function updatePageTitle() {
    const frame = document.getElementById('page-content');
    const frame_name = frame.getAttribute('data-content-name');
    const pagetitle_header = document.getElementById('pagetitle-header');
    const last_ol_child = document.getElementsByClassName('breadcrumb-item')[1];
    pagetitle_header.innerHTML = frame_name;
    last_ol_child.innerHTML = frame_name;
}

function createLifromNotification(notification) {
    const li = document.createElement('li');
    li.setAttribute('id', notification.id);
    li.setAttribute('class', 'notification-item');
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    h4.innerHTML = notification.title;
    const p1 = document.createElement('p');
    p1.innerHTML = notification.description;
    const p2 = document.createElement('p');

    const year = parseInt(notification.date.split('-')[0]);
    const month = parseInt(notification.date.split('-')[1])-1;
    const day = parseInt(notification.date.split('-')[2]);
    const hour = parseInt(notification.time.split(':')[0]);
    const minute = parseInt(notification.time.split(':')[1]);

    const currTime = new Date();
    const recordTime = new Date(year, month, day, hour, minute);

    const diffMms = (currTime - recordTime);
    const diffHrs = Math.floor((diffMms % 86400000) / 3600000);
    const diffMins = Math.round(((diffMms % 86400000) % 3600000) / 60000);

    p2.innerHTML = `${(diffHrs!=0)? diffHrs+"hrs." : ""} ${diffMins} mins.`;
    div.append(h4, p1, p2);
    li.append(div);
    return li;
}

function fillUlElement(ul, announcements) {
    const divider = document.createElement('li');
    const hr = document.createElement('hr');
    hr.setAttribute('class', 'dropdown-divider');
    divider.appendChild(hr);
    // let max_nots = 4;
    // let i = 0;
    announcements.forEach(announcement => {
        // if(i < 4) {
        const details = announcement.split(',');
        notification = { 
            'id': details[0],
            'title': details[1],
            'description': details[2],
            'time': details[3], 
            'date': details[4],
            'sender': details[5]
        };
        // if(sessionStorage.getItem('user-class') == 'teacher') {
        //     if(notification.sender == 'S') {
        //         ul.append(createLifromNotification(notification));        
        //     }
        // } else {
        ul.append(createLifromNotification(notification));
        // }
        ul.append(divider);
        // i++;
        // }
    });
    const footer = document.createElement('li');
    footer.setAttribute('class', 'dropdown-footer');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#'); 
    anchor.innerHTML = 'Show all notifications';
    footer.append(anchor);
    ul.append(footer);
}

function UpdateUlElements(notifications) {
    let notification_list = document.querySelector('.notifications');
    fillUlElement(notification_list,notifications.slice(-4).reverse());
}

function updateNotifications() {
    // const notifications = document.querySelectorAll('.nav-link.nav-icon')[1];
    // if(sessionStorage.getItem('user-class') == 'secretariat') {
    //     notifications.style.display = 'none';
    // }else {
    //     if(notifications.style.display == 'none'){
    //         notifications.style.display = 'inline-block';
    //     }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            const notifications = dbResult.split('|');
            UpdateUlElements(notifications);
        }
    }; 
    xmlhttp.open("GET","./assets/backend/get_announcement.php",true);
    xmlhttp.send();
    // }
}

window.onload = () => {
    if(window.location.search) {
        const queryString = window.location.search;
        sessionStorage.setItem('url-query', queryString);
    }
}

const urlParams = new URLSearchParams(sessionStorage.getItem('url-query'));
const AM = urlParams.get('AM');
const FIRST_NAME = urlParams.get('FIRST_NAME');
const LAST_NAME = urlParams.get('LAST_NAME');
const EMAIL = urlParams.get('EMAIL');
let USER;
if(AM.slice(0,3) == 'ics') { 
    const DEPARTMENT = urlParams.get('DEPARTMENT');
    const SEMESTER = urlParams.get('SEMESTER');
    const STUDY_DIRECTION = urlParams.get('STUDY_DIRECTION');
    USER = new Student(AM, FIRST_NAME, LAST_NAME, EMAIL, DEPARTMENT, SEMESTER, STUDY_DIRECTION);
}else if(AM.slice(0,3) == 'ait') { 
    const OFFICE = urlParams.get('OFFICE');
    const TITLE = urlParams.get('TITLE');
    const BIOLINK = urlParams.get('BIOLINK');
    USER = new Teacher(AM, FIRST_NAME, LAST_NAME, EMAIL, OFFICE, TITLE, BIOLINK);
}else {
    const DEPARTMENT = urlParams.get('DEPARTMENT');
    USER = new Secretariat(AM, FIRST_NAME, LAST_NAME, EMAIL, DEPARTMENT);
}
console.log(USER);
sessionStorage.setItem('user', JSON.stringify(USER));
switch(USER.AM.slice(0,3)) {
    case 'ics':
        sessionStorage.setItem('user-class', 'student');
        break;
    case 'ait':
        sessionStorage.setItem('user-class', 'teacher');
        break;
    case 'aid':
        sessionStorage.setItem('user-class', 'secretariat');
        break;
}
const href = 'index.html'+sessionStorage.getItem('url-query');
const logo_anchor = document.querySelector('.logo');
logo_anchor.href = href;
const sidebar_list_anchor = document.querySelectorAll('.nav-link')[3];
sidebar_list_anchor.href = href;
const breadcrumb_list_anchor = document.querySelectorAll('.breadcrumb-item')[0].children[0];
breadcrumb_list_anchor.href = href;

// setUpButtons();
UserNavListInit();
setUserNavList();
updatePageTitle();
updateNotifications();