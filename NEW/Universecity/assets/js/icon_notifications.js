function TimeDifference(current, record) {
    const diffMms = (current - record);
    const diffMins = Math.round(((diffMms % 86400000) % 3600000) / 60000);
    const diffHrs = Math.floor((diffMms % 86400000) / 3600000);
    const diffDays = Math.floor(diffMms / 86400000);
    return `${(diffDays != 0) ? diffDays + "d. " : ""} ${(diffHrs != 0) ? diffHrs + "h." : ""} ${(diffMins != 0) ? diffMins + "m." : ""}`;
}

function createLifromNotification(notification) {
    const li = document.createElement('li');
    const hr = document.createElement('hr');
    li.setAttribute('id', notification.id);
    li.setAttribute('class', 'notification-item');
    hr.setAttribute('class', 'dropdown-divider');
    li.appendChild(hr);
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
    divider.setAttribute('class', 'notification-item');
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

function UpdateUlElements() {
    let notifications = JSON.parse(sessionStorage.getItem('notifications'));
    let notification_list = document.querySelector('.notifications');
    fillUlElement(notification_list, notifications.slice(-4).reverse());
}

UpdateUlElements();

// function updateNotifications() {
//     const notifications = document.querySelectorAll('.nav-link.nav-icon')[1];
//     if (sessionStorage.getItem('user-type') == 'secretariat') {
//         notifications.style.display = 'hidden';
//     } else {
//         var xmlhttp = new XMLHttpRequest();
//         xmlhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 const dbResult = this.responseText;
//                 const notifications = 
//                 UpdateUlElements(notifications);
//             }
//         };
//         xmlhttp.open("GET", "./assets/backend/get_announcements.php", true);
//         xmlhttp.send();
//     }
// }