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
      listElement2.setAttribute("id", "SelectCourseList")

      
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
      let x = document.getElementById("SelectCourseList").value;
      capacity = findCourse(x);
      console.log(x);
      if (!document.getElementById('seatList')) {
       theater(capacity);
      }
      else if(document.getElementById('seatList')) {
        const element = document.getElementById('seatList');
        element.remove();
        const desk_element = document.getElementById('desk');
        desk_element.remove();
        theater(capacity);
      }
  }


function theater(capacity){
    makeDesk();
    let listContainer2 = document.createElement('div'),
    listItem;
    listContainer2.setAttribute("id", "seatList")
    document.getElementById('seatContainer01').appendChild(listContainer2);
    for (var i = 1; i <=capacity; ++i) {
          listItem = document.createElement('button');
          listItem.setAttribute("id", "seat" + i);
          listItem.setAttribute("class", "seat");
         //  listItem.setAttribute('onclick', 'select_seat(id)');
          listItem.insertAdjacentHTML('afterbegin', i);
          listItem.setAttribute("style", "cursor: pointer;");
          listContainer2.appendChild(listItem);    
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
          desk_text.appendChild(document.createTextNode('ΕΔΡΑ'));
  }
  
  // Dokimh01 12/05

  const container = document.querySelector('.seatContainer');

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
     
