function rowInitialization(data) {
    for(let i = 0; i < (end - start); i++) {
        let element = document.getElementById('row-'+i+'-data-0');
        if(element.getAttribute('data-hour') == data[0]) {
            for(let j = 1; j < data.length; j++) {
                document.getElementById('row-'+i+'-data-'+j).innerHTML = data[j];
            }
        }
    }
}

function cancel() {
    for(let j = 1; j <= days.length; j++) {
        for(let i = 0; i <= (end-start); i++) {
            let td = document.getElementById('row-'+i+'-data-'+j);
            let drop = document.getElementById('Lesson'+i+j);
            let choice = drop.value;
            td.removeChild(drop);
            if(!choice) {
                td.innerHTML = '';
            } else {
                td.innerHTML = choice;
            }
        }
    }
    editable_count = 0;
}

function save() {
    if(editable_count != 0){
        for(let j = 1; j <= days.length; j++) {
            for(let i = 0; i <= (end-start); i++) {
                let td = document.getElementById('row-'+i+'-data-'+j);
                let drop = document.getElementById('Lesson'+i+j);
                if(drop) {
                    let choice = drop.value;
                    td.removeChild(drop);
                    td.innerHTML = choice;
                }
            }
        }
        editable_count = 0;
    }
}

function edit() {
    if(editable_count < 1) {
        for(let i = 0; i <= (end-start); i++) {
            for(let j = 1; j <= days.length; j++) {
                let td = document.getElementById('row-'+i+'-data-'+j);
                let td_text = td.innerHTML;
                td.innerHTML = '';
                let drop = document.createElement('select');
                drop.setAttribute('id', 'Lesson'+i+j);
                let defaultOption = document.createElement('option');
                defaultOption.setAttribute('value', '');
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.hidden = true;
                defaultOption.innerHTML = 'Choose Lesson';
                drop.appendChild(defaultOption);
                subjects.forEach(lesson => {
                    let option = document.createElement('option');
                    option.setAttribute('value', lesson);
                    option.innerHTML = lesson;
                    if(lesson == td_text) {
                        option.selected = true;
                    }
                    drop.appendChild(option);
                });
                td.appendChild(drop);                   
                //ena if gia na krataei thn prohgoymenh epilogh
            }
        }
    }
    editable_count++;
}

function resetOptions() {
    for(let i = 0; i <= (end-start); i++) {
        for(let j = 1; j <= days.length; j++) {
            document.getElementById('row-'+i+'-data-'+j).innerHTML = '';
        }
    }
    editable_count = 0;
}


let editable_count = 0;
const body = document.body;
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
let subjects;

window.onload = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let department = user.DEPARTMENT;
    let semester = user.SEMESTER;
    let xmlhttp_subjects = new XMLHttpRequest();
    xmlhttp_subjects.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            subjects = dbResult.split(",");
        }
    }; 
    xmlhttp_subjects.open("GET","assets/backend/get_subjects.php?department="+department+"&semester="+semester,true);
    xmlhttp_subjects.send();
    
    let xmlhttp_schedule = new XMLHttpRequest();
    xmlhttp_schedule.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            const time_subjects = dbResult.split('/');
            time_subjects.forEach(row => {
                const row_data = row.split(',');
                rowInitialization(row_data);
            });
        }
    }; 
    xmlhttp_schedule.open("GET","assets/backend/get_schedule.php?department="+department+"&semester="+semester,true);
    xmlhttp_schedule.send();
}