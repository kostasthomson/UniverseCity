var user = {name: "charisis", courses: ['ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΥΚΤΙΟΥ','ΤΕΧΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ','ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ']};

class Course {
        constructor(name, code, availableSeats) {
            this.name = name;
            this.code = code;
            this.availableSeats = availableSeats;
            Classroom;
        }

        setClassroom(Classroom) {
            this.Classroom = Classroom;
        }

        setAvailableSeats(num) {
            availableSeats = num;
        }



        getAvailableSeats() {
            return availableSeats;
        }
    }

    // Test Class
    class Classroom {
        constructor(name, type, code, floor, capacity) {
                this.name = name;
                this.type = type;
                this.code = code;
                this.floor = floor;
                this.capacity = capacity;
        }
        
    }

    class User {
        constructor(name) {
            this.name;
            this.CourseList = [];
        }

         addCourse(Course) {
             this.CourseList.push(Course);
         }
    }


// { Test01

{ 
  var AMF12 = new Classroom('Αμφιθέατρο 12', 'AMF', 12, 01, 230);
  var AMF9 = new Classroom('Αμφιθέατρο 9', 'AMF', 09, 01, 90);
  var ERG334 = new Classroom('Εργαστήριο 334', 'LAB', 334, 03, 36);
  
  
  var AIC101 = new Course('ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΙΚΤΥΟΥ', 'AIC101');
  AIC101.setClassroom(ERG334);
  var AIC102 = new Course('ΤΕΧΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ', 'AIC102');
  AIC102.setClassroom(AMF12);
  var AIC103 = new Course('ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ', 'AIC103');
  AIC103.setClassroom(AMF12);
  var AIC104 = new Course('ΑΣΦΑΛΕΙΑ ΠΛΗΡΟΦΟΡΙΩΝ', 'AIC104');
  AIC104.setClassroom(AMF12);
  var AIC105 = new Course('ΑΛΓΟΡΙΘΜΟΙ', 'AIC105');
  AIC105.setClassroom(AMF9);



  var User01 = new User('User01');
  User01.addCourse(AIC101);
  User01.addCourse(AIC102);
  User01.addCourse(AIC103);
  User01.addCourse(AIC104);
  User01.addCourse(AIC105);
  //console.log(User01);
}
  // }


  // List Initialization
  let listData = [];
  for (var i = 0; i <User01.CourseList.length; i++) {
      listData[i] = User01.CourseList[i];
      //console.log(listData[i]);
  }


  let listContainer = document.createElement('div'),
      listElement = document.createElement('form'),
      listElement2 = document.createElement('select'),
      listItem;
      document.getElementById('list').appendChild(listContainer);
    
      listContainer.appendChild(listElement).appendChild(listElement2);
      listElement2.setAttribute("id", "Myid")

      
    function makeList() {
      for (i = 0; i < listData.length; ++i) {
          listItem = document.createElement('option');
  
          listItem.innerHTML = listData[i].name;
          // Add listItem to the listElement
          listElement2.appendChild(listItem);
      }
  }

  function findCourse(x) {
    for (i=0; listData.length; i++) {
        if (listData[i].name == x) {
             return listData[i].Classroom.capacity;
        }
    }
        return (0)
  }
 
  function validateList() {
      let x = document.getElementById("Myid").value;
      console.log(x);
      capacity = findCourse(x);
      theater(capacity);
        if(x==="ΤΕΧΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ"){
          
            theater(capacity);
        }else if(x==="ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ"){

        }else if(x==="ΑΣΦΑΛΕΙΑ ΠΛΗΡΟΦΟΡΙΩΝ"){

        }else if(x==="ΑΛΓΟΡΙΘΜΟΙ"){

        }
  }


function theater(capacity){
    makeDesk();
    let listContainer2 = document.createElement('div'),
    listItem;
    listContainer2.setAttribute("id", "seatList")
    document.getElementById('demo').appendChild(listContainer2);
    for (var i = 1; i <=capacity; ++i) {
          listItem = document.createElement('button');
          listItem.setAttribute("id", "seat" + i);
          listItem.setAttribute("class", "seat");
           listItem.setAttribute('onclick', 'select_seat(id)');
          listItem.insertAdjacentHTML('afterbegin', i);
          listItem.setAttribute("style", "cursor: pointer;");
          listContainer2.appendChild(listItem);    
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
let selected=[];
  function select_seat(id) {
    const x=document.getElementById(id);
    selected.push(x.value);
    if(selected.length==1){
        x.style.backgroundColor='green';

    }
    // document.write('You have selected 1 seat');
    occupied(x.id);
  }


  function occupied(x){
    var occupiedSeats = [];
    occupiedSeats.push(x);
    changeColor(occupiedSeats); 
  }

  function changeColor(seats){
  
  }

  window.onload = makeList();
    document.getElementById("chooseButton").addEventListener("click", validateList);
     
