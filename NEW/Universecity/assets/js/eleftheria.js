window.onload = () => {
     sessionStorage.clear();
    // sessionStorage.setItem('user', 'student');
    UserNavListInit();
    setUserNavList();
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
        console.log(newUser);
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
 
   if( sessionStorage.getItem('user')=="secretariat"){
    switch(element_name) {
        case 'Ωρολόγιο Πρόγραμμα':
            li.setAttribute('data-src-index', 1);
            li.setAttribute('onclick', 'ChangeFrameContent(this)');
            i.setAttribute('class', 'bi bi-calendar-week-fill');
            a.appendChild(i);
            break;
           
        case 'Εξετάσεις-Βαθμολογίες':
            
            i.setAttribute('class', 'bi bi-graph-up');
            a.appendChild(i);
            break;
        case 'Ανακοινώσεις':
            li.setAttribute('data-src-index', 2);
            li.setAttribute('onclick', 'ChangeFrameContent(this)');
            i.setAttribute('class', 'bi bi-bell-fill');
            a.appendChild(i);
            break;
        case 'Διαχείριση Email':
            li.setAttribute('data-src-index', 3);
            li.setAttribute('onclick', 'ChangeFrameContent(this)');
            i.setAttribute('class', 'bi bi-bell-fill');
            a.appendChild(i);
            break;


    }
}else if(sessionStorage.getItem('user')=="student"){
    switch(element_name) {
        case 'Ωρολόγιο Πρόγραμμα':
            li.setAttribute('data-src-index', 1);
            li.setAttribute('onclick', 'ChangeFrameContent(this)');
            i.setAttribute('class', 'bi bi-calendar-week-fill');
            a.appendChild(i);
            break;
        case 'Αξιολόγηση Καθηγητών':
             li.setAttribute('data-src-index', 4);
             li.setAttribute('onclick', 'ChangeFrameContent(this)');
             i.setAttribute('class', 'bi bi-calendar-week-fill');
             a.appendChild(i);
             break;
         case 'Δήλωση Κρούσματος':
                li.setAttribute('data-src-index', 5);
                li.setAttribute('onclick', 'ChangeFrameContent(this)');
                i.setAttribute('class', 'bi bi-calendar-week-fill');
                a.appendChild(i);
                break; 
        case 'Δήλωση Θέσης':
                li.setAttribute('data-src-index', 6);
                li.setAttribute('onclick', 'ChangeFrameContent(this)');
                i.setAttribute('class', 'bi bi-calendar-week-fill');
                a.appendChild(i);
                break;    
         case 'Μαθήματα':
                li.setAttribute('data-src-index', 7);
                li.setAttribute('onclick', 'ChangeFrameContent(this)');
                i.setAttribute('class', 'bi bi-calendar-week-fill');
                a.appendChild(i);
                 break;            
    }


}else if(sessionStorage.getItem('user')=="teacher"){
    switch(element_name) {
        case 'Ωρολόγιο Πρόγραμμα':
            li.setAttribute('data-src-index', 1);
            li.setAttribute('onclick', 'ChangeFrameContent(this)');
            i.setAttribute('class', 'bi bi-calendar-week-fill');
            a.appendChild(i);
            break;
        case 'Προβολή Προσωπικής Αξιολόγησης':
             li.setAttribute('data-src-index', 8);
             li.setAttribute('onclick', 'ChangeFrameContent(this)');
             i.setAttribute('class', 'bi bi-calendar-week-fill');
             a.appendChild(i);
             break;
         case 'Συστατική Επιστολή':
                li.setAttribute('data-src-index', 9);
                li.setAttribute('onclick', 'ChangeFrameContent(this)');
                i.setAttribute('class', 'bi bi-calendar-week-fill');
                a.appendChild(i);
                break; 
        case 'Ανακοινώσεις-Ενημερώσεις':
                li.setAttribute('data-src-index', 2);
                li.setAttribute('onclick', 'ChangeFrameContent(this)');
                i.setAttribute('class', 'bi bi-calendar-week-fill');
                a.appendChild(i);
                break;    
            
    }

}
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
            NavListElements = ['Ωρολόγιο Πρόγραμμα', 'Αιτήσεις-Μηνύματα', 
                        'Μαθήματα', 'Στατιστικά', 'Αξιολόγηση Καθηγητών', 
                        'Erasmus', 'Δήλωση Κρούσματος', 'Δήλωση Θέσης'
                    ];
            break;
        case 'teacher':
            NavListElements = ['Ωρολόγιο Πρόγραμμα', 'Διαχείριση Μαθημάτων', 
                        'Εξετάσεις-Βαθμολογίες', 'Προβολή Προσωπικής Αξιολόγησης',
                        'Συστατική Επιστολή', 'Erasmus', 'Ανακοινώσεις-Ενημερώσεις'
                    ];
            break;
        case 'secretariat':
            NavListElements = ['Ωρολόγιο Πρόγραμμα', 'Ανακοινώσεις', 'Διαχείριση Email', 'Απενεργοποίηση Φοιτητή'];
            break;
    }
    sessionStorage.setItem('user_nav_list', NavListElements);
    console.log(NavListElements);
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

setUpButtons();