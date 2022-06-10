let sEle = [];
let tEle = [];

window.onload = (event) =>{
    Refresh();
};


function CheckUsersList(notification_list){
    const user_list= []//ΕΔΩ ΜΠΑΙΝΕΙ DB
    const last_notification = 9  //ΕΔΩ ΜΠΑΙΝΕΙ DB
    const new_notification_list = []

    notification_list.forEach(notification => {
        if (notification.id > last_notification && !user_list.includes(notification.id)){
            new_notification_list.push(notification)
        }
    });
    UpdateNotifications(new_notification_list);
}

function Refresh() {
    new_notification = {
        "sender_id": "teacher",
        "sender" : "ΧατζηΜπρο",
        "title" : "ΛΟΣΚΙ",
        "description" : "Δοκιμή",
        "date" : " 15/6/2022",
        "id": 10
    }
    new_notification2 = {
        "sender_id": "secretariat",
        "sender" : "ΓΡΑΜΜΑΤΕΙΑ",
        "title" : "NEA",
        "description" : "Δοκιμή",
        "date" : " 19/6/2022",
        "id": 11
    }
    notification_list = [new_notification, new_notification2] //ΕΔΩ ΜΠΑΙΝΕΙ DB
    CheckUsersList(notification_list);


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            const notifications = dbResult.split('/');
            const secretariat_notifications = notifications[0].split('.');
            const teacher_notifications = notifications[1].split('.');
        }
    };
    xmlhttp.open("GET", "./assets/backend/get_announcement.php", true);
    xmlhttp.send();
}

let ul_ids = [];

function UpdateNotifications(announcements) {
    announcements.forEach(announcement => {

        //Creating Main Notification Div
        const div = document.createElement("div");
        if(announcement.sender_id == "teacher") div.setAttribute("class", "alert alert-primary alert-dismissible fade show")
        else div.setAttribute("class", "alert alert-warning alert-dismissible fade show")
        document.getElementById("container").appendChild(div);

        //Adding Elements
        const icon = document.createElement("i");
        const title = document.createElement("h4");
        icon.setAttribute("class", "bi bi-check-circle me-1")
        var textNode = document.createTextNode(announcement.title);
        title.appendChild(icon);
        title.appendChild(textNode);
        div.appendChild(title)

        const description = document.createElement("p");
        textNode = document.createTextNode(announcement.description);
        description.appendChild(textNode);
        div.appendChild(description)

        div.appendChild(document.createElement("hr"))

        const time = document.createElement("p");
        textNode = document.createTextNode("Από: " + announcement.sender + " -" + announcement.date);
        time.appendChild(textNode);
        div.appendChild(time)

        const button = document.createElement("button")
        button.setAttribute("class", "btn-close")
        button.setAttribute("data-bs-dismiss", "alert")
        div.appendChild(button)

        
    });
}
