import { useState } from 'react'
import './App.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import axios from 'axios'

//Note to self: const varibles must be kept capitalized to avoid confusion with variables.
const LOCATION_IQ_API_KEY = import.meta.env.VITE_LOCATION_IQ;

function App() {
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [showModal, setShowModal] = useState(false); // State for the modal

  const handleInput = (event) => {
    let value = event.target.value;
    setCity(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getLocation(city);
  }

  const getLocation = async (city) => {
    try {
      let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_API_KEY}&q=${city}&format=json`);
      console.log(response);
      setResponseData(response.data[0]);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set the error message
      setShowModal(true); // Show the modal
    }  
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
        ? <div>
            <p>{responseData.display_name}</p>
            <p>x: {responseData.lat} y: {responseData.lon}</p>
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${LOCATION_IQ_API_KEY}&center=${responseData.lat},${responseData.lon}&zoom=9`}/>
          </div>
        : <p>Please Click the button</p>
        }
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default App