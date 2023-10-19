let paramForm = document.getElementById("paramForm");
// console.log(paramForm);

paramForm.addEventListener("submit", (event) => {

    // const checkedRadios = document.querySelectorAll('input[type="radio"]:checked')
    // const values = Array.from(checkedRadios, radio => radio.value)

    // console.log(values);

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

    let userInput = [checkedSex, inputAge, checkedHypertension, inputGlucose, checkedHeartDisease, checkedSmoker, inputBMI]
    console.log(userInput);

    event.preventDefault();
});

// let sex = document.querySelector("input[name=sex]:checked").value;
// console.log(sex);

// let age = document.getElementsByName("age").value
// let hypertension = document.getElementsByName("hypertension").value
// let heartDisease = document.getElementsByName("heartDisease").value
// let glucose = document.getElementsByName("glucose").value
// let bmi = document.getElementsByName("bmi").value
// let smoker = document.getElementsByName("smoker").value
    


// paramForm.submit();



// if (sex.value == "" || age.value == "" ||
//     hypertension.value == "" || heartDisease.value == "" ||
//     glucose.value == "" || bmi.value == "" || smoker.value == "") {
//         alert("Please complete all fields");}
// else alert("Hurrah");
// console.log(params);    

