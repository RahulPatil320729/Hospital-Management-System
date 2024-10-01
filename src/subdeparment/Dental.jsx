import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import {useNavigate } from "react-router-dom";

const Dental=()=>{
    const navigate = useNavigate();
    return(<>

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
                    <Breadcrumb.Item active>Dental</Breadcrumb.Item>
                </Breadcrumb>
            </section>

        <Container className='mb-5'>
            <section>
            <Row className="mt-4"> 
               <Col md={8}>
                    <h2 className='mb-5'>Dental</h2>
                        <Row className="mt-3">
                            <Col md={5} className='mb-4'>
                                <Image src="/images/Depositphotos_5711983_original-400x400.jpg" alt="Dental" fluid />
                            </Col>

  
            <Col md={7}>
                <p className='text-start'>
                We never thought of findin' a place where we belong. Don't have to stand alone, we'll never let you fall. Don't need permission to decide what you believe. You gotta learn something when we meet you after school. I said jump, down on Jump Street. I said jump, down on Jump Street. Your friends will be there when your back is to the wall. You'll find you'll need us cause there's no one else to call. When it was hopeless a decision is what you need. You'd better be ready cause' your runnin' outta time. Say jump, 21 Jump, Street.
                </p>

              <h5 className='text-start'>Contact Detail</h5>
              <p className='text-start'>
                <strong>Email:</strong>  dental@hospitalplus.com <br />
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
                                    <FontAwesomeIcon className="me-2" icon={faChevronRight} />Dental
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

    </>)
}

export default Dental;