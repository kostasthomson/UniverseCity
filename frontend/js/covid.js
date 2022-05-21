const acceptBtn = document.querySelector(".sendButton");
const rejectButton = document.querySelector(".rejectButton");



rejectButton.addEventListener("click", (e) => {
  window.location.reload(true);
});


acceptBtn.addEventListener("click", (e) => {
  let goodMessage = document.querySelector(".message");
  let badMessage = document.querySelector(".badMessage");
  let acceptBox = document.querySelector(".checkbox__input");
  let covidFile = document.querySelector(".fileText");
  let text = document.querySelector(".textarea");
 
  let pathStrSplit = covidFile.value.split('\\');
  let extName = pathStrSplit.pop().split(".").pop(); //! split variables 
  
  
  if(extName==="jpg" || extName==="jpeg" || extName==="pdf" || extName==="png"){
    console.log(covidFile);
    
    goodMessage.style.display = "none";
    
    if( acceptBox.checked){
      goodMessage.style.display = "block";
    }
    
    let description = text.value;
    let url = window.location.search;
    
    if(url){
      url += "&desc=" + description;
    }
    
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const dbResult = this.responseText;
        console.log(dbResult);
      }
    }; 
    xmlhttp.open("GET","../../backend/DB_store.php"+url,true);
    xmlhttp.send();
  }else{
    badMessage.style.display = "none";
    
    if( acceptBox.checked){
      badMessage.style.display = "block";
    }
  }
});

