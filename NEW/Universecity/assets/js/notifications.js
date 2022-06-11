new_notification = {
    "title": `test`,
    "publish_day": "2022-06-10",
    "remove_day" : "2022-06-29",
    "publish_time": `10:20`,
    "toStudents" : `true`,
    "toPh" : `true`,
    "description" : `<p>&alpha;&sigma;&eta;&xi;&iota;&phi;&gamma;&beta;&theta;&iota;&eta;&alpha;&sigma;&beta;<strong>&alpha;&sigma;&iota;&eta;&rho;&iota;&omicron;&phi;&theta;&eta;<span style="text-decoration: underline;">&sigma;&alpha;&xi;&kappa;&lambda;&phi;&nu;&delta;&kappa;&alpha;&xi;</span></strong></p>`,
    "asUniversity" : `true`,
    "id" : "50",  
    "sender" : "ΧΑΤΖΗΜΠΡΟ",
    "sender_id": "teacher" 
}


var user_list = [] //ΕΔΩ ΜΠΑΙΝΕΙ DB
var notification_list = [new_notification] //ΕΔΩ ΜΠΑΙΝΕΙ DB
var user = "teacher" // ΕΔΩ ΜΠΑΙΝΕΙ DB


window.onload = (event) =>{
    Refresh();
    
    //Notification Creation Block Activate & Other
    if(user != "student") document.getElementById("create-notification").style.display = "block"; //ΑΛΛΑΓΗ ΕΔΩ

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "form-check-input");
    checkbox.setAttribute("id", "checkbox1");


    const label = document.createElement("label");
    label.setAttribute("class", "form-check-label");
    label.setAttribute("for", "checkbox1");
    const textNode = document.createTextNode(` Φοιτητές (Τμήμα: ${"ΤΜΗΜΑ"})`); //ΕΔΩ ΝΑ ΜΠΕΙ ΤΟ ΤΜΗΜΑ
    label.appendChild(textNode);
    

    document.getElementById("Checkboxes").appendChild(checkbox)
    document.getElementById("Checkboxes").appendChild(label)
    document.getElementById("Checkboxes").appendChild(document.createElement("br"))

    if(user == "secretariat") { //ΑΛΛΑΓΗ ΕΔΩ

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "form-check-input");
        checkbox.setAttribute("id", "checkbox2");


        const label = document.createElement("label");
        label.setAttribute("class", "form-check-label");
        label.setAttribute("for", "checkbox1");
        const textNode = document.createTextNode(` Διδάσκοντες (Τμήμα: ${"ΤΜΗΜΑ"})`); //ΕΔΩ ΝΑ ΜΠΕΙ ΤΟ ΤΜΗΜΑ
        label.appendChild(textNode);
        

        document.getElementById("Checkboxes").appendChild(checkbox)
        document.getElementById("Checkboxes").appendChild(label)

    }
};

function Refresh() {

    const last_notification = 1  //ΕΔΩ ΜΠΑΙΝΕΙ DB
    const new_notification_list = []
    notification_list.forEach(notification => {
        if (notification.id > last_notification && !user_list.includes(notification.id)) new_notification_list.push(notification)
    });
    UpdateNotifications(new_notification_list);



    // ΑΧΡHΣΤΟΣ ΚΩΔΙΚΑΣ ? ΔΙΕΓΡΑΨΕ ΤΟΝ ΑΜΑ ΔΕΝ ΤΟΝ ΧΡΕΙΑΖΕΣΑΙ
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         const dbResult = this.responseText;
    //         const notifications = dbResult.split('/');
    //         const secretariat_notifications = notifications[0].split('.');
    //         const teacher_notifications = notifications[1].split('.');
    //     }
    // };
    // xmlhttp.open("GET", "./assets/backend/get_announcement.php", true);
    // xmlhttp.send();
}

let ul_ids = [];

function UpdateNotifications(announcements) {
    announcements.forEach(announcement => {

        //Check If Valid
        const today = new Date();

        if(new Date((announcement.publish_day)).getTime() > today.getTime()) return;
        if((new Date((announcement.publish_day)).getTime() < today.getTime()) && announcement.publish_time > today.getHours() + ":" + today.getMinutes()) return;
        if (announcement.toStudents == "false" && user == "student") return
        if (announcement.toPh == "false" && user == "teacher") return;


        //Delete day if passed
        if(new Date((announcement.remove_day)).getTime() < today.getTime()) {
            notification_list.indexOf(announcement) 
            //NA ΒΓΑΙΝΕΙ ΚΑΙ ΑΠΟ DB
            return
        }
        console.log(announcement)
        

        //Creating Main Notification Div
        var div = document.createElement("div");
        if(announcement.sender_id == "teacher") div.setAttribute("class", "alert alert-primary alert-dismissible fade show") // Δεν ξερω πως δια βαζουμε τους καθηγητες
        else div.setAttribute("class", "alert alert-warning alert-dismissible fade show")
        div.setAttribute("id", announcement.id)

        //Adding Elements
        const icon = document.createElement("i");
        const title = document.createElement("h4");
        icon.setAttribute("class", "bi bi-check-circle me-1")
        var textNode = document.createTextNode(announcement.title);
        title.appendChild(icon);
        title.appendChild(textNode);
        div.appendChild(title)

        const description = document.createElement("div");
        description.setAttribute("id", announcement.title + "-" + announcement.id)
        div.appendChild(description)

        div.appendChild(document.createElement("hr"))

        const time = document.createElement("p");
        var from = ""
        if(announcement.asUniversity == "true") from = "University" //ΑΛΛΑΓΗ ΑΠΟ DB
        else from = announcement.sender
        textNode = document.createTextNode(`Από: ${from} - ${announcement.publish_day}`);
        time.appendChild(textNode);
        div.appendChild(time)

        const button = document.createElement("button")
        button.setAttribute("class", "btn-close")
        button.setAttribute("data-bs-dismiss", "alert")
        button.setAttribute("onclick", `DeleteNotification(${announcement.id})`)
        div.appendChild(button)


        //Final Add Of Div
        if(!document.getElementById(announcement.id)) document.getElementById("container").appendChild(div);
        document.getElementById(announcement.title + "-" + announcement.id).innerHTML = announcement.description
        
    });
}

function DeleteNotification(id) {
    const notification = document.getElementById(id)
    user_list.push(parseInt(notification.id))    
}


function Submit(){ 
    var toPh = ""
    if (document.getElementById("checkbox2") == null) toPh = false
    else toPh = document.getElementById("checkbox2").checked

    const notification = {
    "title": `${document.getElementById("title").value}`,
    "publish_day": `${document.getElementById("publish-day").value}`,
    "remove_day" : `${document.getElementById("remove-day").value}`,
    "publish_time": `${document.getElementById("publish-time").value}`,
    "toStudents" : `${document.getElementById("checkbox1").checked}`,
    "toPh" : `${toPh}`,
    "description" : `${tinymce.get("tiny").getContent()}`,
    "asUniversity" : `${document.getElementById("asUniversity").checked}`,
    "id" : `${2}`, //ΕΔΩ DB ΚΑΙ ΣΥΝ 1 
    "sender" : `${"ΧΑΤΖΗΜΠΡΟ"}`, //ΕΔΩ DB
    "sender_id" : `${"teacher"}`//ΕΔΩ DB
    }

    //NOTIFICATION ADD TO DB HERE 
    notification_list.push(notification)
    console.log(notification_list)
}
