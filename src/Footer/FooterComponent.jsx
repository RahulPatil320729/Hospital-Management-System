import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Form, FormControl, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const FooterComponent = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h5>About Us</h5>
                        <p>
                            We are a leading hospital dedicated to providing excellent healthcare services with compassion and expertise.
                        </p>
                        <ListGroup>
                            <ListGroupItem className="bg-transparent border-0 text-white">
                                <a href="#about" className="text-white">Learn More</a>
                            </ListGroupItem>
                            <ListGroupItem className="bg-transparent border-0 text-white">
                                <a href="#careers" className="text-white">Careers</a>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col md={4} className="mb-4">
                        <h5>Quick Links</h5>
                        <ListGroup>
                            <ListGroupItem className="bg-transparent border-0 text-white">
                                <a href="/home" className="text-white">Home</a>
                            </ListGroupItem>
                            <ListGroupItem className="bg-transparent border-0 text-white">
                                <a href="/departments" className="text-white">Departments</a>
                            </ListGroupItem>
                            <ListGroupItem className="bg-transparent border-0 text-white">
                                <a href="/services" className="text-white">Services</a>
                            </ListGroupItem>
                            <ListGroupItem className="bg-transparent border-0 text-white">
                                <a href="/contact" className="text-white">Contact Us</a>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col md={4} className="mb-4">
                        <h5>Contact Us</h5>
                        <Form>
                            <FormControl type="email" placeholder="Your Email" className="mb-2" />
                            <Button variant="primary">Subscribe</Button>
                        </Form>
                        <h5 className="mt-4">Follow Us</h5>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Your Phoenix Hospital. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default FooterComponent;
