var user = {name: "charisis", courses: ['ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΥΚΤΙΟΥ','ΤΕΧΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ','ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ']};

// Test classes, todo get data from database with php
//------------------ TEST CLASSES DECLARATION START ------------------
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

//------------------ TEST CLASSES DECLARATION END ------------------


//------------------ TEST DATA START ------------------
{ 
  var AMF12 = new Classroom('Αμφιθέατρο 12', 'AMF', 12, 01, 180);
  var AMF9 = new Classroom('Αμφιθέατρο 9', 'AMF', 09, 01, 90);
  var ERG334 = new Classroom('Εργαστήριο 334', 'LAB', 334, 03, 48);
  
  
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

//------------------ TEST DATA END ------------------


  // List Initialization
  let listData = [];
  for (var i = 0; i <User01.CourseList.length; i++) {
      listData[i] = User01.CourseList[i];
      //console.log(listData[i]);
  }


    // List containing the courses
    function makeList() {
      let formElement = document.createElement('form'),
      selectElement = document.createElement('select'),
      listItem;
      document.getElementById('list').appendChild(formElement).appendChild(selectElement);
      selectElement.setAttribute("id", "SelectCourseList");
      for (i = 0; i < listData.length; ++i) {
          listItem = document.createElement('option');
  
          listItem.innerHTML = listData[i].name;
          // Add listItem to the selectElement
          selectElement.appendChild(listItem);
      }
  }


  // Find Course. Return Classroom item
  function findCourse(x) {
    for (i=0; listData.length; i++) {
        if (listData[i].name == x) {
             return listData[i].Classroom;
        }
    }
        return (0)
  }


  // Validate List. Check if there is a seat container already drawn
  function validateList() {
      let x = document.getElementById("SelectCourseList").value;
      selectedClassroom = findCourse(x);
      console.log(x);
      if (!document.querySelector('.seatBoxContainer')) {
       theater(selectedClassroom.capacity, selectedClassroom.type);
      }
      else if(document.querySelector('.seatBoxContainer')) {
        const element = document.querySelector('.seatBoxContainer');
        element.remove();
        const desk_element = document.querySelector('.desk');
        desk_element.remove();
        theater(selectedClassroom.capacity, selectedClassroom.type);
      }
  }

 


//TEST 01

function theater(capacity, type){ //not final
    makeDesk();
    
    // TYPE = AMF (amphitheater) capacity 180
    if(type=='AMF') {
        // main container
        let seatBoxContainer = document.createElement('div');
        seatBoxContainer.setAttribute('class', 'seatBoxContainer');
        // left Container for seats
        let leftContainer = document.createElement('div');
        leftContainer.setAttribute('class', 'leftContainer');
        // right Container for seats
        let rightContainer = document.createElement('div');
        rightContainer.setAttribute('class', 'rightContainer');

        seatBoxContainer.appendChild(leftContainer);
        seatBoxContainer.appendChild(rightContainer);

        document.getElementById('seatContainer01').appendChild(seatBoxContainer);

        // Left Container Loop
        for (var i=1; i<=capacity/2; i++) {
            let listItem = document.createElement('button');
            listItem.setAttribute('id', 'seat'+i);
            listItem.setAttribute('class', 'seat');
            listItem.insertAdjacentHTML('afterbegin', i);
            listItem.setAttribute('style', 'cursor: pointer;');
            leftContainer.appendChild(listItem);
        }

        // Right Container Loop
        for (i; i<=capacity; i++) {
            let listItem = document.createElement('button');
            listItem.setAttribute('id', 'seat'+i);
            listItem.setAttribute('class', 'seat');
            listItem.insertAdjacentHTML('afterbegin', i);
            listItem.setAttribute('style', 'cursor: pointer;');
            rightContainer.appendChild(listItem);
        }
    }
    
    // TYPE = LAB (Computer lab) capacity 48?

    // Needs if statements for every type. For now --> else = same with AMF
    else {
        // main container
        let seatBoxContainer = document.createElement('div');
        seatBoxContainer.setAttribute('class', 'seatBoxContainer');
        // left Container for seats
        let leftContainer = document.createElement('div');
        leftContainer.setAttribute('class', 'leftContainer');
        // right Container for seats
        let rightContainer = document.createElement('div');
        rightContainer.setAttribute('class', 'rightContainer');

        seatBoxContainer.appendChild(leftContainer);
        seatBoxContainer.appendChild(rightContainer);

        document.getElementById('seatContainer01').appendChild(seatBoxContainer);

        // Left Container Loop
        for (var i=1; i<=capacity/2; i++) {
            let listItem = document.createElement('button');
            listItem.setAttribute('id', 'seat'+i);
            listItem.setAttribute('class', 'seat');
            listItem.insertAdjacentHTML('afterbegin', i);
            listItem.setAttribute('style', 'cursor: pointer;');
            leftContainer.appendChild(listItem);
        }

        // Right Container Loop
        for (i; i<=capacity; i++) {
            let listItem = document.createElement('button');
            listItem.setAttribute('id', 'seat'+i);
            listItem.setAttribute('class', 'seat');
            listItem.insertAdjacentHTML('afterbegin', i);
            listItem.setAttribute('style', 'cursor: pointer;');
            rightContainer.appendChild(listItem);
        }
    }



    
  }
  
  function makeDesk(){
    let deskElement = document.createElement('div');
          deskElement.setAttribute("id", "desk");
          deskElement.setAttribute("class", "desk");
          document.getElementById('screen').appendChild(deskElement);
          var desk_text = document.createElement('p');
          desk_text.setAttribute('class', 'desk_text');
          deskElement.appendChild(desk_text);
          desk_text.appendChild(document.createTextNode('ΕΔΡΑ')); //final text node?
  }

  // Dokimh01 12/05

  const container = document.querySelector('.seatContainer');

  // Only one seat can be selected at a time
  container.addEventListener('click', (e) => {
      if (e.target.classList.contains('seat') && onlyOneSeat()) {
      e.target.classList.toggle('selected');
      }
      else if(e.target.classList.contains('seat') && (e.target.classList.contains('selected') && !onlyOneSeat())) {
        e.target.classList.remove('selected');
      }
  })

  function onlyOneSeat() {
      if (document.getElementsByClassName('selected').length>=1) {
        return false; 
      }
        return true;
  }

  window.onload = makeList();
    document.getElementById("chooseButton").addEventListener("click", validateList);
     
