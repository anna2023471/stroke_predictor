// Set form variable to retrieve the form from HTML
let paramForm = document.getElementById("paramForm");



// Create function to validate numeric input, and reject input
// and alert user when input is non-numeric
function validate(value, loc){ 
    document.getElementById(loc).innerHTML="";
    var num=value;  
    if (isNaN(num)){  
      document.getElementById(loc).innerHTML="Please enter a number";  
      return false;  
    }else{  
      return true;  
      }  
    }

    // Add event listener to execute steps when form is submitted
    paramForm.addEventListener("submit", (event) => {

    // Prevent form returning to default state (blank) on submit
    event.preventDefault();

    // Set sex variable to retieve the value of the checked option
    let sexRadio = document.querySelector('input[name="sex"]:checked')
    // let checkedSex = sexRadio.value
    // let checkedSex = document.querySelector('input[name="sex"]:checked').value
    // console.log(checkedSex);
   
    if(sexRadio != null) {
             let checkedSex = document.querySelector('input[name="sex"]:checked')
             console.log(checkedSex); 
    } 
     else {  
             alert("Please select sex");
     }
    
     // Set age variable to equal user input
    let inputAge = document.querySelector('input[name="age"]').value
    console.log(inputAge); 


   
    
    // Validate that age value entered is numeric
    // if (!validate(inputAge, "ageloc"))
    //     return false;


    if (isNaN(inputAge) || inputAge == "") {
        alert("Please enter age")
        let inputAge = document.querySelector('input[name="age"]').value
    } 
        // if (!inputAge == null) {
            
        //     let inputAge = document.querySelector('input[name="age"]').value
                   
        // } else if (inputAge == null) { alert("Please enter age")
        // }
    
        // Validate that age value entered is numeric
    // if (!validate(inputAge, "ageloc"))
    // return false;
    

    // Set hypertension variable to retrieve the value of the checked option
    let hypertensionRadio = document.querySelector('input[name="hypertension"]:checked')
    // let checkedHypertension = document.querySelector('input[name="hypertension"]:checked').value
    // console.log(checkedHypertension)

    if(hypertensionRadio != null) {
        let checkedHypertension = document.querySelector('input[name="hypertension"]:checked').value
        console.log(checkedHypertension); 
    } 
    else {  
        alert("Please select hypertension option");
    }

    // Set heart disease variable to retrieve the value of the checked option
    let heartdiseaseRadio = document.querySelector('input[name="heartdisease"]:checked')
    // let checkedHeartDisease = document.querySelector('input[name="heartdisease"]:checked').value
    // console.log(checkedHeartDisease);

    if(heartdiseaseRadio != null) {
        let checkedHeartDisease = document.querySelector('input[name="heartdisease"]:checked').value
        console.log(checkedHeartDisease); 
    } 
    else {  
        alert("Please select heart disease option");
    }

    // Set glucose variable to equal user input and convert from mmol/L to mg/dL
    let inputGlucose = document.querySelector('input[name="glucose"]').value
    console.log(inputGlucose);
    let convertedGlucose = inputGlucose * 18
    console.log(convertedGlucose);

    // Validate that glucose value entered is numeric
    if (!validate(inputGlucose, "glucoseloc"))
        return false;

    // Set BMI variable to equal user input
    let inputBMI = document.querySelector('input[name="bmi"]').value
    console.log(inputBMI);

    // Validate that BMI value entered is numeric
    if (!validate(inputBMI, "bmiloc"))
        return false;
    
    // Set smoking variable to retrieve the value of the checked option
    let smokingRadio = document.querySelector('input[name="smoker"]:checked')  
    // let checkedSmoker = document.querySelector('input[name="smoker"]:checked').value
    // console.log(checkedSmoker);

    if(smokingRadio != null) {
        let checkedSmoker = document.querySelector('input[name="smoker"]:checked').value
        console.log(checkedSmoker); 
    } 
    else {  
        alert("Please select smoker option");
    }

    // Define the data variable that contains all values to to be sent to Flask for processing
    const data = {"sex": sexRadio.value,
                "age": inputAge,
                "hypertension": hypertensionRadio.value,
                "heart_disease": heartdiseaseRadio.value,
                "avg_glucose_level": convertedGlucose,
                "bmi": inputBMI,
                "smoking_status": smokingRadio.value}

    console.log(data);

    // Create function to post data to Flask endopoint
    postData("http://127.0.0.1:5000/submit", data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("Error", error);
        });

// Use Fetch to post data to Flask as json object
async function postData(url="http://127.0.0.1:5000/submit", data = {}) {
    let response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }) 
    console.log(response)
}

// Use d3 to retrive model prediction from Flask
d3.json("http://127.0.0.1:5000/result").then(function(prediction) {
    console.log(prediction);
    let result = JSON.parse(prediction);
    console.log(result)

    // Based on prediction value, display appropriate prediction text
    if (result == 0) {d3.select(".panel-body").html(`NOT AT RISK`)
    } else {d3.select(".panel-body").html(`AT RISK`)}  
}
);
});

// Reset the form to blank when user presses the "Clear" button
document.getElementById("clear").addEventListener("click", (event) => {   
    location.reload(true)
})
