import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import {useNavigate } from "react-router-dom";


const Cardiology = () => {
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
                    <Breadcrumb.Item active>Cardiology</Breadcrumb.Item>
                </Breadcrumb>
            </section>

            <Container className='mb-5'>
                <section>
                    <Row className="mt-4">
                        <Col md={8}>
                            <h2 className='mb-5'>Cardiology</h2>
                            <Row className="mt-3">
                                <Col md={5} className='mb-4'>
                                    <Image src="/images/Depositphotos_24648537_original-400x400.jpg" alt="Cardiology" fluid />
                                </Col>

                                <Col md={7}>
                                    <p className='text-start'>
                                        Here's the story of a lovely lady, who was bringing up three very lovely girls. All of them had hair of
                                        gold, like their mother, the youngest one in curls. Here's the story, of a man named Brady, who was busy
                                        with three boys of his own. They were four men, living all together, yet they were all alone. 'Til the one
                                        day when the lady met this fellow. And they knew much more than a hunch, that this group would somehow form
                                        a family.
                                    </p>

                                    <h5 className='text-start'>Contact Detail</h5>
                                    <p className='text-start'>
                                        <strong>Email:</strong> cardiologi@hospitalplus.com <br />
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
                                <ListGroup.Item className='bg-light'>
                                <FontAwesomeIcon className="me-2" icon={faChevronRight} />Cardiology 
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

export default Cardiology;
