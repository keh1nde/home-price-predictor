import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
# Initializing the Flask application
app = Flask(__name__)
CORS(app)

# Importing ML model
with open('elastic_net_model.pkl', 'rb') as file:
    model = pickle.load(file)


@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the POST request
    data = request.get_json()

    # Extract features from the input data (ensure this matches your feature set)
    features = [
        data['area'],
        data['bedrooms'],
        data['bathrooms'],
        data['stories'],
        data['mainroad'],
        data['guestroom'],
        data['basement'],
        data['hotwaterheating'],
        data['airconditioning'],
        data['parking'],
        data['prefarea']
    ]

    # Reshape the features to match the input shape expected by the model
    prediction = model.predict([features])

    # Return the prediction as a JSON response
    return jsonify({'predicted_price': prediction[0]})


if __name__ == '__main__':
    app.run(debug=True)
