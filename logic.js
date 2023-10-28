let paramForm = document.getElementById("paramForm");

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

paramForm.addEventListener("submit", (event) => {

    event.preventDefault();

    let checkedSex = document.querySelector('input[name="sex"]:checked').value
    console.log(checkedSex);

    // if (!isNull(checkedSex, "sexloc"))
    //     return false;

    let inputAge = document.querySelector('input[name="age"]').value
    console.log(inputAge);
    
    if (!validate(inputAge, "ageloc"))
        return false;
    
    let checkedHypertension = document.querySelector('input[name="hypertension"]:checked').value
    console.log(checkedHypertension)

    let checkedHeartDisease = document.querySelector('input[name="heartdisease"]:checked').value
    console.log(checkedHeartDisease);

    let inputGlucose = document.querySelector('input[name="glucose"]').value
    console.log(inputGlucose);
    let convertedGlucose = inputGlucose * 18
    console.log(convertedGlucose);

    if (!validate(inputGlucose, "glucoseloc"))
        return false;

    let inputBMI = document.querySelector('input[name="bmi"]').value
    console.log(inputBMI);

    if (!validate(inputBMI, "bmiloc"))
        return false;
    
    let checkedSmoker = document.querySelector('input[name="smoker"]:checked').value
    console.log(checkedSmoker);

    const data = {"sex": checkedSex,
                "age": inputAge,
                "hypertension": checkedHypertension,
                "heart_disease": checkedHeartDisease,
                "avg_glucose_level": convertedGlucose,
                "bmi": inputBMI,
                "smoking_status": checkedSmoker}

    console.log(data);

    postData("http://127.0.0.1:5000/submit", data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("Error", error);
        });


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

d3.json("http://127.0.0.1:5000/result").then(function(prediction) {
    console.log(prediction);
    let result = JSON.parse(prediction);
    console.log(result)

    if (result == 0) {d3.select(".panel-body").html(`NOT AT RISK`)
    } else {d3.select(".panel-body").html(`AT RISK`)}  
}
);
});

document.getElementById("clear").addEventListener("click", (event) => {   
    location.reload(true)
})
