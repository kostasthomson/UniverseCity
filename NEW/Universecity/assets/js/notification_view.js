function Refresh() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            const notifications = dbResult.split('|');
            const secretariat_notifications = notifications[0].split('.');
            const teacher_notifications = notifications[1].split('.');
            UpdateUlElements(secretariat_notifications, teacher_notifications);
        }
    }; 
    xmlhttp.open("GET","./assets/backend/get_announcement.php",true);
    xmlhttp.send();
}

function UpdateUlElements(secretariat, teacher) {
    fillUlElement(document.getElementById('show-secretariat'),secretariat);
    fillUlElement(document.getElementById('show-teacher'),teacher);
}

let ul_ids = [];

function fillUlElement(ul, announcements) {
    announcements.forEach(announcement => {
        const details = announcement.split(',');
        notification = { 
            'id': details[0],
            'title': details[1], 
            'description': details[2], 
            'time': details[3], 
            'date': details[4], 
        };
        const li = createListElement(notification);
        if(!ul_ids.includes(li.id)) {
            ul.append(li);
            ul_ids.push(li.id);
        }
    });
}

function createListElement(notification) {
    const li = document.createElement('li');
    li.setAttribute('id', notification.id);
    li.innerHTML = notification.title + ' ' + notification.description + ' ' + notification.time + ' ' + notification.date;
    return li;
}