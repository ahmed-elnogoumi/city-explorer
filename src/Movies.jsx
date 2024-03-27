// Movies.jsx
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Movies({ movies }) {
  return (
    <div>
      <h2>Movies Related to Your Search</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {movies.map((movie, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={movie.poster} alt={movie.title} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  {movie.summary}
                </Card.Text>
                <Button variant="primary" href={movie.infoLink}>Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Movies;
