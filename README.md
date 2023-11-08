# stroke_predictor

## Project Aim

The aim of this project was to use a machine learning model to create a stroke prediction web app that could be used in a basic health screening setting. The app takes in basic demographic and medical information, returns a binary classification of stroke risk (i.e. "at risk" or "not at risk"), and allows the user to download their input and prediction in CSV format. This app could be used in a mobile health screening setting (e.g. at public events, malls, etc.) as it does not require any sophisticated medical tetsing such as blood tests. The most advanced apparatus required by this app is a blood glucose meter and these are already routinely used in such settings. The record of the inputs and prediction could be kept by the individual being assessed, either for their own information or to encourage further follow up with their doctor.

#### Project map
![project_map](https://github.com/anna2023471/stroke_predictor/assets/132623167/132a35c3-6e1a-4f6d-abef-40e2f727db40)

## Data

A clean stroke dataset was obtained from Kaggle at this link https://www.kaggle.com/datasets/prosperchuks/health-dataset?select=stroke_data.csv. The data was balanced across coniditions (stroke and no-stroke) and gender (male and female). 

#### Record distribution by condition
![by_condition](https://github.com/anna2023471/stroke_predictor/assets/132623167/e239309f-869f-4725-848a-5c0de2228302)

#### Record distribution by gender
![by_sex_overall](https://github.com/anna2023471/stroke_predictor/assets/132623167/5b001c20-ffa7-415c-ad26-48070e364874)


#### Gender distribution by condition
![by_sex](https://github.com/anna2023471/stroke_predictor/assets/132623167/3a213d3d-481b-4a35-9eef-492de1208034)


The following data features were retained in creating the model:

    *Sex (male, female)

    *Age (numeric input)

    *Hypertension status (ever had hypertension - yes/no)

    *Heart disease status (ever had heart disease - yes/no)

    *Average glucose level (numeric input)

    *BMI (numeric input)

    *Smoking status (ever smoked - yes/no)

The following features were excluded as they were deemed unhelpful:

    *Marital status (married, not married)

    *Occupation type (never worked, children, self-employed, government, private)

    *Residence type (urban, rural)

Any null values were also removed from the dataset. The final dataset contained 40,907 records.

## Machine Learning Model

### Model details

A sequetial neural network model was chosen. The model was built using Tensorflow Keras and optimised over eight iterations. The number of neurons and hidden layers were adjusted as part of optimisation until satisfactory performance was achieved. The final model consisted of:

    *Four hideen layers (each using the relu activation function)

    *One output layer (using the sigmoid activation function for binary output)

    *8,956 total parameters

The final model achieved:

    *Accuracy of 96.7%

    *Loss of 0.09

### Model Training

The model was trained on 75% of the data (~30,680 records)

The model was tested on 25% of the data (~10,227 records)

All data was scaled prior to training and testing.

## Model implementation

The model was pickled on creation and later loaded into Flask.

A Flask app with two routes was used.

The POST route:

    *receives user input

    *scales the input using the mean and standard deviation from the training data

    *converts the scaled input into a Pandas DataFrame

The GET route:

    *loads the model

    *feeds the DataFrame into the model to generate the prediction

    *returns the prediction

## User Interface

HTML and CSS were used to design a web form to accept user input and display the prediction.

The form consists of numeric input fields and radio buttons for binary selection.

JavaScript (including fetch and d3 are used to send user input to Flask, retrieve the prediction, and allow the user to download the results as a CSV if they wish.

JavaScript is also used to convert the average glucose input from mmol/L to mg/dL. The model accepts average glucose as an mg/dL value. However, a blood glucose meter (rather than a full blood test) is most likely to be used in the settings that this app is designed for. As blood glucose meters provide readings in mmol/L, it was decided to accept user input in mmol/L and convert it to mg/dL before processing.

The form is also validated in JavaScript to ensure that all required values are provided, and that only valid numeric values are entered in the input boxes. If the user fails to provide a required value, or provides it it in the wrong format, an alert appears asking the user to provide the required input; the form does not submit until all required inputs are provided in a valid format. 

If the user ticks the "Download results" box, the prediction is displayed on screen and a csv file with the user's input and their prediction is downloaded on submit. If the user does not tick the box, the prediction is displayed on screen but no download occurs.

Pressing the "Clear" button resets the form to blank.

#### Screenshot of completed form and prediction

![app-screenshot](https://github.com/anna2023471/stroke_predictor/assets/132623167/66255185-3341-40b3-8288-f43d67d32411)

#### Libraries used

   *Pandas

   *Matplotlib

   *d3

#### Languages used

   *Python

   *JavaScript

   *HTML/CSS

#### Repository scrtucture

```tree
|   
+---index_css_js
|      | index.css
|      | index.html
|      | logic.js
|      | 
+---model_flask
|      | app.py
|      | model_creation.ipynb
|      | scaling_constants.py
|      | stroke_model.sav
|      |    
|      +---data
|      |    | stroke_dataset.csv
|      |     
|      +---figures
|      |    | app-screenshot.png
|      |    | by_condition.png
|      |    | by_sex.png
|      |    | by_sex_overall.png
|      |    | project_map.jpg
            




