const teacher={
    name:"Αλέξανδρος Χατζηγεωργίου",
    course:"Τεχνολογία Λογισμικού ",
    
};

document.writeln("Καθηγητής:" +" " + teacher.name + " , " + "Μάθημα:"+ " " +teacher.course);
 
// Ελέγχει αν έχει επιλεξεί κάτι από την φόρμα 
function validateForm() {
    var str = document.forms['form'].optradio.value;
    if( !str.replace(/\s+/, '').length ) {
        alert( "Δεν έχεις συμπληρώσει τα πεδία" );
        return false;
   }else{
       resultsExport();
   }
}




function resultsExport(){
    var data=[];
   data[0]=document.querySelector('input[name="optradio"]:checked').value;
   data[1]=  document.querySelector('input[name="optradio1"]:checked').value;
   data[2]= document.querySelector('input[name="optradio2"]:checked').value;
   data[3]= document.querySelector('input[name="optradio3"]:checked').value;
   data[4]= document.querySelector('input[name="optradio4"]:checked').value;
   data[5] = document.querySelector('input[name="optradio5"]:checked').value;
   data[6] = document.querySelector('input[name="optradio6"]:checked').value;
    data[7] =document.getElementById('textarea1').value;
    data[8] =document.getElementById('textarea').value;

    document.writeln("Καθηγητής:" +" " + teacher.name + " , " + "Μάθημα:"+ " " +teacher.course + "<br>");    
    for(var i=0;i<data.length;i++){
        document.write(data[i]+ "<br>");
       
    }

   
    
}


