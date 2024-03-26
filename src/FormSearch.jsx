import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SearchForm(props) {
    
    const handleInput = (event) => {
        let value = event.target.value;
        props.setCity(value);
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(props.cityVar);
      }

    return(
        <Form>
            <Form.Control type="text" onChange={handleInput}></Form.Control>
            <Button type="submit" onClick={handleSubmit}>Explore!</Button>
        </Form>
    );
}

export default SearchForm;