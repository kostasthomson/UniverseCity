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

function clearElementList() {
    const ul = document.getElementById('sidebar-nav');
    while(ul.childElementCount > 1) {
        ul.removeChild(ul.lastChild);
    }
}

function changeUser(button) {
    let newUser = button.getAttribute('data-user');
    if(newUser != sessionStorage.getItem('user')) {
        sessionStorage.setItem('user', newUser);
        UserNavListInit();
        setUserNavList();
    }
}

const src_links = [
    // Links for secretariat 0-3
'../../../TechnologiaLogismikou/frontend/html/other_files/arxikh.html', //prob
'../../../TechnologiaLogismikou/frontend/html/programma.html',
'../../../TechnologiaLogismikou/frontend/html/anakoinoseis.html',
'../../../TechnologiaLogismikou/frontend/html/email.html',
// Links for student 4-7
'../../../TechnologiaLogismikou/frontend/html/evaluation_form.html',
'../../../TechnologiaLogismikou/frontend/html/covid.html',
'../../../TechnologiaLogismikou/frontend/html/bookSeat.html',
'../../../TechnologiaLogismikou/frontend/html/bathmoi.html',
// Links for techer 8-9
'../../../TechnologiaLogismikou/frontend/html/evaluation.html',
'../../../TechnologiaLogismikou/frontend/html/recommendation_letter.html'];

function ChangeFrameContent(list_element) {
    const frame = document.getElementById('page-content');
    frame.src = src_links[list_element.getAttribute('data-src-index')];
}

function createListElement(element_name) {
    const li = document.createElement('li');
    li.setAttribute('class', 'nav-item');
    
    li.setAttribute('data-src-index', 0);
    
    const a = document.createElement('a');
    a.setAttribute('class', 'nav-link');
 

    const i = document.createElement('i');

    switch(element_name) {
        case 'Ωρολόγιο Πρόγραμμα':
            li.setAttribute('data-src-index', 1);
            i.setAttribute('class', 'bi-calendar-week');
            break;
        case 'Ανακοινώσεις':
            li.setAttribute('data-src-index', 2);
            i.setAttribute('class', 'bi bi-bell');
            break;
        case 'Στατιστικά':
            li.setAttribute('data-src-index', 4);
            i.setAttribute('class', 'bi bi-graph-up');
            break;
        case 'Αξιολόγηση Καθηγητών':
            li.setAttribute('data-src-index', 4);
            i.setAttribute('class', 'bi bi-person-badge');
            break;
        case 'Δήλωση Κρούσματος':
            li.setAttribute('data-src-index', 5);
            i.setAttribute('class', 'bi bi-file-text');
            break; 
        case 'Δήλωση Θέσης':
            li.setAttribute('data-src-index', 6);
            i.setAttribute('class', 'bi bi-calendar-week');
            break;    
        case 'Μαθήματα':
            li.setAttribute('data-src-index', 7);
            i.setAttribute('class', 'bi bi-calendar-week');
            break; 
        
        case 'Βοήθεια':
            li.setAttribute('data-src-index', 7);
            i.setAttribute('class', 'bi bi-info-circle');
            break; 
        
        // TEACHER
        case 'Προβολή Προσωπικής Αξιολόγησης':
            li.setAttribute('data-src-index', 8);
            i.setAttribute('class', 'bi bi-person-badge');
            a.appendChild(i);
            break;
        case 'Εξετάσεις-Βαθμολογίες':
            li.setAttribute('data-src-index', 2);
            i.setAttribute('class', 'bi bi-journal-bookmark-fill');
            a.appendChild(i);
            break; 
        case 'Συστατική Επιστολή':
            li.setAttribute('data-src-index', 9);
            i.setAttribute('class', 'bi bi-envelope-check');
            a.appendChild(i);
            break; 
        case 'Διαχείριση Μαθημάτων':
            li.setAttribute('data-src-index', 2);
            i.setAttribute('class', 'bi-bookmark-check');
            a.appendChild(i);
            break; 

        
        //SECRETARIAT
        case 'Διαχείριση Ενεργειών':
            li.setAttribute('data-src-index', 3);
            i.setAttribute('class', 'bi bi-toggles2');
            break;      
    }
    li.setAttribute('onclick', 'ChangeFrameContent(this)');
    a.appendChild(i);



    //<i class="bi bi-bell"></i>
    const span = document.createElement('span');
    span.innerHTML = element_name;
    a.append(span);
    li.appendChild(a);
    return li;
}

function setUserNavList() {
    const UserNavList = sessionStorage.getItem('user_nav_list').split(',');
    const ul = document.getElementById('sidebar-nav');
    // ul.innerHTML = '';
    clearElementList();
    UserNavList.forEach(item => {
        ul.appendChild(createListElement(item));
    });
}

function UserNavListInit() {
    let NavListElements;
    switch(sessionStorage.getItem('user')) {
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

const queryString = window.location.search;
if(queryString) {
    const urlParams = new URLSearchParams(queryString);
    const login_data = urlParams.get('login_data');
    const user_data = login_data.split(",");
    const USER = new User(user_data);
    switch(USER.USER_DATA.AM) {
        case 'ics':
            sessionStorage.setItem('user', 'student');
            break;
        case 'iis':
            sessionStorage.setItem('user', 'teacher');
            break;
        case 'dai':
            sessionStorage.setItem('user', 'secretariat');
            break;
    }
}
// setUpButtons();
UserNavListInit();
setUserNavList();