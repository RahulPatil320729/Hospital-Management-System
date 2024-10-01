import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const PrescriptionsComponent = () => {
  // Access the doctor ID from Redux state
  const doctorId = useSelector((state) => state.auth.user.id);

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [medications, setMedications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    medicationId: '',
    quantity: '',
  });

  // Filter state
  const [filterPatientId, setFilterPatientId] = useState('');
  const [filterPatientName, setFilterPatientName] = useState('');

  // Sorting state
  const [isSortAsc, setIsSortAsc] = useState(true); // Ascending by default

  // Fetch the appointment data from the API
  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:8085/appointment/doctor/${doctorId}`)
        .then((response) => {
          setAppointments(response.data);
          setFilteredAppointments(response.data); // Set filtered appointments to all appointments initially
        })
        .catch((error) => {
          console.error('There was an error fetching the appointments!', error);
        });
    }
  }, [doctorId]);

  // Filter appointments by patientId and patientName
  useEffect(() => {
    const filtered = appointments.filter((appointment) =>
      (filterPatientId === '' || appointment.patientId.toString().includes(filterPatientId)) &&
      (filterPatientName === '' || appointment.patientName.toLowerCase().includes(filterPatientName.toLowerCase()))
    );
    setFilteredAppointments(filtered);
  }, [filterPatientId, filterPatientName, appointments]);

  // Sorting function
  const handleSortByName = () => {
    const sortedAppointments = [...filteredAppointments].sort((a, b) => {
      const nameA = a.patientName.toLowerCase();
      const nameB = b.patientName.toLowerCase();
      if (nameA < nameB) return isSortAsc ? -1 : 1;
      if (nameA > nameB) return isSortAsc ? 1 : -1;
      return 0;
    });

    setIsSortAsc(!isSortAsc); // Toggle sort order
    setFilteredAppointments(sortedAppointments); // Update filtered list with sorted data
  };

  // Fetch medications from the API when the modal is opened
  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    axios
      .get('http://localhost:8085/Medications/getAllMedicationDetails')
      .then((response) => {
        setMedications(response.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error('There was an error fetching the medications!', error);
      });
  };

  // Handle form input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const prescriptionDetails = {
      patientId: selectedAppointment.patientId,
      doctorId: selectedAppointment.doctorId,
      medicationId: prescriptionData.medicationId,
      quantity: prescriptionData.quantity,
    };

    axios
      .post('http://localhost:8085/prescription/savePrescription', prescriptionDetails)
      .then((response) => {
        console.log('Prescription saved:', response.data);
        setShowModal(false); // Close the modal on success
      })
      .catch((error) => {
        console.error('Error saving prescription:', error);
      });
  };

  return (
    <>
      <section>
        <div className="page-title-wrapper">
          <div className="page-title">
            <div className="container">
              <h2>Prescription</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-3 mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Prescription</Breadcrumb.Item>
        </Breadcrumb>
      </section>

      <section className="container min-vh-100 mb-4"  id='details-form'>
        <div className='mb-5'>
          <h2>PRESCRIPTION</h2>
        </div>

        {/* Filter Section */}
        <Row className="mb-4">
          <Col xs={12} md={6} className="mb-2">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Filter by Patient ID"
                value={filterPatientId}
                onChange={(e) => setFilterPatientId(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={6} className="mb-2">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Filter by Patient Name"
                value={filterPatientName}
                onChange={(e) => setFilterPatientName(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Responsive Table */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Patient ID</th>
              <th onClick={handleSortByName} style={{ cursor: 'pointer' }}>
                Name {isSortAsc ? '▲' : '▼'} {/* Display sort direction */}
              </th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Edit Prescription</th>
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
                    Edit Prescription
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {/* Modal for editing prescription */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="medicationId">
              <Form.Label>Medication</Form.Label>
              <Form.Control
                as="select"
                name="medicationId"
                value={prescriptionData.medicationId}
                onChange={handleInputChange}
              >
                <option value="">Select Medication</option>
                {medications.map((medication) => (
                  <option key={medication.medicationId} value={medication.medicationId}>
                    {medication.medicationName} - {medication.dosage}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={prescriptionData.quantity}
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
            Save Prescription
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrescriptionsComponent;
