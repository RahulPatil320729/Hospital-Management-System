import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const PatientAllDetails = () => {
  const doctorId = useSelector((state) => state.auth.user.id);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    medicationId: '',
    quantity: '',
  });
  const [medications, setMedications] = useState([]);

  const [labTests, setLabTests] = useState({});
  const [selectedLabTest, setSelectedLabTest] = useState(null);
  const [showLabTestModal, setShowLabTestModal] = useState(false);
  const [labTestFormData, setLabTestFormData] = useState({
    testName: '',
    result: '',
  });

  const [medicalHistory, setMedicalHistory] = useState([]);
  // const [selectmedicalHistory, setSelectmedicalHistory] = useState(null);
  // const [showMedicalHistory,setShowMedicalHistory] = useState(false);
  // const [medicalHistoryFormData, selMedicalHistoryFormData] = useState({
  //   medicalCondition: '',
  //   treatment: '',
  // });

  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchName, setSearchName] = useState(''); // Filter by name
  const [searchStatus, setSearchStatus] = useState(''); // Filter by status

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

 
  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:8085/appointment/doctor/${doctorId}`)
        .then((response) => {
          setAppointments(response.data);
          setFilteredAppointments(response.data); // Set filtered appointments initially to the full list

          // Fetch prescription data for each appointment
          response.data.forEach((appointment) => {
            fetchPrescription(appointment.patientId);
            fetchLabTests(appointment.patientId);  // Fetch lab tests for each patient
            fetchMedicalHistory(appointment.patientId); //fetch medical history for each patient 
          });
        })
        .catch((error) => {
          console.error('There was an error fetching the appointments!', error);
        });
    }
  }, [doctorId]);

  // Fetch prescription data based on patientId
  const fetchPrescription = (patientId) => {
    axios
      .get(`http://localhost:8085/prescription/prescriptionGetById/${patientId}`)
      .then((response) => {
        setPrescriptions((prevPrescriptions) => ({
          ...prevPrescriptions,
          [patientId]: response.data, // Store prescriptions using patientId as key
        }));
      })
      .catch((error) => {
        console.error('There was an error fetching the prescriptions!', error);
      });
  };

  // Handle open modal for update
  const handleUpdateClick = (prescription, patientId) => {
    setSelectedPrescription({ ...prescription, patientId });
    setFormData({
      medicationId: prescription.medicationId,
      quantity: prescription.quantity,
    });

    // Fetch medications when modal is opened
    axios.get('http://localhost:8085/Medications/getAllMedicationDetails')
      .then((response) => {
        setMedications(response.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error('There was an error fetching the medications!', error);
      });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle updating prescription
  const handleUpdatePrescription = () => {
    const updatedData = {
      patientId: selectedPrescription.patientId,
      doctorId, // from Redux
      medicationId: formData.medicationId,
      quantity: formData.quantity,
    };

    axios.put(`http://localhost:8085/prescription/update/${selectedPrescription.prescriptionId}`, updatedData)
      .then((response) => {
        console.log('Prescription updated:', response.data);
        setShowModal(false);
        // Refresh prescriptions
        fetchPrescription(selectedPrescription.patientId);
      })
      .catch((error) => {
        console.error('There was an error updating the prescription!', error);
      });
  };

  // Handle deleting prescription
  const handleDeletePrescription = () => {
    axios.delete(`http://localhost:8085/prescription/delete/${selectedPrescription.prescriptionId}`)
      .then((response) => {
        console.log('Prescription deleted:', response.data);
        setShowModal(false);
        // Refresh prescriptions
        fetchPrescription(selectedPrescription.patientId);
      })
      .catch((error) => {
        console.error('There was an error deleting the prescription!', error);
      });
  };

  const fetchLabTests = (patientId) => {
    axios
      .get(`http://localhost:8085/labTest/getLabTestsByPatientId/${patientId}`)
      .then((response) => {
        setLabTests((prevLabTests) => ({
          ...prevLabTests,
          [patientId]: response.data, // Store lab tests using patientId as key
        }));
      })
      .catch((error) => {
        console.error('There was an error fetching the lab tests!', error);
      });
  };

     // Handle open modal for lab test update
     const handleLabTestUpdateClick = (labTest, patientId) => {
      setSelectedLabTest({ ...labTest, patientId });
      setLabTestFormData({
        testName: labTest.testName,
        result: labTest.result,
      });
      setShowLabTestModal(true);
    };
  
     // Handle updating lab test
     const handleUpdateLabTest = () => {
      const updatedLabTest = {
        ...labTestFormData,
        patientId: selectedLabTest.patientId, // Include patientId
      };
  
      axios
        .put(`http://localhost:8085/labTest/updateLabTestRecord/${selectedLabTest.testid}`, updatedLabTest)
        .then((response) => {
          console.log('Lab test updated:', response.data);
          setShowLabTestModal(false);
          // Refresh lab tests for the specific patient
          fetchLabTests(selectedLabTest.patientId);
        })
        .catch((error) => {
          console.error('There was an error updating the lab test!', error);
        });
    };

    const handleDeleteLabTest=()=>{
        axios.delete(`http://localhost:8085/labTest/delete/${selectedLabTest.testid}`)
        .then((response)=>{
          console.log('Lab Test deleted:' ,response.data);
          setShowLabTestModal(false);
          //refresh labtest
          fetchLabTests(selectedLabTest.patientId);
        })
        .catch((error) =>{
          console.error('There was an error deleting the labtest!',error);
        });
    }


    const fetchMedicalHistory = (patientId) => {
      axios
        .get(`http://localhost:8085/medicalHistory/medicalHistoryByPatientId/${patientId}`)
        .then((response) => {
          setMedicalHistory((prevMedicalHistory) => ({
            ...prevMedicalHistory,
            [patientId]: response.data, // Store lab tests using patientId as key
          }));
        })
        .catch((error) => {
          console.error('There was an error fetching the medical history!', error);
        });
    };


  return (
    <>
      <section>
        <div className="page-title-wrapper">
          <div className="page-title">
            <div className="container">
              <h2>Details</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-3 mb-4">
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Details</Breadcrumb.Item>
        </Breadcrumb>
      </section>

      <section className="container min-vh-100 mb-4"  id='details-form'>
        <div>
          <div className='mb-5'>
            <h2>ALL DETAILS</h2>
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

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Date</th>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Usage Instructions</th>
                <th>Quantity</th>
                <th>Test Name</th>
                <th>Result</th>
                <th>Medical History</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment.appointmentId}>
                  <td>{index + 1}.{appointment.appointmentId}</td>
                  <td>{appointment.patientId}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.appointmentStatus}</td>
                  <td>{appointment.appointmentDate}</td>

                  <td colSpan="4">
                    {prescriptions[appointment.patientId]?.length ? (
                      prescriptions[appointment.patientId].map((prescription) => (
                        <div className='d-flex justify-content-between'>
                        <div key={prescription.prescriptionId}>
                          <strong>{prescription.medicationName}</strong> - {prescription.dosage} - {prescription.quantity} quantity<br />
                          {prescription.usageInstructions}
                        </div>
                        <div>
                          <Button variant="primary" size="sm" onClick={() => handleUpdateClick(prescription, appointment.patientId)}>
                            Update
                          </Button>
                        </div>
                        </div>
                      ))
                    ) : (
                      <span>No prescription available</span>
                    )}
                  </td>

                  {/* New cell for displaying lab tests */}
                  <td colSpan="2">
                    {labTests[appointment.patientId]?.length ? (
                      labTests[appointment.patientId].map((labTest) => (
                        <div className='d-flex justify-content-between'>
                          <div key={labTest.testid}>
                            <strong>{labTest.testName}</strong> - {labTest.result}<br/>
                          </div>
                          <div>
                          <Button variant="primary" className='mb-3' size="sm" onClick={() => handleLabTestUpdateClick(labTest, appointment.patientId)}>
                            Update
                          </Button>
                        </div>
                        </div>
                      ))
                      ) : (
                        <span>No lab tests available</span>
                      )}
                      </td>

                  {/* New cell for displaying medical History */}
                  <td colSpan="2">
                    {medicalHistory[appointment.patientId]?.length ? (
                      medicalHistory[appointment.patientId].map((medicalHistory) => (
                        <div className='d-flex justify-content-between'>
                          <div key={medicalHistory.recordId}>
                            <strong>{medicalHistory.medicalCondition}</strong> - {medicalHistory.treatment}<br/>
                          </div>
                        </div>
                      ))
                      ) : (
                        <span>No Medical History available</span>
                      )}
                  </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>

      {/* Modal for updating or deleting prescription */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="medicationId">
              <Form.Label>Medication</Form.Label>
              <Form.Control
                as="select"
                name="medicationId"
                value={formData.medicationId}
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
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeletePrescription}>
            Delete Prescription
          </Button>
          <Button variant="primary" onClick={handleUpdatePrescription}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    {/* Modal for updating lab test */}
    <Modal show={showLabTestModal} onHide={() => setShowLabTestModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Lab Test</Modal.Title>
      </Modal.Header>
    <Modal.Body>
    <Form>
      <Form.Group controlId="testName">
        <Form.Label>Test Name</Form.Label>
        <Form.Control
          type="text"
          name="testName"
          value={labTestFormData.testName}
          onChange={(e) =>
            setLabTestFormData({ ...labTestFormData, testName: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="result">
        <Form.Label>Result</Form.Label>
        <Form.Control
          type="text"
          name="result"
          value={labTestFormData.result}
          onChange={(e) =>
            setLabTestFormData({ ...labTestFormData, result: e.target.value })
          }
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowLabTestModal(false)}>
      Close
    </Button>
    <Button variant="danger" onClick={handleDeleteLabTest}>
      Delete LabTest
    </Button>
    <Button variant="primary" onClick={handleUpdateLabTest}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>


    </>
  );
};

export default PatientAllDetails;
