import React, { useState } from 'react';
import './EstimateForm.css';

const HomeEstimator = () => {
  const [formData, setFormData] = useState({
    price: '',
    bedrooms: '',
    bathrooms: '',
    stories: '',
    parkingSpots: '',
    totalRooms: '',
    areaPerRoom: '',
    amenityCount: '',
    mainroad: false,
    guestroom: false,
    basement: false,
    hotwaterheating: false,
    airconditioning: false,
    preferredArea: false,
    furnishingStatus: '0'
  });

  // Handle input change
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // For now, log the data, or pass it to your backend here
  };

  return (
    <div className="estimator-container">
      <h2>Home Estimator: Estimate the cost of your home!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-grid">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
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
          <input
            type="number"
            name="totalRooms"
            value={formData.totalRooms}
            onChange={handleChange}
            placeholder="Total Rooms"
            className="t-input"
          />
          <input
            type="number"
            name="areaPerRoom"
            value={formData.areaPerRoom}
            onChange={handleChange}
            placeholder="Area per Room"
            className="t-input"
          />
          <input
            type="number"
            name="amenityCount"
            value={formData.amenityCount}
            onChange={handleChange}
            placeholder="Amenity Count"
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
      <p className="footer">App created by Kehinde Adeoso, visit my GitHub <a href="https://github.com/keh1nde" target="_blank" rel="noopener noreferrer">here</a></p>
    </div>
  );
};

export default HomeEstimator;
