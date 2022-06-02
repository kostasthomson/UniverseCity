function EnableDepartmentSelection(department_selection) {
    if(department_selection.disabled) {
        department_selection.disabled = false;  
    }
}

function SetDepartmentSelectionOptions(faculty_menu, department_selection) {
    const selected_option = faculty_menu.options[faculty_menu.selectedIndex];
    const selection_type = selected_option.getAttribute('data-selection-type');
    const departments = department_selection.options;
    for(let i = 0; i < departments.length; i++) {
        const current_department = departments[i];
        if(current_department.classList.contains(selection_type+'-selection')) {
            current_department.hidden = false;
        } else {
            current_department.hidden = true;
        }
    }
}

function DepartmentSelectionUpdate(faculty_menu) {
    const department_selection = document.getElementById('department-selection');
    EnableDepartmentSelection(department_selection);
    if(!document.querySelector("#department-selection > .default-option").selected) {
        document.querySelector("#department-selection > .default-option").selected = true;
    }
    SetDepartmentSelectionOptions(faculty_menu, department_selection);
}

function CheckValues() {
    const semester = document.getElementById('semester-selection').value;
    const faculty = document.getElementById('faculty-selection').value;
    const department = document.getElementById('department-selection').value;
    if(semester && faculty && department) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
                subjects = dbResult.split(",");
            }
        }; 
        xmlhttp.open("GET","assets/backend/schedule.php?semester="+semester,true);
        xmlhttp.send();
    }
}

function save() {
    if(changed_fields.length == 0) {
        for(let j = 1; j <= days.length; j++) {
            let temp_day = [];
            for(let i = 0; i <= (end-start); i++) {
                let td = document.getElementById('row-'+i+'-data-'+j);
                let drop = document.getElementById('Lesson'+i+j);
                let choice = drop.value;
                td.removeChild(drop);
                td.innerHTML = choice;
                if(choice != '') {
                    changed_fields.push({'hour': i, 'day': j})
                }
                schedule[j-1][i] = choice;
            }
        }
        editable_count = 0;
    }
}

function edit() {
    let erase = changed_fields.length != 0;
    if(editable_count < 1) {
        for(let i = 0; i <= (end-start); i++) {
            for(let j = 1; j <= days.length; j++) {
                let td = document.getElementById('row-'+i+'-data-'+j);
                if(erase)
                    td.innerHTML = '';
                let drop = document.createElement('select');
                drop.setAttribute('id', 'Lesson'+i+j);
                let defaultOption = document.createElement('option');
                defaultOption.setAttribute('value', '');
                defaultOption.disabled;
                defaultOption.hidden;
                defaultOption.innerHTML = 'Choose Lesson';
                drop.appendChild(defaultOption);
                subjects.forEach(lesson => {
                    let option = document.createElement('option');
                    option.setAttribute('value', lesson);
                    option.innerHTML = lesson;
                    drop.appendChild(option);
                });
                td.appendChild(drop);
                //ena if gia na krataei thn prohgoymenh epilogh
            }
        }
    }
    editable_count++;
    changed_fields.length = 0;
}

function rowInitialization() {
    const null_character = '';
    let rows = document.querySelectorAll('tbody > tr');
    let lesson_index = 0;
    rows.forEach(row => {
        // if(row.id != 'column-headers') {
        let days_list_index = 0;
        schedule.forEach(day => {
            let td = document.createElement('td');
            td.setAttribute('id', row.id+'-data-'+days[days_list_index].id);
            td.innerHTML = day[lesson_index]? day[lesson_index]: null_character;
            row.appendChild(td);
            days_list_index++;
        });
        lesson_index++;
        // }
    });
}

function createRow(id, hour) {
    const row = document.createElement('tr');
    row.setAttribute('id', 'row-'+id);
    let td = document.createElement('th');
    td.setAttribute('id', 'row-'+id+"-data-0");
    td.setAttribute('data-hour', hour);
    td.setAttribute('scope', 'row');
    td.innerHTML = `${hour}:00 - ${hour + 1}:00`;
    row.appendChild(td);
    return row;
}

function tableInit() {   
    const tbody = document.querySelector('.table > tbody');
    let id = 0;
    for(let i = start; i <= end; i+=step) {
        let trow;
        trow = createRow(id, i);
        tbody.appendChild(trow);
        id++;
    }
}

function scheduleInitalization() {
    days.forEach(day => {
        let day_lessons = [];
        day_lessons.length = end - start;
        schedule.push(day_lessons);
    });
}

let changed_fields = [];
let editable_count = 0;
const body = document.body;
const start = 9;
const end = 20;
const step = 1;
const days = [
    {id:1,name: 'Δευτέρα'}, 
    {id:2,name: 'Τρίτη'}, 
    {id:3,name: 'Τετάρτη'},
    {id:4,name: 'Πέμπτη'},
    {id:5,name: 'Παρασκευή'}
];
let subjects; //= ['Ανάλυση', 'Ασφάλεια', 'Επικοινωνία', 'Προγραμματισμός', 'Τεχνολογία', 'Ψηφιακή'];
let schedule = [];
scheduleInitalization();
tableInit();
rowInitialization();