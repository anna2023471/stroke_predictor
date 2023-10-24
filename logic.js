let paramForm = document.getElementById("paramForm");

paramForm.addEventListener("submit", (event) => {

    event.preventDefault();

    let checkedSex = document.querySelector('input[name="sex"]:checked').value
    console.log(checkedSex);

    let inputAge = document.querySelector('input[name="age"]').value
    console.log(inputAge);
    
    let checkedHypertension = document.querySelector('input[name="hypertension"]:checked').value
    console.log(checkedHypertension)

    let checkedHeartDisease = document.querySelector('input[name="heartdisease"]:checked').value
    console.log(checkedHeartDisease);

    let inputGlucose = document.querySelector('input[name="glucose"]').value
    console.log(inputGlucose);

    let inputBMI = document.querySelector('input[name="bmi"]').value
    console.log(inputBMI);
    
    let checkedSmoker = document.querySelector('input[name="smoker"]:checked').value
    console.log(checkedSmoker);

    const data = {"sex": checkedSex,
                "age": inputAge,
                "hypertension": checkedHypertension,
                "heart_disease": checkedHeartDisease,
                "avg_glucose_level": inputGlucose,
                "bmi": inputBMI,
                "smoking_status": checkedSmoker}

    console.log(data);

    postData("http://127.0.0.1:5000/submit", data)
        .then((response) => {
            console.log(response);
        });
        // .catch((error) => {
        //     console.error("Error", error);
        // });


async function postData(url="http://127.0.0.1:5000/submit", data = {}) {
    let response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    // let result = response.json()
    // console.log(result)
    
    // return await response.json();
}

d3.json("http://127.0.0.1:5000/result").then(function(prediction) {
    console.log(prediction);
    let result = JSON.parse(prediction);
    console.log(result)

    if (result == 0) {d3.select(".panel-body").html(`Not at risk`)
    } else {d3.select(".panel-body").html(`At risk`)}  
}


);

// let result = prediction.json()
// console.log(result)
});
    

