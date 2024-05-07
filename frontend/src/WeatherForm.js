import React, { useState } from 'react';
import './WeatherForm.css';
import axios from 'axios';

const WeatherForm = ({ setWeather }) => {

  const apiKey = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/weather?city=${city}&api_key=${apiKey}`);
        setWeather(response.data);
        console.log('City:', city);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    } else {
      alert('please enter city')
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;