from flask import Flask, jsonify, request
import pickle
import pandas as pd

# Import variables for scaling input
from scaling_constants import sex_mean, sex_std, age_mean, age_std, hypertension_mean, hypertension_std,\
heart_disease_mean, heart_disease_std, glucose_mean, glucose_std, bmi_mean, bmi_std, smoker_mean, smoker_std

# Create app
app = Flask(__name__)

# Create global list to access inputs dataframe across functions
temp_df = []
    
# Create POST route and function to retrieve data from webpage form submission
@app.route('/submit', methods=['POST'])

def submit():

    # Get the posted data and turn into dataframe
    inputs = request.get_json(force=True)
    unscaled_df = pd.json_normalize(inputs)

    # Scale inputs using mean and SD values from training set
    scaled_sex = (unscaled_df["sex"].astype(float) - sex_mean) / sex_std
    scaled_age = (unscaled_df["age"].astype(float) - age_mean) / age_std
    scaled_hypertension = (unscaled_df["hypertension"].astype(float) - hypertension_mean) / hypertension_std
    scaled_heart_disease = (unscaled_df["heart_disease"].astype(float) - heart_disease_mean) / heart_disease_std
    scaled_glucose = (unscaled_df["avg_glucose_level"].astype(float) - glucose_mean) / glucose_std
    scaled_bmi = (unscaled_df["bmi"].astype(float) - bmi_mean) / bmi_std
    scaled_smoker = (unscaled_df["smoking_status"].astype(float) - smoker_mean) / smoker_std

    # Combine scaled data into a dataframe and append to global list
    scaled_df = pd.DataFrame({"sex": scaled_sex, "age": scaled_age, "hypertension": scaled_hypertension,
                              "heart_disease": scaled_heart_disease, "avg_glucose_level": round(scaled_glucose,2),
                              "bmi": scaled_bmi, "smoking_status": scaled_smoker})
    temp_df.append(scaled_df)

    # Create dummy value to return (this response is received as opaque due to cors being disabled in Fetch, so
    # is not read)
    output = scaled_df["age"].tolist()
    json_output = {"age": output}

    # Jsonify output, add Access Control header, and return dummy
    response = jsonify(json_output)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Create GET route and function to run submitted data through model and return prediction to webpage
@app.route('/result', methods=['GET'])

def result():

    # Extract dataframe of inputs generated in POST
    input_data = temp_df.pop()

    # Load tensorflow model and generate prediction 
    model = pickle.load(open('stroke_model.sav', 'rb'))
    result = model.predict(input_data)
    print(result)

    # Access and format result value
    output = result[0][0]
    rounded_output = round(output)
    print(rounded_output)
    response_data = rounded_output
    print(response_data)

    # jsonify response, add Access Control header, and return
    response = jsonify(response_data)
    print(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
# Run app
if __name__ == "__main__":
    app.run(debug=True)




