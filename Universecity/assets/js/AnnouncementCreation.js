var user_type = sessionStorage.getItem('user-type'); // ΕΔΩ ΜΠΑΙΝΕΙ DB
var user_id = JSON.parse(sessionStorage.getItem('user')).AM;
var user_name = JSON.parse(sessionStorage.getItem('user')).FIRST_NAME + ' ' + JSON.parse(sessionStorage.getItem('user')).LAST_NAME;
var department = JSON.parse(sessionStorage.getItem('user')).DEPARTMENT;
window.onload = (event) =>{    
    document.querySelector('#Checkboxes>.col-form-label').innerHTML += ` (Τμήμα: ${department})`;

    //Notification Creation Block Activate & Other
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "form-check-input");
    checkbox.setAttribute("id", "checkbox1");


    const label = document.createElement("label");
    label.setAttribute("class", "form-check-label");
    label.setAttribute("for", "checkbox1");
    const textNode = document.createTextNode(`Φοιτητές`); // (Τμήμα: ${department})ΕΔΩ ΝΑ ΜΠΕΙ ΤΟ ΤΜΗΜΑ
    label.appendChild(textNode);
    

    document.getElementById("Checkboxes").appendChild(checkbox)
    document.getElementById("Checkboxes").appendChild(label)
    document.getElementById("Checkboxes").appendChild(document.createElement("br"))

    if(user_type == "secretariat") { //ΑΛΛΑΓΗ ΕΔΩ

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "form-check-input");
        checkbox.setAttribute("id", "checkbox2");


        const label = document.createElement("label");
        label.setAttribute("class", "form-check-label");
        label.setAttribute("for", "checkbox1");
        const textNode = document.createTextNode(`Διδάσκοντες`); // (Τμήμα: ${department})ΕΔΩ ΝΑ ΜΠΕΙ ΤΟ ΤΜΗΜΑ
        label.appendChild(textNode);
        

        document.getElementById("Checkboxes").appendChild(checkbox)
        document.getElementById("Checkboxes").appendChild(label)

    }
};
// Function for submitting announcement
function Submit(){ 
    var toPh = "";
    if (document.getElementById("checkbox2") == null) toPh = false;
    else toPh = document.getElementById("checkbox2").checked;

    const notification = {
    "title": `${document.getElementById("title").value}`,
    "publish_day": `${document.getElementById("publish-day").value}`,
    "remove_day" : `${document.getElementById("remove-day").value}`,
    "publish_time": `${document.getElementById("publish-time").value}`,
    "toStudents" : `${document.getElementById("checkbox1").checked}`,
    "toPh" : `${toPh}`,
    "description" : `${document.getElementById('tiny').value}`, //tinymce.get("tiny").getContent()
    "asUniversity" : `${document.getElementById("asUniversity").checked}`,
    "sender_id" : `${user_id}`, //ΕΔΩ DB
    "sender" : `${user_name}` //ΕΔΩ DB
    // "id" : `${2}`, //ΕΔΩ DB ΚΑΙ ΣΥΝ 1 
    };

    // NOTIFICATION ADD TO DB HERE 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
        }
    };
    xmlhttp.open("GET", "assets/backend/post_announcement.php?notification=" + JSON.stringify(notification), true);
    xmlhttp.send();
    // notification_list.push(notification);
    document.querySelector('.btn-outline-secondary').click();
}
