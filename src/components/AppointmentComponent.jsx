import Breadcrumb from 'react-bootstrap/Breadcrumb';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store

const AppointmentComponent = () => {
  const [appointment, setAppointment] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [labTest, setLabTest] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]); 
  const [prescriptionError, setPrescriptionError] = useState(false);
  const [labTestError, setLabTestError] = useState(false);
  const [appointmentError, setAppointmentError] = useState(false);
  const [medicalHistoryError, setMedicalHistoryError] = useState(false); 
  const [invoice, setInvoice] = useState([]);
  const [invoiceError, setInvoiceError] = useState(false); 

  const userId = useSelector((state) => state.auth.user.id); // Get the logged-in user ID from the Redux store

  // Fetch Appointment Data
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8085/appointment/patient/${userId}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setAppointment(response.data);
            setAppointmentError(false);
          } else {
            setAppointmentError(true);
            setAppointment([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching appointment data:', error);
          setAppointmentError(true);
          setAppointment([]);
        });
    }
  }, [userId]);

  // Fetch Prescription Data
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8085/prescription/prescriptionGetById/${userId}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setPrescription(response.data);
            setPrescriptionError(false);
          } else {
            setPrescriptionError(true);
            setPrescription([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching prescription data:', error);
          setPrescriptionError(true);
          setPrescription([]);
        });
    }
  }, [userId]);

  // Fetch Lab Test Data
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8085/labTest/getLabTestsByPatientId/${userId}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setLabTest(response.data);
            setLabTestError(false);
          } else {
            setLabTestError(true);
            setLabTest([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching lab test data:', error);
          setLabTestError(true);
          setLabTest([]);
        });
    }
  }, [userId]);

  // Fetch Medical History Data
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8085/medicalHistory/medicalHistoryByPatientId/${userId}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setMedicalHistory(response.data);
            setMedicalHistoryError(false);
          } else {
            setMedicalHistoryError(true);
            setMedicalHistory([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching medical history data:', error);
          setMedicalHistoryError(true);
          setMedicalHistory([]);
        });
    }
  }, [userId]);

  // Fetch Invoice Data
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8085/invoice/patient/${userId}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setInvoice(response.data);
            setInvoiceError(false);
          } else {
            setInvoiceError(true);
            setInvoice([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching invoice data:', error);
          setInvoiceError(true);
          setInvoice([]);
        });
    }
  }, [userId]);


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
        <div className="container table-responsive">
          <h4 className="mt-4">Appointment Details</h4>
          {appointmentError ? (
            <p>No appointment details available. Please consult your doctor.</p>
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Appointment Id</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointment.map((appointment) => (
                  <tr key={appointment.appointmentId}>
                    <td>{appointment.appointmentId}</td>
                    <td>{appointment.patientName}</td>
                    <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.doctorEmail}</td>
                    <td>{appointment.doctorSpecialization}</td>
                    <td>
                      <Badge pill bg={getBadgeColor(appointment.appointmentStatus)}>
                        {appointment.appointmentStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        <div className="container table-responsive">
          <h4 className="mt-4">Prescription Details</h4>
          {prescriptionError ? (
            <p>Please consult the doctor for a prescription.</p>
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Prescription Id</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Medication Name</th>
                  <th>Dosage</th>
                  <th>Quantity</th>
                  <th>Usage Instructions</th>
                </tr>
              </thead>
              <tbody>
                {prescription.map((prescription) => (
                  <tr key={prescription.prescriptionId}>
                    <td>{prescription.prescriptionId}</td>
                    <td>{prescription.doctorName}</td>
                    <td>{new Date(prescription.prescriptionDate).toLocaleString()}</td>
                    <td>{prescription.medicationName}</td>
                    <td>{prescription.dosage}</td>
                    <td>{prescription.quantity}</td>
                    <td>{prescription.usageInstructions}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        <div className="container table-responsive">
          <h4 className="mt-4">Lab Test Details</h4>
          {labTestError ? (
            <p>Please consult the doctor for lab test details.</p>
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Test Id</th>
                  <th>Test Name</th>
                  <th>Date</th>
                  <th>Result</th>
                  <th>Patient Id</th>
                </tr>
              </thead>
              <tbody>
                {labTest.map((labTest) => (
                  <tr key={labTest.testid}>
                    <td>{labTest.testid}</td>
                    <td>{labTest.testName}</td>
                    <td>{new Date(labTest.testDate).toLocaleString()}</td>
                    <td>{labTest.result}</td>
                    <td>{labTest.patientId}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        <div className="container table-responsive">
          <h4 className="mt-4">Medical History Details</h4> {/* Updated Medical History Section */}
          {medicalHistoryError ? (
            <p>No medical history available. Please consult your doctor.</p>
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>MedicalHistory Id</th>
                  <th>Diagnosis Date</th>
                  <th>Condition</th>
                  <th>Treatment</th>
                </tr>
              </thead>
              <tbody>
                {medicalHistory.map((history) => (
                  <tr key={history.recordId}>
                    <td>{history.recordId}</td>
                    <td>{new Date(history.diagnosisDate).toLocaleDateString()}</td>
                    <td>{history.medicalCondition}</td>
                    <td>{history.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        <div className="container table-responsive">
          <h4 className="mt-4">Invoice Details</h4>
          {invoiceError ? (
            <p>No invoice details available. Please contact the hospital for billing information.</p>
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.map((invoice) => (
                  <tr key={invoice.invoiceId}>
                    <td>{new Date(invoice.invoiceDate).toLocaleString()}</td>
                    <td>{invoice.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

      </section>
    </>
  );

  // Helper function to get badge color for appointment status
  function getBadgeColor(status) {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'SCHEDULED':
        return 'success';
      case 'RESCHEDULED':
        return 'info';
      case 'CANCELED':
        return 'danger';
      default:
        return 'secondary';
    }  
  }
};

export default AppointmentComponent;
