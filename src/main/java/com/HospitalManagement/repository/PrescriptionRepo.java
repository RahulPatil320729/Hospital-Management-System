package com.HospitalManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HospitalManagement.entity.PatientsEntity;
import com.HospitalManagement.entity.PrescriptionsEntity;

public interface PrescriptionRepo extends JpaRepository<PrescriptionsEntity, Integer>{
	
	List<PrescriptionsEntity> findByPatientsPrescriptionId(int patientId);

}
