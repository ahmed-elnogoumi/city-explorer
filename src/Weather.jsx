import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import PropTypes from 'prop-types';

const Weather = ({ lat, lon, city }) => {
  const [weatherData, setWeatherData] = useState({"forecasts" : ["2024-10-10", "Mukilteo"]});
  const [error, setError] = useState(null);

  const fetchWeatherData = async (lat, lon, searchQuery) => {
    const serverURL = import.meta.env.VITE_LOCAL_SERVER;
    try {
      const response = await fetch(`${serverURL}weather?lat=${lat}&lon=${lon}&searchQuery=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setError(null); // Reset error state if fetch is successful
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError('Failed to fetch weather data. Please try again later.'); // Set error state for user feedback
    }
  };

  useEffect(() => {
    if (lat && lon && city) {
      fetchWeatherData(lat, lon, city);
    }
  }, [lat, lon, city]);

  return (
    <div className="weather-component">
      {error ? (
        <p>{error}</p> 
      ) : (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Weather Data for {city}</Accordion.Header>
            <Accordion.Body>
              {weatherData ? (
                <ul>
                  {weatherData.map((forecast, index) => (
                    <li>{forecast.date}: {forecast.description}</li>
                  ))}
                </ul>
              ) : (
                <p>No weather data available</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
};
Weather.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired
};

export default Weather;
