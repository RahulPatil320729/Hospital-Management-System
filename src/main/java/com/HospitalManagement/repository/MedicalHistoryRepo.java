package com.HospitalManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HospitalManagement.entity.MedicalHistoryEntity;

public interface MedicalHistoryRepo extends JpaRepository<MedicalHistoryEntity, Integer>{
	
	// Fetch all medical history records for a specific patient
    List<MedicalHistoryEntity> findByPatientsEntityForMedicalHistory_Id(int patientId);

}
