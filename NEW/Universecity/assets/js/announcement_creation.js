const submitBtn = document.querySelector(".btn.btn-primary");

submitBtn.addEventListener("click" , PostAnnouncement);
    
    


function PostAnnouncement(sender) {
    const value = sessionStorage.getItem("user-class");
    const title = document.querySelector(".form-control");
    const description = document.querySelector("textarea.form-control");
    console.log(description.value);
    console.log(value);
    const DateTime = new Date();
    let hours = DateTime.getHours();
    let mins = DateTime.getMinutes();
    let seconds = DateTime.getSeconds();
    let year = DateTime.getFullYear();
    let month = DateTime.getMonth() + 1;
    let day = DateTime.getDate();

    if (hours < 10)
        hours = '0' + hours;
    if (mins < 10)
        mins = '0' + mins;
    if (seconds < 10)
        seconds = '0' + seconds;
    if (month < 10)
        month = '0' + month;
    if (day < 10)
        day = '0' + day;
    const time = hours + ':' + mins + ':' + seconds;
    const date = year + '-' + month + '-' + day;
    const queryString = "title=" + title + "&description=" + description + "&time=" + time + "&date=" + date + "&sender=" + sender;
    console.log(queryString);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if (dbResult != 'Done') {
                alert(dbResult);
            }
        }
    };
    xmlhttp.open("GET", "../../assets/backend/post_announcement.php?" + queryString, true);
    xmlhttp.send();
}



