import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from "react-router-dom";


const Urology = () => {
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
                    <Breadcrumb.Item active>Urology</Breadcrumb.Item>
                </Breadcrumb>
            </section>

            <Container className='mb-5'>
                <section>
                    <Row className="mt-4">
                        <Col md={8}>
                            <h2 className='mb-5'>Urology</h2>
                            <Row className="mt-3">
                                <Col md={5} className='mb-4'>
                                    <Image src="/images/Depositphotos_42548065_original-400x400.jpg" alt="Urology" fluid />
                                </Col>

                                <Col md={7}>
                                    <p className='text-start'>
                                    They're creepy and they're kooky, mysterious and spooky. They're all together ooky, the Addams Family. Their house is a museum where people come to see 'em. They really are a scream, the Addams Family. Neat. Sweet. Petite. So get a witches shawl on, a broomstick you can crawl on. We're gonna pay a call on the Addams Family.
                                    </p>

                                    <h5 className='text-start'>Contact Detail</h5>
                                    <p className='text-start'>
                                        <strong>Email:</strong> urology@hospitalplus.com<br />
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
                                <FontAwesomeIcon className="me-2" icon={faChevronRight} /> Urology
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

export default Urology;
