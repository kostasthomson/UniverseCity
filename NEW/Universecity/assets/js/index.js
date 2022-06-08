function ChangeFrameContent(name) {
    if(JSON.parse(sessionStorage.getItem('user_nav_list'))[name]) {
        const frame = document.getElementById('page-content');
        if(frame.getAttribute('data-content-name') != name) {
            frame.src = JSON.parse(sessionStorage.getItem('user_nav_list'))[name];
            frame.setAttribute('data-content-name', name);
            updateContentTitle();
        }
    }
}

function createListElement(element_name) {
    const li = document.createElement('li');
    li.setAttribute('class', 'nav-item');

    const a = document.createElement('a');
    a.setAttribute('class', 'nav-link');
    a.setAttribute('onclick', `ChangeFrameContent('${element_name}')`);

    const i = document.createElement('i');

    switch (element_name) {
        case 'Αρχική':
            i.setAttribute('class', 'bi bi-house-fill');
            break;
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
        case 'Συστατική Επιστολή':
            i.setAttribute('class', 'bi bi-envelope-check');
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
    a.append(i, span);
    li.appendChild(a);
    return li;
}

function clearElementList() {
    const ul = document.getElementById('sidebar-nav');
    while (ul.childElementCount > 1) {
        ul.removeChild(ul.lastChild);
    }
}

function setUserNavList() {
    const UserNavList = JSON.parse(sessionStorage.getItem('user_nav_list'));
    const ul = document.getElementById('sidebar-nav');
    clearElementList();
    Object.keys(UserNavList).forEach(key => {
        ul.appendChild(createListElement(key));
    });
}

function UserNavListInit() {
    let NavListElements;
    switch (sessionStorage.getItem('user-type')) {
        case 'student':
            NavListElements = {
                'Αρχική': 'user_schedule.html',
                'Ωρολόγιο Πρόγραμμα': 'user_schedule.html',
                'Ανακοινώσεις': 'notification-view.html',
                'Δήλωση Θέσης': 'bookSeat.html' ,
                'Εξετάσεις-Βαθμολογίες': '',
                'Στατιστικά': '', 
                'Αξιολόγηση Καθηγητών': 'evaluation_form.html',
                'Συστατική Επιστολή': 'recommendation_letter_application.html',
                'Δήλωση Κρούσματος': 'covid_report.html',
                'Βοήθεια': 'help.html'
            };
            break;
        case 'teacher':
            NavListElements = {
                'Αρχική': 'user_schedule.html',
                'Ωρολόγιο Πρόγραμμα': '',
                'Ανακοινώσεις': 'notification-view.html',
                'Διαχείριση Μαθημάτων': '',
                'Εξετάσεις-Βαθμολογίες': '',
                'Προβολή Προσωπικής Αξιολόγησης': 'evaluation_results.html',
                'Συστατική Επιστολή': 'recommendation_letter.html'
            };
            break;
        case 'secretariat':
            document.getElementById('page-content').src = 'secretariat_schedule.html';
            NavListElements = {
                'Αρχική': 'secretariat_schedule.html',
                'Ωρολόγιο Πρόγραμμα': 'secretariat_schedule.html',
                'Ανακοινώσεις': 'announcement_creation.html',
                'Διαχείριση Ενεργειών': ''
            };
            break;
    }
    sessionStorage.setItem('user_nav_list', JSON.stringify(NavListElements));
}

function updateContentTitle() {
    const frame = document.getElementById('page-content');
    const frame_name = frame.getAttribute('data-content-name');
    const pagetitle_header = document.getElementById('pagetitle-header');
    pagetitle_header.innerHTML = frame_name;
    if(frame_name != 'Αρχική') {
        let last_ol_child = document.getElementsByClassName('breadcrumb-item')[1];
        if(!last_ol_child) {
            last_ol_child = document.createElement('li');
            last_ol_child.setAttribute('class', 'breadcrumb-item active');
            document.querySelector('.breadcrumb').appendChild(last_ol_child);
        }
        last_ol_child.innerHTML = frame_name;
    } else {
        document.querySelector('.breadcrumb').removeChild(document.querySelector('.breadcrumb').lastChild);
    }
}

function TimeDifference(current, record) {
    const diffMms = (current - record);
    const diffMins = Math.round(((diffMms % 86400000) % 3600000) / 60000);
    const diffHrs = Math.floor((diffMms % 86400000) / 3600000);
    const diffDays = Math.floor(diffMms / 86400000);
    return `${(diffDays != 0) ? diffDays + "d. " : ""} ${(diffHrs != 0) ? diffHrs + "h." : ""} ${(diffMins != 0) ? diffMins + "m." : ""}`;
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
    const month = parseInt(notification.date.split('-')[1]) - 1;
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
    fillUlElement(notification_list, notifications.slice(-4).reverse());
}

function updateNotifications() {
    const notifications = document.querySelectorAll('.nav-link.nav-icon')[1];
    if (sessionStorage.getItem('user-type') == 'secretariat') {
        notifications.style.display = 'hidden';
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
                const notifications = dbResult.split('/');
                UpdateUlElements(notifications);
            }
        };
        xmlhttp.open("GET", "./assets/backend/get_announcement.php", true);
        xmlhttp.send();
    }
}

function updateProfile() {
    const USER = JSON.parse(sessionStorage.getItem('user'));
    document.querySelector('.d-none.d-md-block.dropdown-toggle.ps-2').innerHTML = USER.FIRST_NAME[0] + '. ' + USER.LAST_NAME;
    document.querySelector('.profile > .dropdown-header > h6').innerHTML = USER.FIRST_NAME + ' ' + USER.LAST_NAME;
    document.querySelector('.profile > .dropdown-header > span').innerHTML = USER.DEPARTMENT;
}

function setSubjects() {
    let xmlhttp_subjects = new XMLHttpRequest();
    xmlhttp_subjects.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            subjects = dbResult.split(",");
            sessionStorage.setItem('subjects', JSON.stringify(subjects));
        }
    };
    const user_type = sessionStorage.getItem('user-type');
    if(user_type == 'student') {
        xmlhttp_subjects.open("GET","assets/backend/get_enrolled_subjects.php?student_id="+JSON.parse(sessionStorage.getItem('user')).AM,true);
        xmlhttp_subjects.send();
    } else if(user_type == 'teacher') {
        xmlhttp_subjects.open("GET","assets/backend/get_teachedby_subjects.php?teacher_id"+JSON.parse(sessionStorage.getItem('user')).AM,true);
        xmlhttp_subjects.send();
    }
}

if(!sessionStorage.getItem('user') && !sessionStorage.getItem('user-type')) {
    window.location.href = 'Login_Page.html';
} else {
    setSubjects();
    UserNavListInit();
    setUserNavList();
    updateContentTitle();
    updateNotifications();
    updateProfile();
}