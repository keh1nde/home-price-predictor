import React, { useState } from 'react';
import './EstimateForm.css';

const HomeEstimator = () => {
  const [formData, setFormData] = useState({
    bedrooms: '',
    bathrooms: '',
    stories: '',
    parkingSpots: '',
    totalRooms: '',
    mainroad: false,
    guestroom: false,
    basement: false,
    hotwaterheating: false,
    airconditioning: false,
    preferredArea: false,
    furnishingStatus: '0'
  });

  const [prediction, setPrediction] = useState(null); // State to store prediction result

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Send form data as JSON
      });

      const data = await response.json();
      setPrediction(data.predicted_price); // Assuming the backend returns the prediction as 'predicted_price'
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="estimator-container">
      <h2>Estimate the cost of your home!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-grid">
          <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="t-input">
            <option value="">Number of Bedrooms</option>
            {[1, 2, 3, 4].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <select name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="t-input">
            <option value="">Number of Bathrooms</option>
            {[1, 2, 3, 4].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <select name="stories" value={formData.stories} onChange={handleChange} className="t-input">
            <option value="">Stories</option>
            {[1, 2, 3, 4].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <select name="parkingSpots" value={formData.parkingSpots} onChange={handleChange} className="t-input">
            <option value="">Parking Spots</option>
            {[0, 1, 2].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <input
            type="number"
            name="totalRooms"
            value={formData.totalRooms}
            onChange={handleChange}
            placeholder="Total Rooms"
            className="t-input"
          />
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="mainroad"
                checked={formData.mainroad}
                onChange={handleChange}
              /> Main Road
            </label>
            <label>
              <input
                type="checkbox"
                name="guestroom"
                checked={formData.guestroom}
                onChange={handleChange}
              /> Guest Room
            </label>
            <label>
              <input
                type="checkbox"
                name="basement"
                checked={formData.basement}
                onChange={handleChange}
              /> Basement
            </label>
            <label>
              <input
                type="checkbox"
                name="hotwaterheating"
                checked={formData.hotwaterheating}
                onChange={handleChange}
              /> Hot Water Heating
            </label>
            <label>
              <input
                type="checkbox"
                name="airconditioning"
                checked={formData.airconditioning}
                onChange={handleChange}
              /> Air Conditioning
            </label>
            <label>
              <input
                type="checkbox"
                name="preferredArea"
                checked={formData.preferredArea}
                onChange={handleChange}
              /> Preferred Area
            </label>
          </div>
          <select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} className="t-input">
            <option value="0">Unfurnished</option>
            <option value="1">Semi-Furnished</option>
            <option value="2">Fully Furnished</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {prediction && <h3>Estimated Price: ${prediction}</h3>}
      <p className="footer">App created by &lt;name&gt;, visit GitHub <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">here</a></p>
    </div>
  );
};

export default HomeEstimator;
