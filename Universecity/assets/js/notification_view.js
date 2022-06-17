var user_type = sessionStorage.getItem('user-type'); // ΕΔΩ ΜΠΑΙΝΕΙ DB
var user_id = JSON.parse(sessionStorage.getItem('user')).AM;
var department = JSON.parse(sessionStorage.getItem('user')).DEPARTMENT;

var removed_list = [] //ΕΔΩ ΜΠΑΙΝΕΙ DB
var last_notification = 0;


window.onload = () => {
    Refresh();
}

function updateStorageNotifications() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            sessionStorage.setItem('notifications', dbResult);// [new_notification] //ΕΔΩ ΜΠΑΙΝΕΙ DB
        }
    };
    xmlhttp.open("GET", "./assets/backend/get_announcements.php", true);
    xmlhttp.send();
}

function Refresh() {
    updateStorageNotifications();
    let notification_list = JSON.parse(sessionStorage.getItem('notifications'));
    const new_notification_list = []
    notification_list.forEach(notification => {
        if (notification.id > last_notification && !removed_list.includes(notification.id)) {
            new_notification_list.push(notification);
            last_notification = notification.id; //ΕΔΩ ΜΠΑΙΝΕΙ DB
        } 
    });
    UpdateNotifications(new_notification_list);
}

function UpdateNotifications(announcements) {
    announcements.forEach(announcement => {

        //Check If Valid
        const today = new Date();

        if(new Date((announcement.publish_day)).getTime() > today.getTime()) return;
        if((new Date((announcement.publish_day)).getTime() < today.getTime()) && announcement.publish_time > today.getHours() + ":" + today.getMinutes()) return;
        if (announcement.toStudents == "false" && user_type == "student") return
        if (announcement.toPh == "false" && user_type == "teacher") return;


        //Delete day if passed
        if(new Date((announcement.remove_day)).getTime() < today.getTime()) {
            //NA ΒΓΑΙΝΕΙ ΚΑΙ ΑΠΟ DB
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const dbResult = this.responseText;
                }
            };
            xmlhttp.open("GET", "./assets/backend/delete_past_announcement.php?announcement_id="+announcement.id, true);
            xmlhttp.send();
            return
        }
        // console.log(announcement)
        

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
        if(!document.getElementById(announcement.id)) document.getElementById('container').insertBefore(div, document.getElementById('container').firstChild);//document.getElementById("container").appendChild(div);
        document.getElementById(announcement.title + "-" + announcement.id).innerHTML = announcement.description;
        
    });
}

// function DeleteNotification(id) {
//     const notification = document.getElementById(id);
//     removed_list.push(parseInt(notification.id));
// }