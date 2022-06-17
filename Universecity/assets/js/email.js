var db_student_inbox = [];

class User {
    constructor() {
        this.address = null;
        this.mail = null;
        this.prev_length = 0;
    }
    setAddress(address) { this.address = address; }
    getAddress() { return this.address; }
    showInbox() { db_student_inbox.forEach(mail => { mail.showEmail() }); }
    createMail(to, subject, message) {
        this.mail = new Email(this, to, subject, message);
    }
    sendMail() {
        if (this.mail) {
            db_student_inbox.push(this.mail);
        }
    }
    checkInbox() {
        if (this.prev_length != db_student_inbox.length) {
            this.showInbox();
            addToUl(db_student_inbox[db_student_inbox.length - 1]);
            this.prev_length = db_student_inbox.length;
        }
    }
}

class Email {
    constructor(from, to, subject, message) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.message = message;
    }
    getReceiver() { return this.to; }
    showEmail() { console.log('From:', this.from.getAddress(), '\nTo:', this.to.getAddress(), '\nSubject:', this.subject, '\nMessage:', this.message); }
}

function addToUl(mail) {
    const li = document.createElement('li');
    li.innerHTML = 'From: ' + mail.from.getAddress() + '<br>To: ' + mail.to.getAddress() + '<br>Subject: ' + mail.subject + '<br>Message: ' + mail.message;
    ul.append(li);
}

function send() {
    let to_address = to_email_address.value;
    let subject = email_subject.value;
    let message = email_content.value;
    student.setAddress(to_address);
    secretariat.createMail(student, subject, message);
    secretariat.sendMail();
}

let secretariat = new User();
secretariat.setAddress('grammatia@uom.gr');
let student = new User();
const to_email_address = document.getElementById('email-field');
const email_subject = document.getElementById('subject-field');
const email_content = document.getElementById('email-content-field');
const ul = document.getElementById('inbox-list');
const inboxcheck = setInterval(() => {
    student.checkInbox();
}, 500);