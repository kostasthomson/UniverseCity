//NOTIFICATIONS WITH DELETE OPERATION
var db_notifications_previous_length = 0;
var db_notifications = [];

class Anouncement {
    constructor(id, title, message) {
        this.Id = id;
        this.Title = title;
        this.Description = message;
    }
    getId() {return this.Id;}
    getTitle() {return this.Title;}
    getDescription() {return this.Description;}
}

class User {
    constructor() {
        this.show = 0;
        this.notshow = 0;
        this.notifications = [];
    }
    updateShow() {this.show = this.notshow;}
    getNotifications() {return this.notifications;}
    check_db_Notifications() {
        if(db_notifications_previous_length != db_notifications.length){
            this.receive();
            db_notifications_previous_length = db_notifications.length;
            return true;
        }
        return false;
    }
    receive() {
        this.notifications.push(...db_notifications.slice(db_notifications_previous_length, db_notifications.length));
        this.notshow = this.notifications.length;
    }
}

class Secretariat {
    constructor() {
        this.index = 0;
        this.anouncement = null;
    }
    getAnouncement() {return this.anouncement;}
    createAnouncement() {
        let title = anouncement_title.value;
        let description = anouncement_description.value;
        this.anouncement = new Anouncement(this.index, title, description);
        this.index++;
    }
    sendAnouncement() {
        if(this.anouncement)
            db_notifications.push(this.anouncement);
    }
}

function listOfNots(nots) {
    let list = [];
    nots.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML = 'NotId: ' + element.getId()+ '<br>NotTitle: ' + element.getTitle() + '<br>NotDesc: ' + element.getDescription();
        list.push(li);
    });
    return list;
}


function create_send() {
    secretariat.createAnouncement();
    secretariat.sendAnouncement();
}

function updateUl() {
    const latest_notification = user.getNotifications().slice(user.show, user.notshow);
    user.updateShow();
    latest_notification.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML = 'NotId: ' + element.getId()+ '<br>NotTitle: ' + element.getTitle() + '<br>NotDesc: ' + element.getDescription();
        ul.append(li);
    });
}


const secretariat = new Secretariat();
const user = new User();
const anouncement_title = document.getElementById('anouncement-title');
const anouncement_description = document.getElementById('anouncement-description');
const ul = document.getElementById('anouncement-list');
const checkInterval = setInterval(() => {
    if(user.check_db_Notifications()) {
        updateUl();
    }
}, 500);


