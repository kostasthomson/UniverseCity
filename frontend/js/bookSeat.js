var user = {name: "charisis", courses: ['ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΥΚΤΙΟΥ','ΤΕΧΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ','ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ']};

// Test classes, todo get data from database with php
//------------------ TEST CLASSES DECLARATION START ------------------

class Course {
    constructor(name, code) {
        this.name = name;
        this.code = code;
        Classroom;
    }

    setClassroom(Classroom) {
        this.Classroom = Classroom;
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
var AMF12 = new Classroom('Αμφιθέατρο 12', 'AMF', 12, 01, 168);
var AMF9 = new Classroom('Αμφιθέατρο 9', 'AMF', 09, 01, 90);
var ERG334 = new Classroom('Εργαστήριο 334', 'LAB', 334, 03, 48);
var CL1 = new Classroom('Αίθουσα 1', 'CL', 12, 01, 168);


var AIC101 = new Course('ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΙΚΤΥΟΥ', 'AIC101');
AIC101.setClassroom(ERG334);
var AIC102 = new Course('ΤΕΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ', 'AIC102');
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

//date
let dateElement = new Date;
document.querySelector('.date').insertAdjacentHTML('afterbegin', dateElement.toDateString());




// List containing the User's courses
// function makeList() {
//     let CourseListContainer = document.createElement('div');
//     formElement.setAttribute("class", "course_list");
//     let selectElement = document.createElement('li');
//     selectElement.setAttribute('class', 'list')
//     selectElement.setAttribute('class', 'collapsed');

//     document.getElementById('list').appendChild(formElement).appendChild(selectElement);
//     selectElement.setAttribute("id", "SelectCourseList");
//     // Default-First option
//     listItem = document.createElement('li');
//     listItem.innerHTML = '-- Επιλογή Μαθήματος --'; 
//     listItem.setAttribute('value', 'ignore');
//     selectElement.appendChild(listItem);

//     // Dynamic list initialization
//     for (i = 0; i < User01.CourseList.length; ++i) {
//         // Create listItem
//         listItem = document.createElement('li');

//         // The value of the option is the Course's code
//         listItem.setAttribute('value', User01.CourseList[i].code);

//         // The name of the Course is displayed to the user
//         listItem.innerHTML = User01.CourseList[i].name;

//         // Add listItem to the selectElement
//         selectElement.appendChild(listItem);
//     }
// }


function makeList() { // New Course List with buttons

    let CourseListContainer = document.createElement('div');
    CourseListContainer.setAttribute("class", "course_list");


    

    document.querySelector('.selectCourse').appendChild(CourseListContainer)
    CourseListContainer.setAttribute("id", "SelectCourseList");
   

    // Dynamic list initialization
    for (i = 0; i < User01.CourseList.length; ++i) {
        // Create listItem
        listItem = document.createElement('button');

        // The value of the option is the Course's code
        listItem.setAttribute('value', User01.CourseList[i].code);

        // The name of the Course is displayed to the user
        listItem.innerHTML = User01.CourseList[i].name;

        // validate() starts the generation of the seats with capacity and type 
        listItem.setAttribute('onclick', 'validate(this.value)');

        // Add listItem to the selectElement
        CourseListContainer.appendChild(listItem);
    }
}

// Find Classroom + Generate Seats 
function validate(courseCode){
    // Find the course and return the classroom
    selectedClassroom = findCourse(courseCode);

    let element = document.querySelector(".seatBoxContainer");
    let leftContainer = document.querySelector(".leftContainer");
    let rightContainer = document.querySelector(".rightContainer");

    if(element.classList.contains("filled")) { // There are seats being displayed
        leftContainer.innerHTML = ""; // clear left seat container
        rightContainer.innerHTML = "";// clear right seat container

        // Remove Desk element, might change
        const desk_element = document.querySelector('.desk');
        if (desk_element){ 
            desk_element.remove();
        }
        // Generate Seats
        theater(selectedClassroom.capacity, selectedClassroom.type);
    }
    else { // Seat container is empty - First load
        // Generate Seats
        theater(selectedClassroom.capacity, selectedClassroom.type);
    }
}








// find the course in the User's list and return the classroom
function findCourse(x) {
    for (i=0; i<User01.CourseList.length; i++) {
        if (x == User01.CourseList[i].code) {
            return User01.CourseList[i].Classroom;
        }
        }
    return console.log('Wrong Course code!');
}


function initSeatContainer(){
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
}




function theater(capacity, type){ //not final
makeDesk();

// Get the containers
let seatBoxContainer = document.querySelector(".seatBoxContainer");
seatBoxContainer.classList.add("filled");
let leftContainer = document.querySelector(".leftContainer");
let rightContainer = document.querySelector(".rightContainer");


// TYPE = AMF (amphitheater) capacity 180
if(type=='AMF') {
  

    // Left Container Loop
    for (var i=0; i<capacity; i++) {
        let listItem = document.createElement('button');
        listItem.setAttribute('id', 'seat'+(i+1));
        listItem.setAttribute('class', 'seat');
        listItem.insertAdjacentHTML('afterbegin', i+1);
        listItem.setAttribute('style', 'cursor: pointer;');
        if(i%14<7){ // 7 seats in each side in each row
            leftContainer.appendChild(listItem);
        }
        else{
            // Right Container Loop
            rightContainer.appendChild(listItem);
        }
    }
    // Forbidden seats -->!!! must change from number(12) to variable (percentage of capacity)!!!
    for (i=0; i<capacity/12; i++) { //First 14 seats
        document.getElementById('seat'+(i+1)).classList.toggle('forbidden');
    }

}

// TYPE = LAB (Computer lab) capacity 48?

// Needs if statements for every type. For now --> else = same with AMF
else {
    
      // Left Container Loop
      for (var i=0; i<capacity; i++) {
        let listItem = document.createElement('button');
        listItem.setAttribute('id', 'seat'+(i+1));
        listItem.setAttribute('class', 'seat');
        listItem.insertAdjacentHTML('afterbegin', i+1);
        listItem.setAttribute('style', 'cursor: pointer;');
        if(i%14<7){ // 7 seats in each side in each row
            leftContainer.appendChild(listItem);
        }
        else{
            // Right Container Loop
            rightContainer.appendChild(listItem);
        }
    }
    // Forbidden seats -->!!! must change from number(12) to variable (percentage of capacity)!!!
    for (i=0; i<capacity/12; i++) { //First 14 seats
        document.getElementById('seat'+(i+1)).classList.toggle('forbidden');
    }
}
    let selectBtn = document.getElementById('selectBtn');
    selectBtn.style.display = 'flex'



}


// Make select button
function makeSelectBtn() {



let selectBtn = document.createElement('button');
selectBtn.setAttribute('id', 'selectBtn');
selectBtn.setAttribute('onclick', 'modalToggle(this)'); 
selectBtn.insertAdjacentHTML('afterbegin', 'Επιλογή Θέσης');
document.getElementById('seatContainer01').append(selectBtn); 
//   selectBtn.style.bottom='50px';

    selectBtn.style.position='absolute';


}




//todo Yes/No button inside modal (php later)
// fix button position
// button works only when seat selected!!



function modalToggle(selectBtn) {

     // let, const
    var selectModal = document.getElementById('selectModal');
    var closeElement = document.getElementById('closeElement');

    if (!validSeat()) { //fixededed xQcL Pepega
        selectModal.style.display = 'block';
        
    }
    

    closeElement.onclick = function() {
        selectModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == selectModal) {
            selectModal.style.display = 'none';
        }
    }
}


function makeModal() {


        let selectModal = document.createElement('div');
        selectModal.setAttribute('id', 'selectModal');
        selectModal.setAttribute('class', 'modal');

        let modalContent = document.createElement('div');
        modalContent.setAttribute('class', 'modal-content');
        

        let closeElement = document.createElement('span');
        closeElement.setAttribute('class', 'close');
        closeElement.setAttribute('id', 'closeElement');
        closeElement.insertAdjacentHTML('afterbegin','&times;');
        modalContent.appendChild(closeElement);

        let modalText = document.createElement('p')
        modalText.setAttribute('class', 'modalText');
        modalText.insertAdjacentHTML('afterbegin', 'Έχετε επιλέξει μια θέση είστε σίγουρος ότι θέλετε να συνεχίσετε για την κράτησή της; ');
        let choosebtnYes= document.createElement('button');
        choosebtnYes.setAttribute('class','chbtn');
        choosebtnYes.setAttribute('value', 'yes');
        let choosebtnNo= document.createElement('button');
        choosebtnNo.setAttribute('class','chbtn');
        choosebtnNo.setAttribute('value', 'no');
        // choosebtnYes.value =("Ναι");
        // choosebtnNo.value=("Όχι");
        choosebtnYes.insertAdjacentHTML('afterbegin','Ναι' );
        choosebtnNo.insertAdjacentHTML('afterbegin','Όχι' );
        modalContent.appendChild(modalText);
        modalContent.appendChild(choosebtnYes);
        modalContent.appendChild(choosebtnNo);
        
    





        selectModal.appendChild(modalContent);
        document.body.append(selectModal);  
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
    if (e.target.classList.contains('seat') && validSeat() && !e.target.classList.contains('forbidden')) {
    e.target.classList.toggle('selected');
    }
    else if(e.target.classList.contains('seat') && (e.target.classList.contains('selected') && !validSeat())) {
    e.target.classList.remove('selected');
    }
})

function validSeat() {
    if (document.querySelectorAll('.selected').length>=1) {
    return false; 
    }
    return true;
}


window.onload = makeList();
window.onload = makeSelectBtn();
window.onload = makeModal(); // Creates the modal that confirms the seat selection
window.onload = initSeatContainer(); // init seat container


    