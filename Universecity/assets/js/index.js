function updateFrameProfile() {
    const frame = document.getElementById('page-content');
    frame.src = 'users-profile.html';
    frame.setAttribute('data-content-name', "Προφίλ");
}

function checkSource(frame) {
    if(frame.getAttribute('data-content-name') == 'Ωρολόγιο Πρόγραμμα') {
        updateScheduleButton(true);
    }
}

function ChangeFrameContent(name) {
    if (JSON.parse(sessionStorage.getItem('user_nav_list'))[name]) {
        const frame = document.getElementById('page-content');
        if(frame.getAttribute('data-content-name') != name) {
            let link = JSON.parse(sessionStorage.getItem('user_nav_list'))[name];
            if(frame.getAttribute('src') != link) {
                frame.src = link;
            }
            frame.setAttribute('data-content-name', name);
            updateContentTitle();
        }
    }
}

function updateScheduleButton(value){
    let frame = window.main_iframe.document;
    let frame_body = frame.querySelector('.card-body');
    if(value) {
        if(!frame.querySelector('.group')) {
            let div = document.createElement("div");
            div.setAttribute('class', 'group');
            div.setAttribute('role', 'group');
            div.setAttribute('aria-label', 'Basic outlined example');
    
            let cancel = document.createElement('button');
            cancel.setAttribute('type', 'button');
            cancel.setAttribute('class', 'myButtons');
            cancel.setAttribute('onclick', 'cancel()');
            cancel.innerHTML = 'Ακύρωση';
    
            let edit = document.createElement('button');
            edit.setAttribute('type', 'button');
            edit.setAttribute('class', 'myButtons');
            edit.setAttribute('onclick', 'edit()');
            edit.innerHTML = 'Επεξεργασία';
    
            let save = document.createElement('button');
            save.setAttribute('type', 'button');
            save.setAttribute('class', 'myButtons');
            save.setAttribute('onclick', 'save()');
            save.innerHTML = 'Αποθήκευση';
    
            div.append(cancel, edit, save);
            frame_body.appendChild(div);
        }
    } else {
        if(frame.querySelector('.group')) {
            frame_body.removeChild(frame_body.lastChild);
        }
    }
}

function createListElement(element_name) {
    const li = document.createElement('li');
    li.setAttribute('class', 'nav-item');

    const a = document.createElement('a');
    a.setAttribute('class', 'nav-link');
    let str = '';
    if(element_name == 'Ωρολόγιο Πρόγραμμα') {
        str =  `,updateScheduleButton(${true})`;
    } else if (element_name == 'Αρχική') {
        str = `,updateScheduleButton(${false})`;
    }
    a.setAttribute('onclick', `ChangeFrameContent('${element_name}')` + str);

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
        case 'Σάρωση QR':
            i.setAttribute('class', 'bx bx-qr-scan');
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

function updateContentTitle() {
    const frame = document.getElementById('page-content');
    const frame_name = frame.getAttribute('data-content-name');
    const pagetitle_header = document.getElementById('pagetitle-header');
    pagetitle_header.innerHTML = frame_name;
    if (frame_name != 'Αρχική') {
        let last_ol_child = document.getElementsByClassName('breadcrumb-item')[1];
        if (!last_ol_child) {
            last_ol_child = document.createElement('li');
            last_ol_child.setAttribute('class', 'breadcrumb-item active');
            document.querySelector('.breadcrumb').appendChild(last_ol_child);
        }
        last_ol_child.innerHTML = frame_name;
    } else {
        document.querySelector('.breadcrumb').removeChild(document.querySelector('.breadcrumb').lastChild);
    }
}

// function TimeDifference(current, record) {
//     const diffMms = (current - record);
//     const diffMins = Math.round(((diffMms % 86400000) % 3600000) / 60000);
//     const diffHrs = Math.floor((diffMms % 86400000) / 3600000);
//     const diffDays = Math.floor(diffMms / 86400000);
//     return `${(diffDays != 0) ? diffDays + "d. " : ""} ${(diffHrs != 0) ? diffHrs + "h." : ""} ${(diffMins != 0) ? diffMins + "m." : ""}`;
// }

// function createLifromNotification(notification) {
//     const li = document.createElement('li');
//     const hr = document.createElement('hr');
//     li.setAttribute('id', notification.id);
//     li.setAttribute('class', 'notification-item');
//     hr.setAttribute('class', 'dropdown-divider');
//     li.appendChild(hr);
//     const div = document.createElement('div');
//     const h4 = document.createElement('h4');
//     h4.innerHTML = notification.title;
//     const p1 = document.createElement('p');
//     p1.innerHTML = notification.description;
//     const p2 = document.createElement('p');

//     const year = parseInt(notification.date.split('-')[0]);
//     const month = parseInt(notification.date.split('-')[1]) - 1;
//     const day = parseInt(notification.date.split('-')[2]);
//     const hour = parseInt(notification.time.split(':')[0]);
//     const minute = parseInt(notification.time.split(':')[1]);
//     const currTime = new Date();
//     const recordTime = new Date(year, month, day, hour, minute);

//     p2.innerHTML = TimeDifference(currTime, recordTime);
//     div.append(h4, p1, p2);
//     li.append(div);
//     return li;
// }

// function fillUlElement(ul, announcements) {
//     const divider = document.createElement('li');
//     const hr = document.createElement('hr');
//     divider.setAttribute('class', 'notification-item');
//     hr.setAttribute('class', 'dropdown-divider');
//     divider.appendChild(hr);
//     announcements.forEach(announcement => {
//         const details = announcement.split(',');
//         notification = {
//             'id': details[0],
//             'title': details[1],
//             'description': details[2],
//             'time': details[3],
//             'date': details[4],
//             'sender': details[5]
//         };
//         ul.append(createLifromNotification(notification));
//         ul.append(divider);
//     });
//     const footer = document.createElement('li');
//     footer.setAttribute('class', 'dropdown-footer');
//     const anchor = document.createElement('a');
//     anchor.setAttribute('href', '#');
//     anchor.innerHTML = 'Show all notifications';
//     footer.append(anchor);
//     ul.append(footer);
// }

// function UpdateUlElements(notifications) {
//     let notification_list = document.querySelector('.notifications');
//     fillUlElement(notification_list, notifications.slice(-4).reverse());
// }

// function updateNotifications() {
//     const notifications = document.querySelectorAll('.nav-link.nav-icon')[1];
//     if (sessionStorage.getItem('user-type') == 'secretariat') {
//         notifications.style.display = 'hidden';
//     } else {
//         var xmlhttp = new XMLHttpRequest();
//         xmlhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 const dbResult = this.responseText;
//                 const notifications = dbResult.split('/');
//                 UpdateUlElements(notifications);
//             }
//         };
//         xmlhttp.open("GET", "./assets/backend/get_announcement.php", true);
//         xmlhttp.send();
//     }
// }

function updateProfile() {
    const USER = JSON.parse(sessionStorage.getItem('user'));
    document.querySelector('.d-none.d-md-block.dropdown-toggle.ps-2').innerHTML = USER.FIRST_NAME[0] + '. ' + USER.LAST_NAME;
    document.querySelector('.profile > .dropdown-header > h6').innerHTML = USER.FIRST_NAME + ' ' + USER.LAST_NAME;
    document.querySelector('.profile > .dropdown-header > span').innerHTML = USER.DEPARTMENT;
}

if (!sessionStorage.getItem('user') && !sessionStorage.getItem('user-type')) {
    window.location.href = 'Login_Page.html';
} else {
    if(sessionStorage.getItem('user-type') == 'secretariat') {
        document.getElementById('page-content').src = 'secretariat_schedule.html';
    }
    setUserNavList();
    updateContentTitle();
    // updateNotifications();
    updateProfile();
}