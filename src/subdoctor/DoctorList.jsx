import React from 'react';
import Doctor from './Doctor';


const DoctorList = ({ doctors, filter }) => {


  const filteredDoctors = filter === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.doctorSpecialization.toLowerCase() === filter.toLowerCase());

  return (
    <div className="row">
      {filteredDoctors.map((doctor) => (
        <Doctor key={doctor.doctoreId} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;