let user = JSON.parse(sessionStorage.getItem("user"));
let subjects = JSON.parse(sessionStorage.getItem("subjects"));

console.log(user);
console.log(subjects);

let separatedArray = [[]];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const dbResult = this.responseText;
        if (dbResult != "Query failed") {

            const result_array = dbResult.split(",");

            for(let i=0; i<result_array.length; i++){
                let temp = result_array[i].split(".")
                separatedArray.push(temp);
                separatedArray[i].splice(4, 1);
            }
            separatedArray.shift();
            separatedArray.pop();

            chartCreator();
            console.log(separatedArray);

        }
    };
}
xmlhttp.open("GET", "assets/backend/student_statistics.php?AM=" + user.AM, true);
xmlhttp.send();

function chartCreator(){

    chartSumCreator();

    var divGet = document.getElementById("card_id");

    for(let i=0;i<separatedArray.length;i++){

        let result = (parseInt(separatedArray[i][1]) / parseInt(separatedArray[i][2])) * 100;
        result = parseFloat(result.toFixed(2));

        var options = {
            series: [result, 100 - result],
            chart: {
                width: 580,
                height: 305,
                type: 'pie',
            },
            labels: ['Πόσα μαθήματα παρακολούθησες', 'Πόσα μαθήματα δεν παρευρέθηκες'],
            title: {
                text: separatedArray[i][3] + "(" + separatedArray[i][0] + ")",
                align: 'center',
                style: {
                color:  '#366c77'
                },
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

      if (i % 2 == 0) {
        var divChartContainer = document.createElement("div");
        divChartContainer.setAttribute("class", "chartContainer");
        divChartContainer.setAttribute("id", "chartContainer" + [i]);
        divChartContainer.appendChild(divChart);
      }
      else {
        divChartContainer.appendChild(divChart);
      }

      divGet.appendChild(divChartContainer);

      var chart = new ApexCharts(document.querySelector("#chart" + [i]), options);
      chart.render();
      
    }
}

function chartSumCreator(){

    let divGetSum = document.getElementById("card_id");

    let sumArrival = 0;
    let sumLessons = 0;

    for(let i=0;i<separatedArray.length;i++){

        sumArrival += parseInt(separatedArray[i][1]);
        sumLessons += parseInt(separatedArray[i][2]);
    }

    let result = (parseInt(sumArrival) / parseInt(sumLessons)) * 100;
    result = parseFloat(result.toFixed(2)); 

    console.log(result);

    var options = {
        series: [result, 100 - result],
        chart: {
            width: 580,
            height: 305,
            type: 'pie',
        },
        labels: ['Πόσα μαθήματα παρακολούθησες συνολικά', 'Πόσα μαθήματα δεν παρευρέθηκες συνολικά'],
        title: {
            text: "Ποσοστιαίο άθροισμα παρακολούθησης μαθημάτων",
            align: 'center',
            style: {
            color:  '#366c77'
            },
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

    let divChartSum = document.createElement("div");
    divChartSum.setAttribute("class", "chartSum");
    divChartSum.setAttribute("id", "chartSum");

    let divChartContainerSum = document.createElement("div");
    divChartContainerSum.setAttribute("class", "chartContainerSum");
    divChartContainerSum.setAttribute("id", "chartContainerSum");
    divChartContainerSum.appendChild(divChartSum);

    divGetSum.appendChild(divChartContainerSum);

    var chartSum = new ApexCharts(document.querySelector("#chartSum"), options);
    chartSum.render();
}