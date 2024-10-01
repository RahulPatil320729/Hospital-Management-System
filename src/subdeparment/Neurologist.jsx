import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import {useNavigate } from "react-router-dom";


const Neurologist = () => {
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
                    <Breadcrumb.Item active>Neurologist</Breadcrumb.Item>
                </Breadcrumb>
            </section>

            <Container className='mb-5'>
                <section>
                    <Row className="mt-4">
                        <Col md={8}>
                            <h2 className='mb-5'>Neurologist</h2>
                            <Row className="mt-3">
                                <Col md={5} className='mb-4'>
                                    <Image src="/images/Depositphotos_42539851_department.jpg" alt="Neurologist" fluid />
                                </Col>

                                <Col md={7}>
                                    <p className='text-start'>
                                    You unlock this door with the key of imagination. Beyond it is another dimension: a dimension of sound, a dimension of sight, a dimension of mind. You're moving into a land of both shadow and substance, of things and ideas; you've just crossed over into the Twilight Zone.

You unlock this door with the key of imagination. Beyond it is another dimension: a dimension of sound, a dimension of sight, a dimension of mind. You're moving into a land of both shadow and substance, of things and ideas; you've just crossed over into the Twilight Zone.

There is nothing wrong with your television set. Do not attempt to adjust the picture. We are controlling transmission. We will control the horizontal, we will control the vertical. We can change the focus to a soft blur or sharpen it to crystal clarity. For the next hour, sit quietly and we will control all that you see and hear.
                                    </p>

                                    <h5 className='text-start'>Contact Detail</h5>
                                    <p className='text-start'>
                                        <strong>Email:</strong>  neurologist@hospitalplus.com <br />
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
                                <FontAwesomeIcon className="me-2" icon={faChevronRight} />Neurologist
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

export default Neurologist;
