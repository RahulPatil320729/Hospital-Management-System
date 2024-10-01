import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import Button  from "react-bootstrap/Button";

const Doctor = ({ doctor }) => {
 console.log(doctor)
  return (
    <div className="col-md-3">
      <div className="card mb-3 shadow-sm">
        <div className="card-body p-0">
        <img variant="top" className="custom-card-img w-100" src={doctor.img} alt='image'/>
        <Card.Body>
          <h5 className="card-title">{doctor.name}</h5>
          <p>{doctor.doctorSpecialization}</p>
          <p className="custom-card-text">{doctor.description}</p>
          <Link to={`/doctors/${doctor.id}`} className="text-decoration-none text-dark"><Button variant="primary">View Details</Button></Link>
          </Card.Body>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
