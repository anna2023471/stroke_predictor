import pickle
import pandas as pd

scaled_df = pd.DataFrame({"sex": [1], "age": [23], "hypertention": [1],
                              "heart_disease": [1], "avg_glucose_level": [130],
                              "bmi": [25], "smoking_status": [1]})

model = pickle.load(open('stroke_model.sav', 'rb'))
result = model.predict(scaled_df)

print(result)