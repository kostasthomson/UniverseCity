var user_type = sessionStorage.getItem('user-type'); 
var user_id = JSON.parse(sessionStorage.getItem('user')).am;
var user_name = JSON.parse(sessionStorage.getItem('user')).first_name + ' ' + JSON.parse(sessionStorage.getItem('user')).last_name;
var department = JSON.parse(sessionStorage.getItem('user')).department;
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
    const textNode = document.createTextNode(`Φοιτητές`); 
    label.appendChild(textNode);
    

    document.getElementById("Checkboxes").appendChild(checkbox)
    document.getElementById("Checkboxes").appendChild(label)
    document.getElementById("Checkboxes").appendChild(document.createElement("br"))

    if(user_type == "secretariat") {

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "form-check-input");
        checkbox.setAttribute("id", "checkbox2");


        const label = document.createElement("label");
        label.setAttribute("class", "form-check-label");
        label.setAttribute("for", "checkbox1");
        const textNode = document.createTextNode(` Διδάσκοντες`); 
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

    console.log((tinymce.get("tiny").getContent()).replace(`'`,''))

    const notification = {
    "title": `${document.getElementById("title").value}`,
    "publish_day": `${document.getElementById("publish-day").value}`,
    "remove_day" : `${document.getElementById("remove-day").value}`,
    "publish_time": `${document.getElementById("publish-time").value}`,
    "toStudents" : `${document.getElementById("checkbox1").checked}`,
    "toPh" : `${toPh}`,
    "description" : `${(tinymce.get("tiny").getContent())}`, 
    "asUniversity" : `${document.getElementById("asUniversity").checked}`,
    "sender_id" : `${user_id}`, 
    "sender" : `${user_name}`  
    };

    // NOTIFICATION ADD TO DB HERE 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            console.log(dbResult)
        }
    };

    xmlhttp.open("GET", "assets/backend/post_announcement.php?notification=" + JSON.stringify(notification), true);
    xmlhttp.send();
    document.querySelector('.btn-outline-secondary').click();
}
