function calculate (){
   
        let mark1 = Number(document.getElementById("m1").value) 
        let mark2 = Number(document.getElementById("m2").value)
        let mark3 = Number(document.getElementById("m3").value)         
        let mark4 = Number(document.getElementById("m4").value)
        let mark5 = Number(document.getElementById("m5").value)
        let mark6 = Number(document.getElementById("m6").value)
        let mark7 = Number(document.getElementById("m7").value)
        let mark8 = Number(document.getElementById("m8").value);

        let totalMarks = mark1 + mark2 + mark3 + mark4 + mark5 + mark6 + mark7 + mark8;

        let totalText = document.getElementById("total");
        let resultText = document.getElementById("result");

    totalText.innerHTML = "Total Marks: " + totalMarks+ "/800";

    if (totalMarks >= 700) {
        document.getElementById("result").innerHTML = "Distiniction";
        document.getElementById("result").style.color = "green";
    }

    else if (totalMarks >= 600) {
        document.getElementById("result").innerHTML = "First Division";
        document.getElementById("result").style.color = "blue";
    } 
    
    else if (totalMarks >= 500) {
        document.getElementById("result").innerHTML = "Second Division";
        document.getElementById("result").style.color = "orange";
    } 
    
    else if (totalMarks >= 400) {
        document.getElementById("result").innerHTML = "Third Division";  
        document.getElementById("result").style.color = "red";
    }      
    
        
        
       

        
       



}