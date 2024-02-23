import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../clg_logo.png';

function Login() {
  const [regNo, setRegNo] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the results page with registration number as query parameter
    window.location.href = `/results?regNo=${regNo}`;
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col className=' col-4'>
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" style={{ height: '100px', width: 'auto' }} />
              </div>
              <Card.Title className="text-center mb-4"><strong>Student Login</strong></Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formRegNo">
                  <Form.Label><strong>Registration Number:</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    className='mt-2' 
                    placeholder="Enter Registration Number" 
                    value={regNo} 
                    onChange={(e) => setRegNo(e.target.value)} 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2 w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
