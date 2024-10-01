import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import {useNavigate } from "react-router-dom";


const Pediatric = () => {
    const navigate = useNavigate();
    return (
        <>
            <section>
                <div className="page-title-wrapper">
                    <div className="page-title">
                        <div className="container">
                            <h2>Departments</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className='container pt-3'>
                <Breadcrumb>
                    <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="http://localhost:3000/departments">Departments</Breadcrumb.Item>
                    <Breadcrumb.Item active>Pediatric</Breadcrumb.Item>
                </Breadcrumb>
            </section>

            <Container className='mb-5'>
                <section>
                    <Row className="mt-4">
                        <Col md={8}>
                            <h2 className='mb-5'>Pediatric</h2>
                            <Row className="mt-3">
                                <Col md={5} className='mb-4'>
                                    <Image src="/images/Depositphotos_11882261_original-400x400.jpg" alt="Pediatric" fluid />
                                </Col>

                                <Col md={7}>
                                    <p className='text-start'>
                                    One thousand years ago, superstition and the sword ruled. It was a time of darkness. It was a world of fear. It was the age of gargoyles. Stone by day, warriors by night, we were betrayed by the humans we had sworn to protect, frozen in stone by a magic spell for a thousand years. Now, here in Manhattan, the spell is broken, and we live again! We are defenders of the night! We are Gargoyles!
                                    </p>

                                    <h5 className='text-start'>Contact Detail</h5>
                                    <p className='text-start'>
                                        <strong>Email:</strong> pediatric@hospitalplus.com<br />
                                        <strong>Phone:</strong> +1 600 200 111 <br />
                                        <strong>Phone:</strong> +1 600 200 112
                                    </p>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={4}>
                            <h3>Other Departments</h3>
                            <ListGroup variant="flush">
                                <ListGroup.Item onClick={() => navigate("/urology")}>
                                    Urology
                                </ListGroup.Item>
                                <ListGroup.Item className='bg-light' onClick={() => navigate("/cardiology")}>
                                    Cardiology 
                                </ListGroup.Item>
                                <ListGroup.Item onClick={() => navigate("/dental")}>
                                    Dental
                                </ListGroup.Item>
                                <ListGroup.Item className='bg-light' onClick={() => navigate("/neurologist")}>
                                    Neurologist
                                </ListGroup.Item>
                                <ListGroup.Item onClick={() => navigate("/pediatric")}>
                                <FontAwesomeIcon className="me-2" icon={faChevronRight} />Pediatric
                                </ListGroup.Item>
                                <ListGroup.Item className='bg-light' onClick={() => navigate("/traumatology")}>
                                    Traumatology
                                </ListGroup.Item>
                                <ListGroup.Item onClick={() => navigate("/xray")}>
                                    Xray
                                </ListGroup.Item>
                                <ListGroup.Item className='bg-light' onClick={() => navigate("/pulmonary")}>
                                    Pulmonary
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </section>
            </Container>
        </>
    );
}

export default Pediatric;
