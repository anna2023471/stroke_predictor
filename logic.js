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
    let checkedSex = document.querySelector('input[name="sex"]:checked').value
    console.log(checkedSex);

    // Set age variable to equal user input
    let inputAge = document.querySelector('input[name="age"]').value
    console.log(inputAge);
    
    // Validate that age value entered is numeric
    if (!validate(inputAge, "ageloc"))
        return false;
    
    // Set hypertension variable to retrieve the value of the checked option
    let checkedHypertension = document.querySelector('input[name="hypertension"]:checked').value
    console.log(checkedHypertension)

    // Set heart disease variable to retrieve the value of the checked option
    let checkedHeartDisease = document.querySelector('input[name="heartdisease"]:checked').value
    console.log(checkedHeartDisease);

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
    let checkedSmoker = document.querySelector('input[name="smoker"]:checked').value
    console.log(checkedSmoker);

    // Define the data variable that contains all values to to be sent to Flask for processing
    const data = {"sex": checkedSex,
                "age": inputAge,
                "hypertension": checkedHypertension,
                "heart_disease": checkedHeartDisease,
                "avg_glucose_level": convertedGlucose,
                "bmi": inputBMI,
                "smoking_status": checkedSmoker}

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
