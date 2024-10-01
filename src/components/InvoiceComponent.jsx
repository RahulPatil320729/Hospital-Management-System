import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const InvoiceComponent = () => {
  const doctorId = useSelector((state) => state.auth.user.id); // Fetching the doctor ID from Redux state
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]); // State for filtered results
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    totalAmount: '',
  });

  const [filters, setFilters] = useState({
    patientId: '',
    patientName: '',
  });

  // Fetch the appointment data from the API
  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:8085/appointment/doctor/${doctorId}`)
        .then((response) => {
          setAppointments(response.data);
          setFilteredAppointments(response.data); // Set initial filtered data
        })
        .catch((error) => {
          console.error('There was an error fetching the appointments!', error);
        });
    }
  }, [doctorId]);

  // Handle filter input changes for patient ID and name
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    filterAppointments({ ...filters, [name]: value });
  };

  // Filter appointments based on patient ID and name
  const filterAppointments = (filterCriteria) => {
    const { patientId, patientName } = filterCriteria;
    const filtered = appointments.filter((appointment) =>
      appointment.patientId.toString().includes(patientId) &&
      appointment.patientName.toLowerCase().includes(patientName.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  // Handle form input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for creating an invoice
  const handleSubmit = () => {
    const invoiceDetails = {
      patientId: selectedAppointment.patientId,
      doctorId: selectedAppointment.doctorId,
      totalAmount: invoiceData.totalAmount,
    };

    // Send the invoice details to the backend
    axios
      .post('http://localhost:8085/invoice/create', invoiceDetails)
      .then((response) => {
        console.log('Invoice created:', response.data);
        setShowModal(false); // Close the modal on success
      })
      .catch((error) => {
        console.error('Error creating invoice:', error);
      });
  };

  // Handle the Edit Invoice button click
  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setInvoiceData({
      totalAmount: '', // Reset the modal's form data
    });
    setShowModal(true);
  };

  return (
    <>

    <section>
        <div className="page-title-wrapper">
          <div className="page-title">
            <div className="container">
              <h2>Invoice</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-3 mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Invoice</Breadcrumb.Item>
        </Breadcrumb>
      </section>


    <section className="container min-vh-100 mb-4"  id='details-form'>
      <div>
        <div className='mb-5'>
          <h2>INVOICE</h2>
        </div>

        {/* Filter Section with side-by-side filters */}
        <Form>
          <Row className="mb-4">
            <Col className="mb-2">
              <Form.Group controlId="filterPatientId">
                <Form.Control
                  type="text"
                  name="patientId"
                  value={filters.patientId}
                  onChange={handleFilterChange}
                  placeholder="Enter Patient ID"
                />
              </Form.Group>
            </Col>
            <Col className="mb-2">
              <Form.Group controlId="filterPatientName">
                <Form.Control
                  type="text"
                  name="patientName"
                  value={filters.patientName}
                  onChange={handleFilterChange}
                  placeholder="Enter Patient Name"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Table responsive="sm" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Edit Invoice</th>
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
                    Edit Invoice
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for editing invoice details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="totalAmount">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                name="totalAmount"
                value={invoiceData.totalAmount}
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
            Save Invoice
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
    </>
  );
};

export default InvoiceComponent;
