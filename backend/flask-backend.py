import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
# Initializing the Flask application
app = Flask(__name__)
CORS(app)

# Importing ML model
with open('elastic_net_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Importing Scalars
with open('scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)


@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request
    data = request.get_json()

    # Extract features from the input data
    area = int(data['area']),
    bedrooms = int(data['bedrooms']),
    bathrooms = int(data['bathrooms']),
    stores = int(data['stories']),
    mainroad = int(data['mainroad']),
    guestroom = int(data['guestroom']),
    basement = int(data['basement']),
    hotwaterheating = int(data['hotwaterheating']),
    airconditioning = int(data['airconditioning']),
    parking = int(data['parking']),
    prefarea = int(data['prefarea']),
    furnishingstatus = int(data['furnishingstatus']),
    total_rooms = int(data['total_rooms']),
    area_per_room = float(data['area_per_room']),
    amenity_count =int(data['amenity_count'])

    # Preparing a dataframe for scaled data
    input_data = {
        'price': [0], # Dummy value, will not be used
        'area': [area],
        'area_per_room': [area_per_room]
    }

    # Creating Dataframe
    import pandas as pd
    input_df = pd.DataFrame(input_data)

    # Scaling area and area_per_room using scaler
    scaled_values = scaler.transform(input_df)

    # Setting scaled features
    scaled_columns = ['price', 'area', 'area_per_room']

    # Extracting scaled features
    scaled_area = scaled_values[0][scaled_columns.index('area')]
    scaled_area_per_room = scaled_values[0][scaled_columns.index('area_per_room')]

    # Preparing feature list
    features = [
        scaled_area,  # Scaled 'area'
        bedrooms,
        bathrooms,
        stories,
        mainroad,
        guestroom,
        basement,
        hotwaterheating,
        airconditioning,
        parking,
        prefarea,
        furnishingstatus,
        total_rooms,
        scaled_area_per_room,  # Scaled 'area_per_room'
        amenity_count
    ]

    # Make prediction
    prediction_scaled = model.predict([features])

    # Inverse transform the predicted 'price' to get the original value
    # Prepare a DataFrame with the scaled 'price' and dummy values for other scaled columns
    output_df = pd.DataFrame({
        'price': [prediction_scaled[0]],
        'area': [0],  # Dummy value
        'area_per_room': [0]  # Dummy value
    })

    original_values = scaler.inverse_transform(output_df)
    predicted_price = original_values[0][scaled_columns.index('price')]

    # Return the prediction as a JSON response
    return jsonify({'predicted_price': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
