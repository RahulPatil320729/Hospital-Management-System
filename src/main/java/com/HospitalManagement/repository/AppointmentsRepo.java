package com.HospitalManagement.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.HospitalManagement.entity.AppointmentsEntity;

public interface AppointmentsRepo extends JpaRepository<AppointmentsEntity, Integer>{

	List<AppointmentsEntity> findByPatientsEntity_Id(int patientId);
	
	// Add this in your AppointmentsRepo interface
	List<AppointmentsEntity> findByDoctorsEntity_Id(int doctorId);
}
