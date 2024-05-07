import './App.css';
import React, { useState } from 'react';
import WeatherForm from './WeatherForm';
import WeatherInfo from './WeatherInfo';

function App() {

  const [weather, setWeather] = useState(null);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className='container'>
        <WeatherForm setWeather={setWeather} />
        <WeatherInfo weather={weather} />
      </div>
    </div>
  );
}

export default App;
