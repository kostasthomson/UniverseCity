function PostAnnouncement(sender) {
    const title = document.getElementById('announcement-title').value;
    const description = document.getElementById('announcement-description').value;
    const DateTime = new Date();
    const time = DateTime.getHours()+":"+DateTime.getMinutes()+":"+DateTime.getSeconds();
    const date = DateTime.getFullYear()+"-"+(DateTime.getMonth()+1)+"-"+DateTime.getDate();
    const queryString = "title="+title+"&description="+description+"&time="+time+"&date="+date+"&sender="+sender;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if(dbResult != 'Done') {
                alert(dbResult);
            }
        }
    };
    xmlhttp.open("GET","../assets/backend/post_announcement.php?"+queryString,true);
    xmlhttp.send();
}