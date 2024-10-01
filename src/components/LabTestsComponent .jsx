import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const LabTestsComponent = () => {
  const doctorId = useSelector((state) => state.auth.user.id);

  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [labTestData, setLabTestData] = useState({
    testName: '',
    result: '',
  });
  
  const [filterId, setFilterId] = useState(''); // For filtering by patient ID
  const [filterName, setFilterName] = useState(''); // For filtering by patient Name

  // Fetch the appointment data from the API
  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:8085/appointment/doctor/${doctorId}`)
        .then((response) => {
          console.log('Appointments data:', response.data);
          setAppointments(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the appointments!', error);
        });
    }
  }, [doctorId]);

  // Handle opening the modal and setting the selected appointment
  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  // Handle form input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLabTestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const labTestDetails = {
      patientId: selectedAppointment.patientId,
      testName: labTestData.testName,
      result: labTestData.result,
    };

    // Send the lab test details to the backend
    axios
      .post('http://localhost:8085/labTest/save', labTestDetails)
      .then((response) => {
        console.log('Lab Test saved:', response.data);
        setShowModal(false); // Close the modal on success
      })
      .catch((error) => {
        console.error('Error saving lab test:', error);
      });
  };

  // Filter appointments based on patientId and patientName
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientId.toString().includes(filterId) &&
      appointment.patientName.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <>
      <section>
        <div className="page-title-wrapper">
          <div className="page-title">
            <div className="container">
              <h2>Lab Test</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-3 mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Lab Test</Breadcrumb.Item>
        </Breadcrumb>
      </section>

      <section className="container min-vh-100 mb-4"  id='details-form'>
        <div>
          <div className="mb-5">
            <h2>LAB TEST</h2>
          </div>

          {/* Filter inputs side by side */}
          <Row className="mb-4">
            <Col md={6} className="mb-2">
              <Form.Control
                type="text"
                placeholder="Filter by Patient ID"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
              />
            </Col>
            <Col md={6} className="mb-2">
              <Form.Control
                type="text"
                placeholder="Filter by Patient Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </Col>
          </Row>

          {filteredAppointments.length === 0 && <p>No appointments found.</p>}


          <Table responsive="sm" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Edit Lab Test</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment.appointmentId}>
                  <td>{index + 1}</td>
                  <td>{appointment.patientId}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.patientEmail}</td>
                  <td>{appointment.patientAge}</td>
                  <td>{appointment.patientGender}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEditClick(appointment)}>
                      Edit Lab Test
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal for editing lab test details */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Lab Test</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="testName">
                <Form.Label>Test Name</Form.Label>
                <Form.Control
                  type="text"
                  name="testName"
                  value={labTestData.testName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="result">
                <Form.Label>Result</Form.Label>
                <Form.Control
                  type="text"
                  name="result"
                  value={labTestData.result}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Lab Test
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};

export default LabTestsComponent;
