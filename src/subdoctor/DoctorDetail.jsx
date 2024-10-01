import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorList from './DoctorList';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux'; // Import useSelector

const DoctorDetail = () => {
  const { doctoreId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [sameSpecializationDoctors, setSameSpecializationDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Modal for login prompt
  const [appointmentDate, setAppointmentDate] = useState('');

  const navigate = useNavigate(); // For navigation to the login page if needed

  // Get the patient ID from Redux store
  const patientId = useSelector(state => state.auth.user ? state.auth.user.id : null); // Adjust according to your Redux state

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        // Fetch the selected doctor by ID
        const response = await axios.get(`http://localhost:8085/doctor/getAllDoctorDetails/${doctoreId}`);
        setDoctor(response.data);

        // Fetch other doctors with the same specialization
        const sameSpecDoctors = await axios.get(`http://localhost:8085/doctor/getDoctorsBySpecialization/${response.data.doctorSpecialization}`);
        
        // Filter out the currently selected doctor
        const filteredDoctors = sameSpecDoctors.data.filter(doc => doc.doctoreId !== parseInt(doctoreId));
        setSameSpecializationDoctors(filteredDoctors);

      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctor();
  }, [doctoreId]);

  const handleBookAppointment = () => {
    if (!patientId) {
      // If user is not logged in, show the login prompt modal
      setShowLoginModal(true);
    } else {
      // If user is logged in, show the appointment booking modal
      setShowModal(true);
    }
  };

  const handleSubmitAppointment = () => {
    if (!appointmentDate || !patientId || !doctor) {
      console.error('Please complete all fields.');
      return;
    }

    const appointmentDetails = {
      patientId: patientId, // Use patient ID from Redux
      doctorId: doctor.id,
      appointmentDate: appointmentDate,
    };
    
    axios.post('http://localhost:8085/appointment/saveAppointment', appointmentDetails)
      .then((response) => {
        console.log('Appointment booked:', response.data);
        setShowModal(false);
        // Optionally, refresh or update the appointment data
      })
      .catch((error) => {
        console.error('Error booking appointment:', error);
      });
  };

  const handleLoginRedirect = () => {
    // Redirect to login page
    navigate('/login');
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section>
        <div className="page-title-wrapper">
          <div className="page-title">
            <div className="container">
              <h2>Doctors</h2>
            </div>
          </div>
        </div>
      </section>

      <section className='container pt-3'>
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="http://localhost:3000/doctors">Doctors</Breadcrumb.Item>
          <Breadcrumb.Item active>{doctor.doctorName}</Breadcrumb.Item>
        </Breadcrumb>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img variant="top" className="custom-card-img w-100" src={doctor.img} alt={doctor.doctorName} />
          </div>
          <div className="col-md-8">
            <h2>{doctor.doctorName}</h2>
            <p><strong>{doctor.doctorSpecialization}</strong></p>
            <p>{doctor.description}</p>
            <p className='text-start'><i className="bi bi-envelope"> : </i>{doctor.email}</p>
            <p className='text-start'><i className="bi bi-telephone-fill"> : </i>{doctor.doctorContactNumber}</p>
            <Button variant="primary" onClick={handleBookAppointment}>BOOK APPOINTMENT</Button>
          </div>
        </div>
        <div className='mt-5'>
          {/* <h4>Other Doctors in {doctor.doctorSpecialization}</h4> */}
          <h4>Doctors in {doctor.doctorSpecialization}</h4>
          <DoctorList doctors={sameSpecializationDoctors} filter={doctor.doctorSpecialization} />
        </div>
      </div>

      {/* Modal for booking an appointment */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="appointmentDate">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitAppointment}>
            Book Appointment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for login prompt */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to log in to book an appointment. Please log in first.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLoginRedirect}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DoctorDetail;
