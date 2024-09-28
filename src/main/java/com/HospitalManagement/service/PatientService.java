package com.HospitalManagement.service;

import java.util.List;
import com.HospitalManagement.bean.PatientsBean;
import com.HospitalManagement.entity.PatientsEntity;
import com.fasterxml.jackson.core.JsonProcessingException;


public interface PatientService {

	

	String SavePatients(PatientsBean request);
	
	List<PatientsEntity> getAllPatientDetails();

	PatientsEntity getAllPatientDetails(int id) throws JsonProcessingException;
	
	public PatientsEntity updateRecord(int id, PatientsBean request);

	
	
	
}
