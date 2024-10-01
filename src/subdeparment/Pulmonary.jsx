import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from "react-router-dom"; 


const Pulmonary = () => {
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
                    <Breadcrumb.Item active>Pulmonary</Breadcrumb.Item>
                </Breadcrumb>
            </section>

            <Container className='mb-5'>
                <section>
                    <Row className="mt-4">
                        <Col md={8}>
                            <h2 className='mb-5'>Pulmonary</h2>
                            <Row className="mt-3">
                                <Col md={5} className='mb-4'>
                                    <Image src="/images/Depositphotos_10069934_original-400x400.jpg" alt="Pulmonary" fluid />
                                </Col>

                                <Col md={7}>
                                    <p className='text-start'>
                                    Life is like a hurricane here in Duckburg. Race cars, lasers, aeroplanes - it's a duck blur. You might solve a mystery or rewrite history - Duck Tales, Oo-oo! Tales of derring-do, bad and good luck tales, oo-oo! D-d-d-danger, watch behind you - there's a stranger out to find you! What to do? Just grab onto some Duck Tales, oo-oo! Not pony tails or cotton tails but Duck Tales, oo-oo! When it seems they're headed for the final curtain Bold deduction never fails, that's for certain The worst of messes become successes!
                                    </p>

                                    <h5 className='text-start'>Contact Detail</h5>
                                    <p className='text-start'>
                                        <strong>Email:</strong> pulmonary@hospitalplus.com<br />
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
                                    Pediatric
                                </ListGroup.Item>
                                <ListGroup.Item className='bg-light' onClick={() => navigate("/traumatology")}>
                                    Traumatology
                                </ListGroup.Item>
                                <ListGroup.Item onClick={() => navigate("/xray")}>
                                    Xray
                                </ListGroup.Item>
                                <ListGroup.Item className='bg-light' onClick={() => navigate("/pulmonary")}>
                                <FontAwesomeIcon className="me-2" icon={faChevronRight} />Pulmonary
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </section>
            </Container>
        </>
    );
}

export default Pulmonary;
