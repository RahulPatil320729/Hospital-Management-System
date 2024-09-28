package com.HospitalManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HospitalManagement.entity.LabTestRecordEntity;

public interface LabTestRepo extends JpaRepository<LabTestRecordEntity, Integer>{
	
    // Custom method to find lab test records by patient ID
    List<LabTestRecordEntity> findByPatientsEntityForLabTest_Id(int patientId);

}
