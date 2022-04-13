function start() {
    reset();
    const LOGIN_USER = sessionStorage.getItem('user');
    var user_dependent_names;

    if(LOGIN_USER == 'Student') {
        //students menu
        user_dependent_names = ['Αιτήσεις-Μηνύματα', 'Μαθήματα', 
                        'Πρόγραμμα Διδασκαλίας', 'Στατιστικά', 'Αξιολόγιση Καθηγητών', 
                        'Erasmus', 'Δήλωση Κρούσματος', 'Δήλωση Θέσης'
                    ];
    }else if(LOGIN_USER == 'Teacher') {
        //teachers menu
        user_dependent_names = ['Διαχείριση Μαθημάτων','Πρόγραμμα Διδασκαλίας', 'Εξετάσεις-Βαθμολογίες',
                        'Προβολή Προσωπικής Αξιολόγησης', 'Συστατική Επιλογή',
                        'Erasmus', 'Ανακοινώσεις-Ενημερώσεις'
                    ];
    }else if(LOGIN_USER == 'Secretariat') {
        //secretariat menu
        user_dependent_names = ['Ωρολόγιο Πρόγραμμα', 'Ανακοινώσεις', 'Διαχείριση Email', 'Απενεργοποίηση Φοιτητή'];
    }

    if(user_dependent_names) {
        var menu_names = ['Αρχική'];
        menu_names = menu_names.concat(user_dependent_names);
        menu_names.push('Έξοδος');
        var items = []
        menu_names.forEach(name => {
            items.push(createLiElement(name));
        });
        items.forEach(element => {
            ul.appendChild(element);
        });
    }
}

function reset() {
    document.getElementById('ul').innerHTML = '';
    sentToFrame('');
}

function sentToFrame(value) {
    sessionStorage.setItem('option', value);
    frame.contentWindow.location.reload();
}

function createLiElement(context) {
    const li = document.createElement('li');
    li.setAttribute('onclick', 'sentToFrame(this.innerHTML)');
    li.innerHTML = context;
    return li;
}


function setUser(button) {
    let user = button.innerHTML.split(" ");
    sessionStorage.setItem('user', user[2]);
    start();
}


// BODY
var body_elements = [];
// IMAGE
const img = document.createElement('img');
img.setAttribute('src', '../../frontend/img/Universecity.png');
body_elements.push(img);


    // DEMO BUTTONS
const button_div = document.createElement('div');
button_div.setAttribute('id', 'buttons');
for(let i=1; i<=3; i++) {
    let user = i==1 ?'Student' :i==2 ?'Teacher' : 'Secretariat'
    const button = document.createElement('button');
    button.setAttribute('onclick', 'setUser(this)');
    button.innerHTML = 'Login as ' + user;
    button_div.appendChild(button);
}
body_elements.push(button_div);


// DIV FOR MENU
const menu_div = document.createElement('div');
menu_div.setAttribute('id', 'menu');
body_elements.push(menu_div);
// DIV FOR FRAME
const frame_div = document.createElement('div');
frame_div.setAttribute('id', 'content');
body_elements.push(frame_div);

body_elements.forEach(element => {
    document.body.appendChild(element);
});

// MENU
var menu_elements = [];

const ul = document.createElement('ul');
ul.setAttribute('id', 'ul');
menu_elements.push(ul);

menu_elements.forEach(element => {
    menu_div.appendChild(element);
});

// FRAME
var frame_elements = [];

const frame = document.createElement('iframe');
frame.setAttribute('src', './other_files/menu_option.html');
frame_elements.push(frame);

frame_elements.forEach(element => {
    frame_div.appendChild(element);
});