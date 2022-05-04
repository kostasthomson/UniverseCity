var user = {name: "charisis", courses: ['ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΥΚΤΙΟΥ','ΤΕΧΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ','ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ'
,'ΑΣΦΑΛΕΙΑ ΠΛΗΡΟΦΟΡΙΩΝ','ΑΛΓΟΡΙΘΜΟΙ']}

    var course = {name: 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΥΚΤΙΟΥ', capacity: 196}

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
          makeDesk();
          let listContainer2 = document.createElement('div'),
          listItem;
          listContainer2.setAttribute("id", "seatList")

          document.getElementById('demo').appendChild(listContainer2);
       
          for (var i = 0; i < capacity; ++i) {
                listItem = document.createElement('div');
                listItem.setAttribute("id", "seat")
                listItem.setAttribute("style", "cursor: pointer;")
                listContainer2.appendChild(listItem);
                // listContainer2.appendChild(document.createTextNode(i+1));
               
          }
         
     

  }
  
  function makeDesk(){
    let listContainer2 = document.createElement('div'),
          listItem;
          listContainer2.setAttribute("id", "deskList")

          document.getElementById('screen').appendChild(listContainer2);
          listItem = document.createElement('div');
                listItem.setAttribute("id", "desk")
               
                listContainer2.appendChild(listItem);
               listContainer2.appendChild(document.createTextNode("ΕΔΡΑ"));
  }



  function select_seat(){
    
  
   
  }
  window.onload = makeList();

 
   document.getElementById("chooseButton").addEventListener("click", validateList,{once:true});
   document.getElementById("seat").addEventListener("click", select_seat);
 
       

       