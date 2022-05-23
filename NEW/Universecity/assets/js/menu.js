//demo class
class User {
    constructor(data) {
        this.USER_DATA = {
            AM: data[0],
            NAME: data[1],
            PASSWORD: data[2]
        };
    }
    deleteData() {this.USER_DATA={AM:"", NAME:"",PASSWORD:""};}
    LogData() {console.log(this.USER_DATA);}
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
}

function createListElement(element_name) {
    const li = document.createElement('li');
    li.setAttribute('class', 'nav-item');

    const a = document.createElement('a');
    a.setAttribute('class', 'nav-link');
    a.setAttribute('onclick', 'ChangeFrameContent(element_name)');

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
            NavListElements = ['Ωρολόγιο Πρόγραμμα', 'Διαχείριση Μαθημάτων', 'Ανακοινώσεις', 'Εξετάσεις-Βαθμολογίες', 'Προβολή Προσωπικής Αξιολόγησης','Συστατική Επιστολή'];
            break;
        case 'secretariat':
            NavListElements = ['Ωρολόγιο Πρόγραμμα', 'Ανακοινώσεις', 'Διαχείριση Ενεργειών'];
            break;
    }
    sessionStorage.setItem('user_nav_list', NavListElements);
}


function changeUser(button) {
    let newUser = button.getAttribute('data-user');
    if(newUser != sessionStorage.getItem('user')) {
        sessionStorage.setItem('user', newUser);
        UserNavListInit();
        setUserNavList();
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

const queryString = window.location.search;
sessionStorage.setItem('url-query', queryString);
if(queryString) {
    const urlParams = new URLSearchParams(queryString);
    const login_data = urlParams.get('login_data');
    const user_data = login_data.split(",");
    const USER = new User(user_data);
    sessionStorage.setItem('user', JSON.stringify(USER));
    switch(USER.USER_DATA.AM) {
        case 'ics':
            sessionStorage.setItem('user-class', 'student');
            break;
        case 'iis':
            sessionStorage.setItem('user-class', 'teacher');
            break;
        case 'dai':
            sessionStorage.setItem('user-class', 'secretariat');
            break;
    }
    const href = 'index.html'+queryString;
    const logo_anchor = document.querySelector('.logo');
    logo_anchor.href = href;
    const sidebar_list_anchor = document.querySelectorAll('.nav-link')[3];
    sidebar_list_anchor.href = href;
    const breadcrumb_list_anchor = document.querySelectorAll('.breadcrumb-item')[0].children[0];
    breadcrumb_list_anchor.href = href;
}
// setUpButtons();
UserNavListInit();
setUserNavList();
updatePageTitle();