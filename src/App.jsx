import { useState } from 'react'
import './App.css'
import FormSearch from './FormSearch.jsx'

import axios from 'axios';

//Note to self: const varibles must be kept capitalized to avoid confusion with variables.
const LOCATION_IQ_API_KEY = import.meta.env.LOCATION_IQ;

function App() {
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  const handleInput = (event) => {
    let value = event.target.value;
    setCity(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getLocation(city);
  }

  const getLocation = async (city) => {
    let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_API_KEY}&q=${city}&format=json`);
    console.log(response);
    setResponseData(response.data[0]);
  }

  return (
    <>
      <header>
        <form>
          <input type="text" placeholder="Enter a city name" onChange={handleInput} />
          <button onClick={handleSubmit}>
            Search
          </button>
        </form>
      </header>
      <div className="card">
        {responseData.display_name
        ? <ol>
            <p>{responseData.display_name}</p>
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${LOCATION_IQ_API_KEY}&center=${responseData.lat},${responseData.lon}&zoom=9`}/>
          </ol>
        : <p>Please Click the button</p>
        }
        <button onClick={() => handleNext(responseData?.next)}>Next</button>
      </div>
    </>
  )
}

export default App
