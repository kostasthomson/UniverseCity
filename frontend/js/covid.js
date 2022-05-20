const acceptBtn = document.querySelector(".sendButton");
const rejectButton = document.querySelector(".rejectButton");


rejectButton.addEventListener("click", (e) => {
  window.location.reload(true);
});


acceptBtn.addEventListener("click", (e) => {
  let message = document.querySelector(".message");
  let acceptBox = document.querySelector(".checkbox__input");
  message.style.display = "none";
  
  if( acceptBox.checked){
  message.style.display = "block";
  }

  
});
