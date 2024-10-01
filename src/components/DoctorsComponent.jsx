import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorList from '../subdoctor/DoctorList';
import { Nav, Tab } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const DoctorsComponent = () => {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8085/doctor/getAllDoctorDetails');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctors();
  }, []);

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


        <section className='container pt-3 mb-4'>
            <Breadcrumb>
            <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Doctors</Breadcrumb.Item>
            </Breadcrumb>
        </section>

    <div className="container mb-5">
      <Tab.Container id="doctor-tabs" defaultActiveKey="all">
        <Nav variant="pills" className="justify-content-center mb-4">
          <Nav.Item>
            <Nav.Link eventKey="all" onClick={() => setFilter('all')}>All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Cardiology" onClick={() => setFilter('Cardiology')}>Cardiology</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Dental" onClick={() => setFilter('Dental')}>Dental</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Neurology" onClick={() => setFilter('Neurology')}>Neurology</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Pediatrics" onClick={() => setFilter('Pediatrics')}>Pediatrics</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Pulmonary" onClick={() => setFilter('Pulmonary')}>Pulmonary</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Traumatology" onClick={() => setFilter('Traumatology')}>Traumatology</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Urology" onClick={() => setFilter('Urology')}>Urology</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Xray" onClick={() => setFilter('Xray')}>Xray</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="all">
            <DoctorList doctors={doctors} filter={filter} />
          </Tab.Pane>
          <Tab.Pane eventKey="Cardiology">
            <DoctorList doctors={doctors} filter={filter} />
          </Tab.Pane>
          <Tab.Pane eventKey="Dental">
            <DoctorList doctors={doctors} filter={filter} />
          </Tab.Pane>
          <Tab.Pane eventKey="Neurology">
            <DoctorList doctors={doctors} filter={filter} />
          </Tab.Pane>
          <Tab.Pane eventKey="Pediatrics">
            <DoctorList doctors={doctors} filter={filter} />
          </Tab.Pane>
          <Tab.Pane eventKey="Pulmonary">
            <DoctorList doctors={doctors} filter={filter} />
          </Tab.Pane>
          <Tab.Pane eventKey="Traumatology">
            <DoctorList doctors={doctors} filter={filter} />
          </Tab.Pane>
          <Tab.Pane eventKey="Urology">
            <DoctorList doctors={doctors} filter={filter} />
          </Tab.Pane>
          <Tab.Pane eventKey="Xray">
            <DoctorList doctors={doctors} filter={filter} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>

    </>
  );
};


export default DoctorsComponent;