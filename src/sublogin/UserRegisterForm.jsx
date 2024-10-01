import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Nav, Tab, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './login.module.css';

const UserRegisterForm = () => {
    // State for managing the modal visibility
    const [showModal, setShowModal] = useState(false);

    // State to store the base64 string of the doctor image
    const [doctorImageBase64, setDoctorImageBase64] = useState('');

    // Function to convert image file to base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Function to handle image change event
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            console.log(base64); // Log to verify the base64 string
            setDoctorImageBase64(base64); // Set the base64 string to the state
        }
    };

    // Function to handle closing the modal
    const handleCloseModal = () => setShowModal(false);

    // Function to handle showing the modal
    const handleShowModal = () => setShowModal(true);

    // Validation schema for Patient form
    const patientValidationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        patientAge: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
        patientGender: Yup.string().required('Gender is required'),
        patientAddress: Yup.string().required('Address is required'),
        patientContactNumber: Yup.string()
            .matches(/^\d+$/, "Contact number must contain only digits")
            .min(9, 'Contact number must be at least 9 digits')
            .max(11, 'Contact number must be at most 11 digits')
            .required('Contact number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    // Validation schema for Doctor form
    const doctorValidationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        doctorSpecialization: Yup.string().required('Specialization is required'),
        doctorContactNumber: Yup.string()
            .matches(/^\d+$/, "Contact number must contain only digits")
            .min(9, 'Contact number must be at least 9 digits')
            .max(11, 'Contact number must be at most 11 digits')
            .required('Contact number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        description: Yup.string().required('Description is required'),
    });

    // Formik setup for Patient form
    const patientFormik = useFormik({
        initialValues: {
            name: '',
            patientAge: '',
            patientGender: '',
            patientAddress: '',
            patientContactNumber: '',
            email: '',
            password: '',
        },
        validationSchema: patientValidationSchema,
        onSubmit: (values, { resetForm }) => {
            axios.post('http://localhost:8085/api/savePatient', values)
                .then(response => {
                    // alert('Patient registered successfully!');
                    resetForm();
                    handleShowModal();
                })
                .catch(error => {
                    console.error('There was an error registering the patient!', error);
                });
        },
    });

    // Formik setup for Doctor form
    const doctorFormik = useFormik({
        initialValues: {
            name: '',
            doctorSpecialization: '',
            doctorContactNumber: '',
            email: '',
            password: '',
            description: '',
            img: '',

        },
        validationSchema: doctorValidationSchema,
        onSubmit: (values, { resetForm }) => {

            // Add the image base64 string to the form data
            const doctorData = {
                ...values,
                img: doctorImageBase64, // Include the base64 image string
            };

            axios.post('http://localhost:8085/doctor/saveDoctor', doctorData)
                .then(response => {
                    // alert('Doctor registered successfully!');
                    resetForm();
                    handleShowModal();
                })
                .catch(error => {
                    console.error('There was an error registering the doctor!', error);
                });
        },
    });

    return (
        <section className={styles.loginsection}>
            <div className={styles.registerform}>
                <Tab.Container defaultActiveKey="patient">
                    <Nav variant="tabs" className='mb-4 justify-content-center'>
                        <Nav.Item>
                            <Nav.Link eventKey="patient">Patient Registration</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="doctor">Doctor Registration</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Container className='col-md-12'>
                        <Tab.Content>
                            {/* Patient Registration Form */}
                            <Tab.Pane eventKey="patient">
                                <Form onSubmit={patientFormik.handleSubmit}>
                                    <Form.Group as={Row} controlId="name" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Name
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={patientFormik.values.name}
                                                onChange={patientFormik.handleChange}
                                                onBlur={patientFormik.handleBlur}
                                                placeholder="Enter your full name"
                                                isInvalid={!!patientFormik.errors.name && patientFormik.touched.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {patientFormik.errors.name}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="patientAge" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Age
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="number"
                                                name="patientAge"
                                                value={patientFormik.values.patientAge}
                                                onChange={patientFormik.handleChange}
                                                onBlur={patientFormik.handleBlur}
                                                placeholder="Enter your age"
                                                isInvalid={!!patientFormik.errors.patientAge && patientFormik.touched.patientAge}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {patientFormik.errors.patientAge}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="patientGender" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Gender
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                as="select"
                                                name="patientGender"
                                                value={patientFormik.values.patientGender}
                                                onChange={patientFormik.handleChange}
                                                onBlur={patientFormik.handleBlur}
                                                isInvalid={!!patientFormik.errors.patientGender && patientFormik.touched.patientGender}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {patientFormik.errors.patientGender}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="patientAddress" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Address
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                name="patientAddress"
                                                value={patientFormik.values.patientAddress}
                                                onChange={patientFormik.handleChange}
                                                onBlur={patientFormik.handleBlur}
                                                placeholder="Enter your address"
                                                isInvalid={!!patientFormik.errors.patientAddress && patientFormik.touched.patientAddress}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {patientFormik.errors.patientAddress}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="patientContactNumber" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Contact
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="tel"
                                                name="patientContactNumber"
                                                value={patientFormik.values.patientContactNumber}
                                                onChange={patientFormik.handleChange}
                                                onBlur={patientFormik.handleBlur}
                                                placeholder="Enter your contact number"
                                                isInvalid={!!patientFormik.errors.patientContactNumber && patientFormik.touched.patientContactNumber}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {patientFormik.errors.patientContactNumber}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="email" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Email
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={patientFormik.values.email}
                                                onChange={patientFormik.handleChange}
                                                onBlur={patientFormik.handleBlur}
                                                placeholder="Enter your email"
                                                isInvalid={!!patientFormik.errors.email && patientFormik.touched.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {patientFormik.errors.email}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="password" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Password
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={patientFormik.values.password}
                                                onChange={patientFormik.handleChange}
                                                onBlur={patientFormik.handleBlur}
                                                placeholder="Enter your password"
                                                isInvalid={!!patientFormik.errors.password && patientFormik.touched.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {patientFormik.errors.password}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Col sm={{ span: 12 }} className='mt-4'>
                                            <Button variant="primary" type="submit">
                                                Register
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Tab.Pane>

                            {/* Doctor Registration Form */}
                            <Tab.Pane eventKey="doctor">
                                <Form onSubmit={doctorFormik.handleSubmit}>
                                    <Form.Group as={Row} controlId="name" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Name
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={doctorFormik.values.name}
                                                onChange={doctorFormik.handleChange}
                                                onBlur={doctorFormik.handleBlur}
                                                placeholder="Enter your full name"
                                                isInvalid={!!doctorFormik.errors.name && doctorFormik.touched.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {doctorFormik.errors.name}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="doctorSpecialization" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Specialization
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                as="select"
                                                name="doctorSpecialization"
                                                value={doctorFormik.values.doctorSpecialization}
                                                onChange={doctorFormik.handleChange}
                                                onBlur={doctorFormik.handleBlur}
                                                placeholder="Enter your specialization"
                                                isInvalid={!!doctorFormik.errors.doctorSpecialization && doctorFormik.touched.doctorSpecialization}
                                            >
                                            <option value="Cardiology">Cardiology</option>
                                            <option value="Dental">Dental</option>
                                            <option value="Neurolgy">Neurology</option>
                                            <option value="Pediatrics">Pediatrics</option>
                                            <option value="Pulmonary">Pulmonary</option>
                                            <option value="Traumatology">Traumatology</option>
                                            <option value="Urology">Urology</option>
                                            <option value="Xray">Xray</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {doctorFormik.errors.doctorSpecialization}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="doctorContactNumber" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Contact
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="tel"
                                                name="doctorContactNumber"
                                                value={doctorFormik.values.doctorContactNumber}
                                                onChange={doctorFormik.handleChange}
                                                onBlur={doctorFormik.handleBlur}
                                                placeholder="Enter your contact number"
                                                isInvalid={!!doctorFormik.errors.doctorContactNumber && doctorFormik.touched.doctorContactNumber}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {doctorFormik.errors.doctorContactNumber}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="email" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Email
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={doctorFormik.values.email}
                                                onChange={doctorFormik.handleChange}
                                                onBlur={doctorFormik.handleBlur}
                                                placeholder="Enter your email"
                                                isInvalid={!!doctorFormik.errors.email && doctorFormik.touched.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {doctorFormik.errors.email}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="password" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Password
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={doctorFormik.values.password}
                                                onChange={doctorFormik.handleChange}
                                                onBlur={doctorFormik.handleBlur}
                                                placeholder="Enter your password"
                                                isInvalid={!!doctorFormik.errors.password && doctorFormik.touched.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {doctorFormik.errors.password}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="description" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Description
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                as="textarea"
                                                name="description"
                                                value={doctorFormik.values.description}
                                                onChange={doctorFormik.handleChange}
                                                onBlur={doctorFormik.handleBlur}
                                                placeholder="Enter a description"
                                                isInvalid={!!doctorFormik.errors.description && doctorFormik.touched.description}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {doctorFormik.errors.description}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                        {/* Image Upload Field */}
                                        <Form.Group as={Row} controlId="img" className='mb-3'>
                                        <Form.Label column sm={3} className='d-flex flex-start'>
                                            Upload Image
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="file"
                                                name="img"
                                                accept="img/*"
                                                onChange={handleImageChange} // Handle image change event
                                            />
                                        </Col>
                                    </Form.Group>


                                    <Form.Group as={Row}>
                                        <Col sm={{ span: 12}} className='mt-4'>
                                            <Button variant="primary" type="submit">
                                                Register
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Container>
                </Tab.Container>
            </div>

            {/* Modal for Success Message */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The user has been registered successfully! 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default UserRegisterForm;
