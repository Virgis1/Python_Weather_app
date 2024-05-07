import React from 'react';

const WeatherInfo = ({ weather }) => {
  return (
    <div>
      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>Weather: {weather.weather}</p>
          <p>Temperature: {weather.temperature}</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;