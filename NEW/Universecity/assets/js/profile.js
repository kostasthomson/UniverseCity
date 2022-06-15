let user = JSON.parse(sessionStorage.getItem('user'));
let user_type = sessionStorage.getItem('user_type');

document.getElementById('uppercard_name').innerHTML = user.FIRST_NAME + ' ' + user.LAST_NAME;

let elements = document.querySelectorAll('.col-lg-9.col-md-8');
elements[0].innerHTML = user.FIRST_NAME + ' ' + user.LAST_NAME;
elements[elements.length - 1].innerHTML = user.AM+'@uom.edu.gr';


if(user_type == 'student') {
    document.getElementById('uppercard_student_type').innerHTML = 'Προπτυχιακός Φοιτητής';
} else if(user_type == 'teacher') {
    document.getElementById('uppercard_student_type').innerHTML = 'Διδάκτορ';
} else if (user_type == 'secretariat') {
    document.getElementById('uppercard_student_type').innerHTML = 'Γραμματεία';
}