function EnableDepartmentSelection(department_selection) {
    if(department_selection.disabled) {
        department_selection.disabled = false;  
    }
}

function SetDepartmentSelectionOptions(faculty_menu, department_selection) {
    let departments_count = [];
    const selected_option = faculty_menu.options[faculty_menu.selectedIndex];
    const selection_type = selected_option.getAttribute('data-selection-type');
    const departments = department_selection.options;
    for (let i = 0; i < departments.length; i++) {
        const current_department = departments[i];
        if (current_department.classList.contains(selection_type + '-selection')) {
            current_department.hidden = false;
            departments_count.push(current_department);
        } else {
            current_department.hidden = true;
        }
    }
    return departments_count;
}

function DepartmentSelectionUpdate(faculty_menu) {
    resetOptions();
    const department_selection = document.getElementById('department-selection');
    EnableDepartmentSelection(department_selection);
    let departments = SetDepartmentSelectionOptions(faculty_menu, department_selection);
    if(departments.length == 1) {
        departments[0].selected = true;
    }else {
        if(!document.querySelector("#department-selection > .default-option").selected) {
            document.querySelector("#department-selection > .default-option").selected = true;
        }
    }
}

function updateSessionStorage(s, f, d) {
    sessionStorage.setItem('semester', s);
    sessionStorage.setItem('faculty' , f);
    sessionStorage.setItem('department', d);
}

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

function CheckValues() {
    const semester = document.getElementById('semester-selection').value;
    const faculty = document.getElementById('faculty-selection').value;
    const department_element = document.getElementById('department-selection');
    const selectedIndex = department_element.selectedIndex;
    const department = department_element.value;
    updateSessionStorage(semester, faculty, department_element.options[selectedIndex].getAttribute('name'));
    if(semester && faculty && department) {
        resetOptions();
        let xmlhttp_subjects = new XMLHttpRequest();
        xmlhttp_subjects.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
                subjects = dbResult.split(",");
                console.log(subjects);
            }
        }; 
        xmlhttp_subjects.open("GET","../backend/get_subjects.php?department="+department_element.options[selectedIndex].getAttribute('name')+"&semester="+semester,true);
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
        xmlhttp_schedule.open("GET","../backend/get_schedule.php?department="+department_element.options[selectedIndex].getAttribute('name')+"&semester="+semester,true);
        xmlhttp_schedule.send();

        let xmlhttp_classes = new XMLHttpRequest();
        xmlhttp_classes.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const dbResult = this.responseText;
                sessionStorage.setItem('classes', dbResult);
            }
        }; 
        xmlhttp_classes.open("GET","../backend/get_classrooms.php",true);
        xmlhttp_classes.send();
    }
}

function storeTableData() {
    let data = {};
    for(let i = 0; i <= (end-start); i++) {
        let temp = [];
        for(let j = 1; j <= days.length; j++) {
            let td = document.getElementById('row-'+i+'-data-'+j);
            temp.push(td.innerHTML);
        }
        data[start+i] = temp;
    }
    return data;
}

function updateDBSchedule() {
    let data = storeTableData();
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            console.log(dbResult);
        }
    }; 
    xmlhttp.open("GET","../backend/set_schedule.php?department="+sessionStorage.getItem('department')+"&semester="+sessionStorage.getItem('semester')+"&data="+JSON.stringify(data),true);
    xmlhttp.send();
}

function cancel() {
    for(let j = 1; j <= days.length; j++) {
        for(let i = 0; i <= (end-start); i++) {
            let td = document.getElementById('row-'+i+'-data-'+j);
            let drop_subjects = document.getElementById('Lesson'+i+j);
            let drop_classes = document.getElementById('Class'+i+j);
            let choice_subject = drop_subjects.value;
            td.removeChild(drop_subjects);
            let choice_class = drop_classes.value;
            td.remove(drop_classes);
            if(!choice_subject && !choice_subject) {
                td.innerHTML = '';
            } else {
                let choice = choice_subject + '<br>' + choice_class;
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
                let drop_subjects = document.getElementById('Lesson'+i+j);
                let drop_classes = document.getElementById('Class'+i+j);
                if(drop_subjects && drop_classes) {
                    let choice_subject = drop_subjects.value;
                    td.removeChild(drop_subjects);
                    let choice_class = drop_classes.value;
                    td.remove(drop_classes);
                    let choice = choice_subject + '<br>' + choice_class;
                    td.innerHTML = choice;
                }
            }
        }
        editable_count = 0;
        // updateDBSchedule();
    }
}

function edit() {
    const department = document.getElementById('department-selection').value;
    if(department) {
        if(editable_count < 1) {
            for(let i = 0; i <= (end-start); i++) {
                for(let j = 1; j <= days.length; j++) {
                    let td = document.getElementById('row-'+i+'-data-'+j);
                    let td_text = td.innerHTML;
                    td.innerHTML = '';

                    let drop_subjects = document.createElement('select');
                    drop_subjects.setAttribute('id', 'Lesson'+i+j);
                    let defaultOption_subject = document.createElement('option');
                    defaultOption_subject.setAttribute('value', '');
                    defaultOption_subject.disabled = true;
                    defaultOption_subject.selected = true;
                    defaultOption_subject.hidden = true;
                    defaultOption_subject.innerHTML = 'Choose Lesson';
                    drop_subjects.appendChild(defaultOption_subject);
                    subjects.forEach(lesson => {
                        let option = document.createElement('option');
                        option.setAttribute('value', lesson);
                        option.innerHTML = lesson;
                        if(td_text.includes(lesson)) {
                            option.selected = true;
                        }
                        drop_subjects.appendChild(option);
                    });

                    let drop_classes = document.createElement('select');
                    drop_classes.setAttribute('id', 'Class'+i+j);
                    let defaultOption_class = document.createElement('option');
                    defaultOption_class.setAttribute('value', '');
                    defaultOption_class.disabled = true;
                    defaultOption_class.selected = true;
                    defaultOption_class.hidden = true;
                    defaultOption_class.innerHTML = 'Choose Class';
                    drop_classes.appendChild(defaultOption_class);
                    let classes_object = JSON.parse(sessionStorage.getItem('classes'));
                    Object.keys(classes_object).forEach(key => {
                        let option = document.createElement('option');
                        option.setAttribute('value', key);
                        option.innerHTML = classes_object[key];
                        if(td_text.includes(classes_object[key])) {
                            option.selected = true;
                        }
                        drop_classes.appendChild(option);
                    });
                    
                    td.append(drop_subjects, drop_classes);                   
                    //ena if gia na krataei thn prohgoymenh epilogh
                }
            }
        }
        editable_count++;
    }
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