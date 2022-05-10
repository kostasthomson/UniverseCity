<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jscharting.com/2.9.0/jscharting.js"></script>
    <title>Document</title>
</head>
<body>
    
    <?php

        $count = 0;

        $db = new PDO("sqlite:evaluation_form.db");
        $res = $db->query("SELECT * FROM evaluation");
        $row = $res->fetchAll(PDO::FETCH_ASSOC);
        foreach($row as $r) {
            $array[$count] = array("{$r['Subject']}, {$r['Answer1']},{$r['Answer2']},{$r['Answer3']},{$r['Answer4']},{$r['Answer5']}");
            $count++;
        }
    ?>

    

    <h3 id="myh3" style="width:50%; height:300px; margin:0 auto;"></h3>
    <div id="chartDiv" style="width:50%; height:300px; margin:0 auto;"></div>

    <script type="text/javascript">

        var count = <?php echo $count?>;

        window.onload = function(){
            listCreator(count);
        }
        
        //Γεμίζει ένα array με δεδομένα απο DB//
        function arrayFill(){
            var array = new Array();
            var array = <?php echo json_encode($array); ?>;

            return array;
        }

        function listCreator(count){

            var ol = document.createElement("ol");
            ol.setAttribute("id", "subList");
            document.body.appendChild(ol);

            var array = arrayFill();

            var array2 = new Array();
            var arraySubject = new Array();

            for(i=0;i<count;i++){
                var text = array[i].toString();
                var tempText = text.split(",");
               
                array2.push(tempText);
                arraySubject[i] = tempText[0];
            }
            var setSubjects = [...new Set(arraySubject)];
            console.log(setSubjects);
            
            
            for(i=0;i<setSubjects.length;i++){
                
                var button = document.createElement("button");
                button.textContent = setSubjects[i];
                
                button.setAttribute("id", "button" + i);
                button.setAttribute("class", i);
                button.setAttribute("data-value", i);
                
                var li = document.createElement("li");
                li.setAttribute("class", setSubjects[i]);
                li.setAttribute("id", "liItems" + i);
                li.setAttribute("data-value", setSubjects[i]);
                li.appendChild(button);

                document.getElementById("subList").appendChild(li);

                button.onclick = function(){
                    genChart(array2, document.getElementById(this.id).getAttribute("data-value"));
                }   
            }
        }

        //Δημιουργεί τα στατιστικά δεδομένα//
        function genChart(array, index){

            var nameArray = new Array();
            var [r, c] = [array.length, array[0].length - 1]; 
            var stats = Array(r).fill().map(()=>Array(c).fill(0));
            var statsCount = Array(r).fill().map(()=>Array(c).fill(0));
            var avgArray = Array(r).fill().map(()=>Array(c).fill(0));
            
            stats = zeros([r,c]);
            statsCount = zeros([r,c]);
            avgArray = zeros([r,c]);

            for(i=0;i<array.length;i++){

                nameArray[i] = array[i][0];
            }
            setSub = [...new Set(nameArray)];

            document.getElementById("myh3").innerHTML = "";

            var header = document.createElement("HEADER");
            header.setAttribute("id", "myheader");
            document.body.appendChild(header);

            var h = document.getElementById("myh3");
            var text = document.createTextNode(setSub[index]);
            h.appendChild(text);

            document.getElementById("myheader").appendChild(h);

            

            for(k=0;k<array.length;k++){
                for(i=0;i<array.length;i++){
                    if(setSub[k] == array[i][0]){ 
                        for(j=1;j<array[i].length;j++){
                            var temp = Number.parseInt(array[i][j]);
                            stats[k][j-1] += temp;
                            statsCount[k][j-1]++;
                        }
                    }
                }
            }
            
            for(i=0;i<setSub.length;i++){
                for(j=1;j<array[i].length;j++){
                    avgArray[i][j-1] = stats[i][j-1] / statsCount[i][j-1];
                }
            }
            console.log(typeof(avgArray[1]));
            console.log(stats);
            console.log(statsCount);

            JSC.Chart('chartDiv', {
                type: 'horizontal column',
                series: [
                {
                    points: [
                        {x: "asd", y: avgArray[index][0]},
                        {x: "Πως κρίνετε την συνολική οργάνωση του μαθήματος(πρόγραμμα,ενημέρωση,εκπαιδυετικό υλικό);", y: avgArray[index][1]},
                        {x: "Εφόσον μέχρι σήμερα έχετε παρακολουθήσει το σύνολο των παραδόσεων, θεωρείτε ότι έχετε κατανοήσει τις βασικές έννοιες και μπορείτε να αξιοποιήσετε τις γνώσεις σας;", y: avgArray[index][2]},
                        {x: "Ο διδάσκοντας οργανώνει καλά την παρουσίαση της ύλη στα μαθήματα;", y: avgArray[index][3]},
                        {x: "Ο διδάσκοντας ήταν συνεπείς στις υποχρεώσεις του(πχ έγκαιρη διόρθωση εργασιών,ώρες συνεργασίας με τους φοιτητές)", y: avgArray[index][4]}
                    ]
                }
                ]
            });  
        }

        function zeros(dimensions) {
            var array = [];

            for (var i = 0; i < dimensions[0]; ++i) {
                array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
            }

            return array;
        }
    </script>

</body>
</html>


