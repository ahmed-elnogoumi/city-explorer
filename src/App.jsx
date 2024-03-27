import React, { useState } from 'react';
import './App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Weather from './Weather.jsx';
import Movies from './Movies'; // Ensure you've created this component

const LOCATION_IQ_API_KEY = import.meta.env.VITE_LOCATION_IQ;
const serverURL = import.meta.env.VITE_LOCAL_SERVER;

function App() {
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [weatherAvailable, setWeatherAvailable] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleInput = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getLocation(city);
  };

  const getLocation = async (city) => {
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_API_KEY}&q=${city}&format=json`);
      setResponseData(response.data[0]);
      setError(null); // Clear any previous errors
      if (response.data[0].lat && response.data[0].lon) {
        setWeatherAvailable(true);
        getMovies(city); // Fetch movies data after successfully getting location data
      } else {
        setWeatherAvailable(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch location data: " + error.message);
      setShowModal(true);
      setWeatherAvailable(false);
    }  
  };

  const getMovies = async (city) => {
    try {
      const moviesResponse = await axios.get(`${serverURL}/movies`, {
        params: { search: city }
      });
      setMovies(moviesResponse.data); // Assuming your API returns an array of movies
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies data: " + error.message);
      setShowModal(true);
    }
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter a city name" onChange={handleInput} value={city} />
          <button type="submit">Search</button>
        </form>
      </header>
      <div className="card">
        {responseData.display_name ? (
          <div>
            <p>{responseData.display_name}</p>
            <p>Latitude: {responseData.lat}, Longitude: {responseData.lon}</p>
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${LOCATION_IQ_API_KEY}&center=${responseData.lat},${responseData.lon}&zoom=9`} alt="Map"/>
          </div>
        ) : (
          <p>Please enter a city to search for its weather and related movies.</p>
        )}
        
        {weatherAvailable && <Weather lat={parseFloat(responseData.lat)} lon={parseFloat(responseData.lon)} city={city} />}
      </div>
      
      {movies.length > 0 && <Movies movies={movies} />}
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;