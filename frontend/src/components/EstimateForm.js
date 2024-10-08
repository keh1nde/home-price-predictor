import React, { useState } from 'react';
import './EstimateForm.css';

const HomeEstimator = () => {
  const [formData, setFormData] = useState({
    area:'',
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
    furnishingStatus: '0',
    totalrooms: '',
    areaperroom: '',
    amenitycount: ''
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

  // Parse numerical values
  const bedrooms = parseInt(formData.bedrooms);
  const bathrooms = parseInt(formData.bathrooms);
  const stories = parseInt(formData.stories);
  const parking = parseInt(formData.parkingSpots);
  const area = parseFloat(formData.area);

  // Calculate values
  const totalRooms = calculateTotalRooms(bedrooms, bathrooms);
  const areaPerRoom = calculateAreaPerRoom(area, totalRooms);
  const amenityCount = calculateAmenityCount(formData);

  // Prepare data to send to backend
  const dataToSend = {
    area: area,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    stories: stories,
    mainroad: formData.mainroad ? 1 : 0,
    guestroom: formData.guestroom ? 1 : 0,
    basement: formData.basement ? 1 : 0,
    hotwaterheating: formData.hotwaterheating ? 1 : 0,
    airconditioning: formData.airconditioning ? 1 : 0,
    parking: parking,
    furnishingstatus: formData.furnishingStatus,
    prefarea: formData.preferredArea ? 1 : 0,
    total_rooms: totalRooms,
    area_per_room: areaPerRoom,
    amenity_count: amenityCount,
  };

  try {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const data = await response.json();
    setPrediction(data.predicted_price);
  } catch (error) {
    console.error('Error:', error);
  }
};


  // Value calculators
  const calculateTotalRooms = (bedrooms,bathrooms) => {
    return bedrooms + bathrooms;
  }

  const calculateAreaPerRoom = (area, totalRooms) => {
    return area / totalRooms;
  }

  const calculateAmenityCount = (formData) => {
    const { airconditioning, hotwaterheating, preferredArea, basement, guestroom, mainroad } = formData;
    return [airconditioning, hotwaterheating, preferredArea, basement, guestroom, mainroad].filter(Boolean).length;
  };

  

  return (
    <div className="estimator-container">
      <h2>Estimate the cost of your home!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-grid">
          <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Total Area"
              className="t-input"
          />
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
          <select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange} className="t-input">
            <option value="0">Unfurnished</option>
            <option value="1">Semi-Furnished</option>
            <option value="2">Fully Furnished</option>
          </select>
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

        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {prediction && <h3>Estimated Price: ${prediction}</h3>}
      <p className="footer">App created by Kehinde Adeoso, visit GitHub <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">here</a></p>
      <p className="disclaimer">App and Model uses somewhat fictional data from <a href="https://www.kaggle.com/datasets/yasserh/housing-prices-dataset"
      target="_blank" rel="noopener noreferrer">this</a> dataset, don't use for real analysis. </p>
    </div>
  );
};

export default HomeEstimator;
