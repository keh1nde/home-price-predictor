
# **Home Price Prediction Service**

## **Table of Contents**

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

---

## **Introduction**

**Author:** Kehinde Adeoso  
**Time Spent:** Approximately 1 week

The **Home Price Prediction Service** is a web application that estimates home prices using Elastic Net Regression. Users can input various features of a house, and the app will predict its market price based on the trained machine learning model.

## **Features**

- **User-Friendly Interface**: A React frontend that allows users to input home features easily.
- **Accurate Predictions**: Utilizes an Elastic Net Regression model trained on a comprehensive housing dataset.
- **Real-Time Estimates**: Instantaneous prediction results displayed to the user.
- **RESTful API**: A Flask backend serving the prediction model via API endpoints.
- **Cross-Origin Support**: Enabled CORS to allow the frontend and backend to communicate seamlessly.

## **Demo**

*To be done*

## **Installation**

### **Prerequisites**

- **Node.js** (version 12.x or higher)
- **Python 3.6** or higher
- **pip** (Python package installer)

### **Clone the Repository**

```bash
git clone https://github.com/yourusername/home-price-prediction-service.git
cd home-price-prediction-service
```

### **Backend Setup**

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Create and activate a virtual environment (optional but recommended):

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use venv\Scripts\activate
    ```

3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask backend server:

    ```bash
    python flask-backend.py
    ```

### **Frontend Setup**

1. Open a new terminal and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install the required Node.js packages:

    ```bash
    npm install
    ```

3. Start the React frontend:

    ```bash
    npm start
    ```

## **Usage**

1. With both the backend and frontend servers running, 
open your web browser and navigate to the following (if it wasn't opened automatically):

    ```
    http://localhost:3000
    ```

2. Fill in the home features in the provided form.

3. Click on the **Estimate Price** button to receive a predicted price.

## **Project Structure**

```
home-price-prediction-service/
├── backend/
│   ├── flask-backend.py
│   ├── requirements.txt
│   ├── elastic_net_model.pkl
│   ├── scaler.pkl
│   └── ...
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── EstimateForm.css
│   │   │   ├── EstimateForm.js
│   │   ├── App.js
│   │   └── ...
│   └── public/
│       └── index.html
├── data/
│   └── housing_data.csv
├── notebooks/
│   ├── hpp-data-cleaning.ipynb
│   └── model_training.ipynb
└── README.md
```

## **Technologies Used**

- **Frontend**:
  - React
  - JavaScript
  - CSS

- **Backend**:
  - Python
  - Flask
  - scikit-learn
  - pandas
  - numpy

- **Machine Learning**:
  - Elastic Net Regression

## **Contributing**

Contributions are welcome! If you'd like:

1. Fork the repository.
2. Create a new branch:

    ```bash
    git checkout -b feature/YourFeature
    ```

3. Commit your changes:

    ```bash
    git commit -m "Add your feature"
    ```

4. Push to the branch:

    ```bash
    git push origin feature/YourFeature
    ```

5. Open a Pull Request.

## **License**

There isn't one, as this is both a passion project and a 
measure of my own skill. Use however you like!

## Disclaimer

This model uses somewhat fictional data from
[this](https://www.kaggle.com/datasets/yasserh/housing-prices-dataset/code) kaggle.
Do not use for any real analysis.

## **Contact Information**

For questions or suggestions, please contact:

- **Kehinde Adeoso**
- **Email**: kehindeadeosoapps@gmail.com
- **GitHub**: [keh1nde](https://github.com/keh1nde)

