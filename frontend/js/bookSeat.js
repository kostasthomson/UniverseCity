var user = {name: "charisis", courses: ['ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΥΚΤΙΟΥ','ΤΕΧΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ','ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ'
,'ΑΣΦΑΛΕΙΑ ΠΛΗΡΟΦΟΡΙΩΝ','ΑΛΓΟΡΙΘΜΟΙ']}

    var course = {name: 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΥΚΤΙΟΥ', capacity: 40}

    function makeList() {
      // Establish the array which acts as a data source for the list
      let listData = user.courses,
      // Make a container element for the list
      listContainer = document.createElement('div'),
      // Make the list
      listElement = document.createElement('form'),
      listElement2 = document.createElement('select'),
      // Set up a loop that goes through the items in listItems one at a time
      numberOfListItems = listData.length,
      listItem,
      i;
  
      // Add it to the page
      document.getElementById('list').appendChild(listContainer);
    
      listContainer.appendChild(listElement).appendChild(listElement2);
      listElement2.setAttribute("id", "Myid")
  
      for (i = 0; i < numberOfListItems; ++i) {
          listItem = document.createElement('option');
  
          listItem.innerHTML = listData[i];
          // Add listItem to the listElement
          listElement2.appendChild(listItem);
      }
  }

  function validateList() {
      let x = document.getElementById("Myid").value;
      // If x is Not a Number or less than one or greater than 10

      theater(course.capacity);
  }

  function theater(capacity){
          console.log(capacity)
          let listContainer2 = document.createElement('div'),
          listItem;
          listContainer2.setAttribute("id", "seatList")
      
          document.getElementById('demo').appendChild(listContainer2);
        
          for (var i = 0; i < capacity; ++i) {
            
                listItem = document.createElement('div');
                listItem.setAttribute("id", "seat")
                listItem.setAttribute("style", "cursor: pointer;")
                listContainer2.appendChild(listItem);
             
                    
            
          }
  }
  
  function select_seat(){
    document.getElementById("seat").setAttribute("color", "red")
  }
  window.onload = makeList();

 
  
    document.getElementById("chooseButton").addEventListener("click", validateList);
   
    
    //  document.getElementById("seat").addEventListener("click", select_seat);
   