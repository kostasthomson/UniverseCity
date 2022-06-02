let result_array = [];
let array = [];
let button;
let subjects = [];
let questions = ['Η συνολική απόδοση του διδάσκοντα ήταν καλή;', 'Η ποιότητα του μαθήματος ήταν υψηλή;', 'Η οργάνωση και παρουσίαση του μαθήματος ήταν άρτια;', 'Το αντικείμενο του μαθήματος ήταν ενδιαφέρον και χρήσιμο για τις σπουδές σας;', 'Το διδακτικό υλικό (βιβλία, σημειώσεις, ασκήσεις, άρθρα κ.λπ.) ήταν επαρκές για τις ανάγκες του μαθήματος;', 'Ο καθηγητής ερχόταν στο μάθημα προετοιμασμένος;', 'Η μεταδοτικότητα του διδάσκοντα ήταν καλή;', 'Ενθάρρυνε τις ερωτήσεις και ευρύτερα τη συμμετοχή στο μάθημα;', 'Όποτε χρειάστηκα να λύσω απορίες/προβλήματα βρήκα τον καθηγητή στις ώρες γραφείου του;', 'Ο διδάσκων ήταν συνεπής στις παρουσίες του στα μαθήματα;', 'Η ποιότητα του φροντιστηριακού μαθήματος ήταν υψηλή;', 'Η συνολική απόδοση του επικουρικού διδακτικού προσωπικού ήταν καλή;'];

window.onload = () => {
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if (dbResult != "Query failed"){
              result_array = dbResult.split(".");

              result_array.forEach(r => {
                let temp = r.split(",");
                array.push(temp.slice(1, temp.length-2));
                let subject_id = temp[0];
                let subject_title = temp[temp.length-1];

                let subject_object = {
                  "id": subject_id,
                  "title": subject_title
                };

                let flag = true;
                for(i=0;i<subjects.length;i++){
                  if(subjects[i].id == subject_object.id){
                    flag= false;
                    break;
                  }
                }
                if(flag){
                  subjects.push(subject_object);
                }
              });

              buttonCreator();
                
            }
        }
    };
    xmlhttp.open("GET", "assets/backend/evaluation_results.php",true);
    xmlhttp.send();
  }

  
  function buttonCreator(){

    var div = document.getElementById("card_id");
    subjects.forEach(r => {

      button = document.createElement("button");
      button.setAttribute("idSubject", r.id);
      button.setAttribute("id", "btn");
      button.setAttribute("class", "btn btn-primary");
      button.setAttribute("onclick", "calcVotes()");
      button.innerHTML = r.title;
      div.appendChild(button);
      
    });
  }

  function calcVotes(){

    console.log(array);
    let results = [];
    for(let i = 0; i < 12; i++) {
      let counter = {
          "0": 0,
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0
      }
      array.forEach(row => {
          counter[row[i]]++; 
      })
      results.push(counter);
    }

    console.log(results);

    var divGet = document.getElementById("card_id");
    let count=0;
    for(let i=0;i<12;i++){
        var options = {
          series: [results[i][0],results[i][1],results[i][2],results[i][3],results[i][4],results[i][5]],
          chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['0', '1', '2', '3', '4', '5'],
        title: {
          text: questions[i]
        },
        colors: ['#8ECAE6', '#219EBC', '#023047', '#FFB703', '#FB8500', '#8A0202'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        let divChart = document.createElement("div");
        divChart.setAttribute("class", "chart");
        divChart.setAttribute("id", "chart" + [i]);

        if(i % 2 == 0){
          var divChartContainer = document.createElement("div");
          divChartContainer.setAttribute("class", "chartContainer");
          divChartContainer.setAttribute("id", "chartContainer" + [i]);
          divChartContainer.appendChild(divChart);
        }
        else{
          divChartContainer.appendChild(divChart);
        }

        divGet.appendChild(divChartContainer);

        console.log(options.series[i]);

        var chart = new ApexCharts(document.querySelector("#chart" + [i]), options);
        chart.render();
    }
  }
  
    

    






  
