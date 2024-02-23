import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Deatils from './details.json';
import Logo from '../clg_logo.png';

function Results() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const regNo = searchParams.get('regNo');
    const Name = Deatils[regNo];

    const [gradesData, setGradesData] = useState({});
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [showTimer, setShowTimer] = useState(false);
    const [timer, setTimer] = useState(3);
    const [prank, setPrank] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        setShowTimer(true);
        setButtonClicked(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://prank-results-backend-1.onrender.com/grades');
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
    }, []);

    useEffect(() => {
        if (regNo && gradesData[regNo]) {
            setFilteredData(gradesData[regNo]);
        } else {
            setFilteredData(null);
        }
    }, [regNo, gradesData]);

    useEffect(() => {
        let interval;
        if (showTimer) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showTimer]);

    useEffect(() => {
        if (timer === 0) {
            setShowTimer(false);
            setPrank(false);
        }
    }, [timer]);

    return (
        <>
            {prank ? (
                <>
                    <Container className='mt-5'>
                        <Row className='justify-content-center'>
                            <Col xs={12} sm={12} md={6} lg={8} className='col-12 col-sm-12'>
                                <img src={Logo} height={150} width={150} alt='logo' />
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={8} className='col-12 col-sm-12 mt-4 justify' style={{ fontSize:'30px' }}>
                                <strong>Prathyusha Engineering College</strong>
                                <br />
                                <strong style={{fontSize: '20px'}}> &emsp;&emsp;An Autonomous Institution,Tiruvallur</strong>
                            </Col>
                        </Row>
                    </Container>


                    <Container className="mt-5">
                        <Row className="justify-content-center">
                            <Col xs={12} sm={12} md={10} lg={8}>
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
                        <Row className='justify-content-center mb-5'>
                            <Col xs={12} sm={8} md={6} lg={4}>
                                {buttonClicked ? (
                                    <Button style={{width: "100%"}} className='btn-danger' disabled onClick={handleClick}>Re-check Results</Button>
                                ) : (
                                    <Button style={{width: "100%"}} className='btn-danger' onClick={handleClick}>Re-check Results</Button>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                <Container fluid style={{ padding: 0 }}>
                    <iframe
                        width="100%"
                        height="800px"
                        src="https://www.youtube.com/embed/EV_4XTVJhWw?autoplay=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay"
                    ></iframe>
                </Container>
            )}

            {showTimer && (
                <Container className="mt-3">
                    <Row className="justify-content-center">
                        <Col className="col-8 text-center">
                            <p>Re-checking Results -> {timer} seconds</p>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default Results;
