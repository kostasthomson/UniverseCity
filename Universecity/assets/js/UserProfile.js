const USER = JSON.parse(sessionStorage.getItem('user'));
let elements = Array.from(document.querySelectorAll('.col-lg-9.col-md-8'));
elements[0].innerHTML = USER.first_name + ' ' + USER.last_name;
elements[2].innerHTML = USER.department;
if(USER.type =='student')
    elements[2].innerHTML += ('/'+USER.study_direction);
elements[elements.length - 1].innerHTML = USER.email;