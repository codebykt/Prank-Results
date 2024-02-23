import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './clg_logo.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function App() {
  const [regNo, setRegNo] = useState('');

  const handleInputChange = (event) => {
    setRegNo(event.target.value);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col className="col-4">
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" style={{ height: '100px', width: 'auto' }} />
              </div>
              <Card.Title className="text-center mb-4">
                <strong>Student Login</strong>
              </Card.Title>
              <Form>
                <Form.Group controlId="formRegNo">
                  <Form.Label><strong>Registration Number:</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    className="mt-2" 
                    placeholder="Enter Registration Number" 
                    value={regNo} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
                <Link to={`/results?regNo=${regNo}`} className="btn mt-2 btn-primary w-100">
                  Submit
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
