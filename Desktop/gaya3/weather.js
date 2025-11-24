npx create-react-app weather-app
cd weather-app
npm install axios

weather.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=882652214a94139b0270d74e730d40d5`
      );
      setWeatherData(response.data);
      console.log(response.data); // check console for full data
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
     fetchData(); // Optional: fetch default weather on load
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button type="submit" style={{ padding: '8px' }}>
          Get Weather
        </button>
      </form>

      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
          <p>📝 Description: {weatherData.weather[0].description}</p>
          <p>🤒 Feels like: {weatherData.main.feels_like}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>📈 Pressure: {weatherData.main.pressure} hPa</p>
          <p>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
        </>
      ) : (
        <p>No weather data yet. Try searching a city above ☁️</p>
      )}
    </div>
  );
};

export default Weather;


app.js

import React from 'react';
import Weather from './Weather';

const App = () => {
  return (
    <div>
      <h1>🌦️ Weather Forecast App</h1>
      <Weather />
    </div>
  );
};

export default App;
