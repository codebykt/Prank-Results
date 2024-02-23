import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Deatils from './details.json'
import Logo from '../clg_logo.png'

function Results() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const regNo = searchParams.get('regNo');
    const Name = Deatils[regNo]
    // console.log(Name)
  
    const [gradesData, setGradesData] = useState({});
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://127.0.0.1:5000/grades');
            if (!response.ok) { 
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setGradesData(data);
          } catch (error) {
            setError(error);
          }
        };
      
        fetchData();
      }, []); // Run only once when component mounts
  
    useEffect(() => {
        if (regNo && gradesData[regNo]) {
            setFilteredData(gradesData[regNo]);
        } else {
            setFilteredData(null);
        }
    }, [regNo, gradesData]);
  
    return (
        <>
            <Container className='mt-5'>
                <Row className='justify-content-center'>
                    <Col className='col-2'>
                    <img src={Logo} height={150} width={150} alt='logo' />
                    </Col>
                    <Col className='col-5 mt-4 justify' style={{ fontSize:'30px' }}>
                        <strong>Prathyusha Engineering College</strong>
                        <br />
                        <strong  style={{fontSize: '20px'}}> &emsp;&emsp;An Autonomous Institution,Thiruvallur</strong>
                    </Col>
                </Row>
            </Container>

            <Container className="mt-5">
                <Row className="justify-content-center">
                <Col className="col-8">
                    {/* <table className='mb-5'>
                    <tr>
                    <th style={{ fontSize: '24px' }}>
                        <td><img src={Logo} height={100} width={100} alt='logo' /> &emsp; Prathyusha Engineering College</td>
                        

                    </th>
                    </tr>
                    <tr>
                        <th style={{fontSize: '20px'}}>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; An Autonumus Institute
                        </th>
                    </tr>
                    </table> */}
                    <Card>
                    <Card.Body>
                        <Card.Title className="text-center mt-2 mb-4"><strong>VII Semester Results</strong></Card.Title>
                        {error ? (
                        <p className="text-danger">Error: {error.message}</p>
                        ) : (
                        <Table striped bordered hover>
                            <thead>

                            <tr>
                                <th>Student Name : {Name}</th>
                            </tr>
                            <tr>
                            <th>Registration Number : {regNo}</th>
                            <th>Semester : VII SEM Only</th>
                            </tr>
                            <tr>
                                <th>Department : Computer Science and Engineering</th>
                            </tr>
                            <tr>
                                <th>Subject Code</th>
                                <th>Grade</th>
                            </tr>

                            </thead>
                            <tbody>

                                {filteredData ? (
                                    Object.entries(filteredData).map(([courseCode, grade]) => (
                                    <tr key={courseCode}>
                                        <td>{courseCode}</td>
                                        <td>{grade}</td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="2" className="text-center">No results found for registration number {regNo}</td>
                                    </tr>
                                )}
                            </tbody>

                        </Table>
                        )}
                    </Card.Body>
                    </Card>
                </Col>
                </Row>
            </Container>
        </>
    );
}

export default Results;
