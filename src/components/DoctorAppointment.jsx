import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const DoctorAppointment = () => {
  // Access the doctor ID from Redux state
  const doctorId = useSelector((state) => state.auth.user.id); // Adjust this selector based on your Redux state structure

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the appointment being edited
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [searchName, setSearchName] = useState(''); // Filter by name
  const [searchStatus, setSearchStatus] = useState(''); // Filter by status

  // Fetch the appointment data from the API
  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:8085/appointment/doctor/${doctorId}`)
        .then((response) => {
          setAppointments(response.data);
          setFilteredAppointments(response.data); // Set filtered appointments initially to the full list
        })
        .catch((error) => {
          console.error('There was an error fetching the appointments!', error);
        });
    }
  }, [doctorId]);

  // Handle filtering based on name and status
  useEffect(() => {
    const filtered = appointments.filter((appointment) => {
      return (
        (searchName === '' || appointment.patientName.toLowerCase().includes(searchName.toLowerCase())) &&
        (searchStatus === '' || appointment.appointmentStatus === searchStatus)
      );
    });
    setFilteredAppointments(filtered);
  }, [searchName, searchStatus, appointments]);

  // Function to handle the update of the appointment
  const handleUpdate = (appointmentId) => {
    const updatedAppointment = {
      appointmentStatus: updatedStatus,
      appointmentDate: updatedDate,
    };

    axios
      .put(`http://localhost:8085/appointment/update/${appointmentId}`, updatedAppointment)
      .then((response) => {
        // After successfully updating, fetch the updated appointment data or update the UI
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.appointmentId === appointmentId
              ? { ...appointment, appointmentStatus: updatedStatus, appointmentDate: updatedDate }
              : appointment
          )
        );
        setEditIndex(-1); // Close the edit mode
      })
      .catch((error) => {
        console.error('There was an error updating the appointment!', error);
      });
  };

  // Function to toggle edit mode for a specific appointment
  const handleEditClick = (index, appointment) => {
    setEditIndex(index);
    setUpdatedStatus(appointment.appointmentStatus);
    setUpdatedDate(appointment.appointmentDate);
  };

  return (
    <>
      <section>
        <div className="page-title-wrapper">
          <div className="page-title">
            <div className="container">
              <h2>Appointment</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-3 mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Appointment</Breadcrumb.Item>
        </Breadcrumb>
      </section>

      <section className="container min-vh-100 mb-4"  id='details-form'>
        <div>
          <div className='mb-5'>
            <h2>YOUR APPOINTMENTS</h2>
          </div>
          
          <Row className="mb-4">
            <Col xs={12} md={6} className='mb-2'>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={6} className='mb-2'>
              <InputGroup>
                <Form.Control
                  as="select"
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value="">Filter by status</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="CANCELED">CANCELED</option>
                  <option value="RESCHEDULED">RESCHEDULED</option>
                  <option value="PENDING">PENDING</option>
                </Form.Control>
              </InputGroup>
            </Col>
          </Row>

          {/* Appointments Table */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact No</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment.appointmentId}>
                  <td>{index + 1}.{appointment.appointmentId}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.patientEmail}</td>
                  <td>{appointment.patientAge}</td>
                  <td>{appointment.patientGender}</td>
                  <td>{appointment.patientContactNumber}</td>

                  {editIndex === index ? (
                    <>
                      
                      <td>
                        <Form.Control
                          as="select"
                          value={updatedStatus}
                          onChange={(e) => setUpdatedStatus(e.target.value)}
                        >
                          <option value="SCHEDULED">SCHEDULED</option>
                          <option value="CANCELED">CANCELED</option>
                          <option value="RESCHEDULED">RESCHEDULED</option>
                          <option value="PENDING">PENDING</option>
                        </Form.Control>
                      </td>

                      
                      <td>
                        {updatedStatus === 'RESCHEDULED' ? (
                          <Form.Control
                            type="date"
                            value={updatedDate}
                            onChange={(e) => setUpdatedDate(e.target.value)}
                          />
                        ) : (
                          <span>{appointment.appointmentDate}</span>
                        )}
                      </td>

                      <td>
                        <Button
                          variant="success"
                          onClick={() => handleUpdate(appointment.appointmentId)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditIndex(-1)}
                        >
                          Cancel
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{appointment.appointmentStatus}</td>
                      <td>{appointment.appointmentDate}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleEditClick(index, appointment)}
                        >
                          Edit
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default DoctorAppointment;
