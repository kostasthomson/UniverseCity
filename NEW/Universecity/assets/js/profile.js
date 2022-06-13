let user = JSON.parse(sessionStorage.getItem('user'));

document.getElementById('uppercard_name').innerHTML = user.FIRST_NAME + ' ' + user.LAST_NAME;

let elements = document.querySelectorAll('.col-lg-9.col-md-8');
console.log(elements);
elements[0].innerHTML = user.FIRST_NAME + ' ' + user.LAST_NAME;
elements[elements.length - 1].innerHTML = user.AM+'@uom.edu.gr';