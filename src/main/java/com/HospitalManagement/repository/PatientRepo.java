package com.HospitalManagement.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.HospitalManagement.entity.PatientsEntity;


public interface PatientRepo extends JpaRepository<PatientsEntity, Integer>{
  
	PatientsEntity findByEmail(String email);
	
}