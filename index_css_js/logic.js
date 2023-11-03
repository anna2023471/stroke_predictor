// Set form variable to retrieve the form from HTML
let paramForm = document.getElementById("paramForm");

    // Add event listener to execute steps when form is submitted
    paramForm.addEventListener("submit", (event) => {

    // Prevent form returning to default state (blank) on submit
    event.preventDefault();

    // Set sex variable to retieve the value of the checked option
    // Check an option has been selected, otherwise display alert
    let sexRadio = document.querySelector('input[name="sex"]:checked')
   
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

    //  Check value is entered AND is a numeric value - otherwise, display message
    if (isNaN(inputAge) || inputAge == "") {
        alert("Please enter valid age")
        let inputAge = document.querySelector('input[name="age"]').value
    }    

    // Set hypertension variable to retrieve the value of the checked option
    // Check an option has been selected, otherwise display alert
    let hypertensionRadio = document.querySelector('input[name="hypertension"]:checked')
    
    if(hypertensionRadio != null) {
        let checkedHypertension = document.querySelector('input[name="hypertension"]:checked').value
        console.log(checkedHypertension); 
    } 
    else {  
        alert("Please select hypertension option");
    }

    // Set heart disease variable to retrieve the value of the checked option
    // Check an option has been selected, otherwise display alert
    let heartdiseaseRadio = document.querySelector('input[name="heartdisease"]:checked')

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

    //  Check value is entered AND is a numeric value - otherwise, display message
    if (isNaN(inputGlucose) || inputGlucose == "") {
        alert("Please enter valid glucose value")
        let inputGlucose = document.querySelector('input[name="glucose"]').value
    }

    // Set BMI variable to equal user input
    let inputBMI = document.querySelector('input[name="bmi"]').value
    console.log(inputBMI);

    //  Check value is entered AND is a numeric value - otherwise, display message
    if (isNaN(inputBMI) || inputBMI == "") {
        alert("Please enter valid BMI value")
        let inputBMI = document.querySelector('input[name="bmi"]').value
    }
    
    // Set smoking variable to retrieve the value of the checked option
    let smokingRadio = document.querySelector('input[name="smoker"]:checked')  

    if(smokingRadio != null) {
        let checkedSmoker = document.querySelector('input[name="smoker"]:checked').value
        console.log(checkedSmoker); 
    } 
    else {  
        alert("Please select smoker option");
    }

    // Set download variable to retrieve the value of the checked option
    let downloadRadio = document.querySelector('input[name="download"]:checked') 

    if(downloadRadio != null) {
    let checkedDownload = document.querySelector('input[name="download"]:checked').value
    console.log(checkedDownload); 
    } 
    else {  
        downloadRadio = 0;
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

    // Create a text version of selected radio values for downloadable csv
    // Sex variable
    let downloadSex = ""
    if (sexRadio.value == 0) {
        downloadSex = "Female"
    } else {
        downloadSex = "Male"
    }
    
    // Hypertension variable
    let downloadHypertension = ""
    if (hypertensionRadio.value == 0) {
        downloadHypertension = "No"
    } else {
        downloadHypertension = "Yes"
    }

    // Heart disease variable
    let downloadHeartDisease = ""
    if (heartdiseaseRadio.value == 0) {
        downloadHeartDisease = "No"
    } else {
        downloadHeartDisease = "Yes"
    }

    // Smoking variable
    let downloadSmoker = ""
    if (smokingRadio.value == 0) {
        downloadSmoker = "No"
    } else {
        downloadSmoker = "Yes"
    }  

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

    // Based on prediction value, display appropriate prediction text on page
    // and change hidden element value for use in downloadable csv
    if (result == 0) {d3.select(".panel-body").html(`NOT AT RISK`);
                    document.getElementById("result-text").value = "No";
    } else {d3.select(".panel-body").html(`AT RISK`);
                    document.getElementById("result-text").value = "Yes";
    }

    // Pull prediction value from hidden element to create downloadable stroke prediction value
    let resultText = document.getElementById("result-text").value
    let downloadResult = ""
    if (resultText == 0) {
    downloadResult = "No"
    } else {
    downloadResult = "Yes"
    }
    console.log(resultText);

    // Collate data for downloadable csv from form inputs and stroke prediction
    let downloadData = [
        {
            Sex: downloadSex,
            Age: inputAge,
            Hypertension: downloadHypertension,
            HeartDisease: downloadHeartDisease,
            Glucose: inputGlucose,
            BMI: inputBMI,
            Smoker: downloadSmoker,
            StrokeRisk: resultText
        }
    ]

    console.log(downloadData);

    // Collate and download csv file of results if user chooses
    if (downloadRadio.value == 1) {
        const csvContent = "data:text/csv;charset=utf-8," +
            Object.keys(downloadData[0]).join(",") + "\n" +
            downloadData.map(entry => Object.values(entry).join(",")).join("\n");

        let encodedUri = encodeURI(csvContent);
        window.open(encodedUri)
    }
    }
    );



// Reset the form to blank when user presses the "Clear" button
document.getElementById("clear").addEventListener("click", (event) => {   
    location.reload(true);
})
});