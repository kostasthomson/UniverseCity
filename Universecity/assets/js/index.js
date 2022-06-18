function updateFrameProfile() {
    const frame = document.getElementById('page-content');
    frame.src = 'users-profile.html';
    frame.setAttribute('data-content-name', "Προφίλ");
}

function checkSource(frame) {
    if(frame.getAttribute('data-content-name') == 'Ωρολόγιο Πρόγραμμα') {
        updateScheduleButton(true);
    } else if (frame.getAttribute('data-content-name') == 'Προφίλ') {
        updateContentTitle();
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
            div.setAttribute('class', 'btn-group');
            div.setAttribute('role', 'group');
            div.setAttribute('aria-label', 'Basic outlined example');
    
            let cancel = document.createElement('button');
            cancel.setAttribute('type', 'button');
            cancel.setAttribute('class', 'btn btn-outline-primary myButtons');
            cancel.setAttribute('onclick', 'cancel()');
            cancel.innerHTML = 'Ακύρωση';
    
            let edit = document.createElement('button');
            edit.setAttribute('type', 'button');
            edit.setAttribute('class', 'btn btn-outline-primary myButtons');
            edit.setAttribute('onclick', 'edit()');
            edit.innerHTML = 'Επεξεργασία';
    
            let save = document.createElement('button');
            save.setAttribute('type', 'button');
            save.setAttribute('class', 'btn btn-outline-primary myButtons');
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
    li.setAttribute('data-toggle', 'tooltip');
    li.setAttribute('data-placement', 'right');
    li.setAttribute('title', 'Tooltip on right');
    // data-toggle="tooltip" data-placement="right" title="Tooltip on right" 

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

function createNotification(notification) {
    // Creating Basic Elements
    console.log(notification)
    const li = document.createElement('li');
    li.setAttribute('id', notification.id);
    li.setAttribute('class', 'notification-item');
    const div = document.createElement('div');
    const title = document.createElement('span');
    title.setAttribute('class', 'bi bi-info-circle')
    title.innerHTML = " " + notification.title;
    const description = document.createElement('p');
    description.innerHTML = notification.description;
    const sender = document.createElement('p');
    sender.innerHTML = `${notification.publish_day} - ${notification.sender}`;
    div.append(title, description, sender);
    li.append(div);
    return li;
}


function fillUlElement(announcements) {
    const ul = document.querySelector('.notifications')
    const hr = document.createElement('hr');
    hr.setAttribute('class', 'dropdown-divider');
    announcements.forEach(announcement => {
        ul.append(createNotification(announcement));
        ul.append(hr);
    });
    // Show All
    const footer = document.createElement('li');
    footer.setAttribute('class', 'dropdown-footer');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', 'NotificationView.html');
    anchor.setAttribute('target', 'main_iframe');
    anchor.innerHTML = 'Εμφάνηση Όλων';
    footer.append(anchor);
    ul.append(footer);
}

function updateNotifications() {
    // DB Import
    const notifications = document.querySelectorAll('.nav-link.nav-icon')[1];
    if (sessionStorage.getItem('user-type') == 'secretariat') {
        notifications.style.display = 'hidden';
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
  
                // Update Budge
                var notificationCount = JSON.parse(dbResult).length;
                if(notificationCount) document.getElementById('notificationCount').innerHTML = notificationCount;

                fillUlElement(JSON.parse(dbResult).slice(-3).reverse());
            }
        };
        xmlhttp.open("GET", "assets/backend/get_announcements.php", true);
        xmlhttp.send();
    }
}

function updateProfile() {
    const USER = JSON.parse(sessionStorage.getItem('user'));
    document.querySelector('.d-none.d-md-block.dropdown-toggle.ps-2').innerHTML = USER.first_name[0] + '. ' + USER.last_name;
    document.querySelector('.profile > .dropdown-header > h6').innerHTML = USER.first_name + ' ' + USER.last_name;
    document.querySelector('.profile > .dropdown-header > span').innerHTML = USER.department;
}

if (!sessionStorage.getItem('user') && !sessionStorage.getItem('user-type')) {
    window.location.href = 'Login_Page.html';
} else {
    if(sessionStorage.getItem('user-type') == 'secretariat') {
        document.getElementById('page-content').src = 'secretariat_set_schedule.html';
    }
    setUserNavList();
    updateContentTitle();
    updateNotifications();
    updateProfile();
}