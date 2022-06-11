function columnInitialization(col, data) {
    for(let i = 0; i < data.length; i++) {
        document.getElementById('row-'+i+'-data-'+col).innerHTML = data[i];
    }
}

function cancel() {
    if(editable_count != 0) {
        for(let j = 1; j <= days.length; j++) {
            for(let i = 0; i <= (end-start); i++) {
                let td = document.getElementById('row-'+i+'-data-'+j);
                let drop = document.getElementById('Lesson'+i+j);
                let text = drop.getAttribute('data-previous-text');
                td.removeChild(drop);
                td.innerHTML = text;
            }
        }
        editable_count = 0;
    }
}

function save() {
    if(editable_count != 0){
        for(let j = 1; j <= days.length; j++) {
            for(let i = 0; i <= (end-start); i++) {
                let td = document.getElementById('row-'+i+'-data-'+j);
                let drop = document.getElementById('Lesson'+i+j);
                let option;
                if(drop.getAttribute('data-option-id')) {
                    option = document.getElementById(drop.getAttribute('data-option-id'));
                } else {
                    option = drop.options[drop.selectedIndex];
                }
                td.removeChild(drop);
                td.innerHTML = (option.value) ? option.innerHTML : '';
            }
        }
        editable_count = 0;
    }
}

function edit() {
    if(editable_count == 0) {
        for(let i = 0; i <= (end-start); i++) {
            for(let j = 1; j <= days.length; j++) {
                let td = document.getElementById('row-'+i+'-data-'+j);
                let td_text = td.innerHTML;
                td.innerHTML = '';
                let drop = document.createElement('select');
                drop.setAttribute('class', 'dropdown-selection');
                drop.setAttribute('id', 'Lesson'+i+j);
                drop.setAttribute('data-previous-text', td_text);
                drop.setAttribute('onchange', 'updateSelectionData(this)');
                fillSelectionElement(drop, td_text);
                td.appendChild(drop);
                //ena if gia na krataei thn prohgoymenh epilogh
            }
        }
        editable_count++;
    }
}

function fillSelectionElement(drop, text) {
    for(let i = -1; i < subjects.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('id', drop.id+'-'+(i+1));
        if(i < 0) {
            //DEFAULT OPTION
            option.setAttribute('value', '');
            option.selected = true;
            option.innerHTML = 'Choose Lesson';
        } else {
            //LESSONS
            const lesson = subjects[i];
            if(lesson.semester == user.SEMESTER) {
                option.setAttribute('value', lesson.code);
                option.innerHTML = lesson.title;
                if(lesson.title == text) {
                    option.selected = true;
                }
            } else {
                option = null;
            }
        }
        if(option) {
            drop.appendChild(option);
        }
    }
}

function updateSelectionData(selection) {
    let option_id = selection.options[selection.selectedIndex].id;
    selection.setAttribute('data-option-id', option_id);
}

function get(sessionStorageId) {
    return JSON.parse(sessionStorage.getItem(sessionStorageId));
}

let editable_count = 0;
const start = 9;
const end = 20;
const step = 1;
const days = [
    { id: 1, name: 'Δευτέρα' },
    { id: 2, name: 'Τρίτη' },
    { id: 3, name: 'Τετάρτη' },
    { id: 4, name: 'Πέμπτη' },
    { id: 5, name: 'Παρασκευή' }
];

let user = get('user');
let subjects = get('subjects');
let schedule = get('schedule');
days.forEach(day => {
    columnInitialization(day.id, schedule[day.name]);
});
