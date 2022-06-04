const src_links = {
// Links for secretariat 0-3
    'Αρχική': 'index.html',
    'Ωρολόγιο Πρόγραμμα': 'programma.html',
    'Ανακοινώσεις': 'announcement_creation.html',
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

function TimeDifference(current, record) {
    const diffMms = (current - record);
    const diffMins = Math.round(((diffMms % 86400000) % 3600000) / 60000);
    const diffHrs = Math.floor((diffMms % 86400000) / 3600000);
    const diffDays = Math.floor(diffMms / 86400000);
    return `${(diffDays!=0)? diffDays+"d. " : ""} ${(diffHrs!=0)? diffHrs+"h." : ""} ${(diffMins!=0)? diffMins+"m." : ""}`;
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
    
    p2.innerHTML = TimeDifference(currTime, recordTime);
    div.append(h4, p1, p2);
    li.append(div);
    return li;
}

function fillUlElement(ul, announcements) {
    const divider = document.createElement('li');
    const hr = document.createElement('hr');
    hr.setAttribute('class', 'dropdown-divider');
    divider.appendChild(hr);
    announcements.forEach(announcement => {
        const details = announcement.split(',');
        notification = { 
            'id': details[0],
            'title': details[1],
            'description': details[2],
            'time': details[3], 
            'date': details[4],
            'sender': details[5]
        };
        ul.append(createLifromNotification(notification));
        ul.append(divider);
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
    const notifications = document.querySelectorAll('.nav-link.nav-icon')[1];
    if(sessionStorage.getItem('user-class') == 'secretariat') {
        notifications.style.display = 'none';
    }else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
                const notifications = dbResult.split('/');
                UpdateUlElements(notifications);
            }
        }; 
        xmlhttp.open("GET","./assets/backend/get_announcement.php",true);
        xmlhttp.send();
        }
}

function updateProfile() {
    document.querySelector('.d-none.d-md-block.dropdown-toggle.ps-2').innerHTML = USER.FIRST_NAME[0] +'. '+USER.LAST_NAME;
    document.querySelector('.profile > .dropdown-header > h6').innerHTML = USER.FIRST_NAME + ' ' + USER.LAST_NAME;
    document.querySelector('.profile > .dropdown-header > span').innerHTML = USER.DEPARTMENT;
}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const USER = JSON.parse(urlParams.get('LoggedInUser'));
const className = urlParams.get('class');
if (className == 'Student') {
    sessionStorage.setItem('user-class', 'student');
}else if (className ==  'Teacher') {
    sessionStorage.setItem('user-class', 'teacher');
} else {
    sessionStorage.setItem('user-class', 'secretariat');
}
const href = 'index.html'+queryString;
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
updateProfile();