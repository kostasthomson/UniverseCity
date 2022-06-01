
const subject_id = [];
const subject_title = [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const dbResult = this.responseText;
        if(dbResult!="Query failed") {
            

            const result_array = dbResult.split(",");
            
            let j=0, k=0;

            for(i=0; i<result_array.length; i++){
                if(i % 2 == 0 && result_array[i] != " "){
                    subject_id[j] = result_array[i];
                    j++;
                }
                else if (result_array[i] != " "){
                    subject_title[k] = result_array[i];      
                    k++;
                }
            } 

            select = document.createElement("select");
            select.setAttribute("name", "subjects");
            select.setAttribute("id", "subjs");
            select.setAttribute("class", "select");

            options = document.createElement("option")
            options.setAttribute("disabled", "disabled");
            options.setAttribute("selected", "selected");
            options.setAttribute("class", "invalid"); 

            for(let i=0;i<subject_title.length;i++){
                console.log("mphka");

                let optionText = document.createTextNode(subject_title[i]);
                options = document.createElement("option");
                options.setAttribute("value", subject_id[i]);
                options.setAttribute("name", subject_id[i]);
                options.setAttribute("id", i+1);
                options.appendChild(optionText);
                
                select.appendChild(options);
                document.getElementById("test").appendChild(select);
            }
        }
    }; 
}
xmlhttp.open("GET","assets/backend/subjectGet.php", true);
xmlhttp.send();



