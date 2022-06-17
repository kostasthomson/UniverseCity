function setDescription(user) {
    const profile_user = document.querySelectorAll('.table-row');
    let i = 0;
    profile_user.forEach(element => {
        const data = element.getElementsByClassName('row-data');
        data[0].innerHTML = user[i];
        i++;
    });
}


const users = [['onoma_mathiti', 'epitheto_mathiti', 'student'], ['Manos', 'Roumelioths', 'teacher'], ['onoma_grammateia', 'epitheto_grammateia', 'secretariat']];
const login_user = sessionStorage.getItem('user');
users.forEach(user => {
    if (user.includes(login_user)) {
        setDescription(user);
    }
});