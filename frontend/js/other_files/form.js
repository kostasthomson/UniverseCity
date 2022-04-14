   // form loading animation

const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*250);
})

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    }
}

// form validation

const name = document.querySelector('.name') || null;
const am = document.querySelector('.am');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', () => {
        if(am.value != ""){ // means login page is open
            
            if(am.value === "test" && password.value === "test") alertBox("ΤΑ ΚΑΤΑΦΕΡΕΣ ΒΛΑΚΑ")
        
        } else{
            alertBox("ΠΡΟΒΛΗΜΑ ΒΛΑΚΑ")
        }
})

const validateData = (data) => {
    if(!data.name){
        alertBox(data);
    } else{
        sessionStorage.name = data.name;
        sessionStorage.am = data.am;
        location.href = '/';
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}
