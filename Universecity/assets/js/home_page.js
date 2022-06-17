function start() {
    //reset ul and iframe
    reset();
    //getting user
    const LOGIN_USER = sessionStorage.getItem('user');
    const ul = document.getElementById('menu-options');
    let user_dependent_names;
    if (LOGIN_USER == users[0]) {
        //students menu
        user_dependent_names = ['Αιτήσεις-Μηνύματα', 'Μαθήματα',
            'Πρόγραμμα Διδασκαλίας', 'Στατιστικά', 'Αξιολόγηση Καθηγητών',
            'Erasmus', 'Δήλωση Κρούσματος', 'Δήλωση Θέσης'
        ];
    } else if (LOGIN_USER == users[1]) {
        //teachers menu
        user_dependent_names = ['Διαχείριση Μαθημάτων', 'Πρόγραμμα Διδασκαλίας', 'Εξετάσεις-Βαθμολογίες',
            'Προβολή Προσωπικής Αξιολόγησης', 'Συστατική Επιλογή',
            'Erasmus', 'Ανακοινώσεις-Ενημερώσεις'
        ];
    } else if (LOGIN_USER == users[2]) {
        //secretariat menu
        user_dependent_names = ['Ωρολόγιο Πρόγραμμα', 'Ανακοινώσεις', 'Διαχείριση Email', 'Απενεργοποίηση Φοιτητή'];
    }
    //create ul according to user
    if (user_dependent_names) {
        let menu_names = ['Αρχική'];    //home is common to all users
        menu_names = menu_names.concat(user_dependent_names);
        menu_names.push('Έξοδος');  //exit is common to all users
        let items = []
        menu_names.forEach(name => {
            items.push(createLiElement(name));
        });
        items.forEach(element => {
            ul.appendChild(element);
        });
    }
    const profile_icon = document.getElementById('profile-icon');
    profile_icon.setAttribute('onclick', "sentToFrame('profile')");
    const notification_icon = document.getElementById('notification-icon');
    notification_icon.setAttribute('onclick', "sentToFrame('Ανακοινώσεις')");
}


function setFrameSrc(html_src) {
    if (html_src) {
        const frame = document.getElementById('html-frame');
        frame.contentWindow.location.href = html_src;
    }
}

function sentToFrame(value) {
    sessionStorage.setItem('user-option', value);
    let page_url;
    switch (value) {
        case 'profile':
            page_url = '../html/profile.html';
            break;
        // case 'Αρχική':
        //     page_url = '../html/arxikh.html';
        //     break;
        case 'Ωρολόγιο Πρόγραμμα':
            page_url = '../html/programma.html';
            break;
        case 'Ανακοινώσεις':
            page_url = '../html/anakoinoseis.html';
            break;
        case 'Διαχείριση Email':
            page_url = '../html/email.html';
            break;
        default:
            page_url = '../html/arxikh.html';
            break;
    }
    let page = page_url.split('/');
    let href = document.getElementById('html-frame').contentWindow.location.href.split('/');
    if (page[page.length - 1] != href[href.length - 1])
        setFrameSrc(page_url);
    // setFrameSrc(page_url);
}

function createLiElement(context) {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-menu-option');
    if (context == 'Έξοδος') {
        li.setAttribute('onclick', 'LogOut()');
    } else {
        li.setAttribute('onclick', 'sentToFrame(this.innerHTML)');
    }
    li.innerHTML = context;
    return li;
}

function LogOut() {
    document.location.href = '../html/Login_Page.html';
}

function setUser(button) {
    let user = button.getAttribute('data-user');
    if (!sessionStorage.getItem('user') || (sessionStorage.getItem('user') != user)) {
        sessionStorage.setItem('user', user);
        document.getElementById('html-frame').contentWindow.location.reload();
        start();
    }

}

function reset() {
    document.getElementById('menu-options').innerHTML = '';
    const frame = document.getElementById('html-frame');
    frame.removeAttribute('src');
}

function full_reset() {
    reset();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('user-option');
}

window.onload = () => {
    full_reset();
}

// DEMO BUTTONS
//----------------------------------------------------
const users = ['student', 'teacher', 'secretariat'];
const button_div = document.createElement('div');
button_div.setAttribute('id', 'buttons');
for (let i = 1; i <= 3; i++) {
    const button = document.createElement('button');
    button.setAttribute('class', 'temp-button');
    button.setAttribute('onclick', 'setUser(this)');
    button.setAttribute('data-user', users[i - 1]);
    button.innerHTML = 'Login as ' + users[i - 1];
    button_div.appendChild(button);
}
document.body.appendChild(button_div);
