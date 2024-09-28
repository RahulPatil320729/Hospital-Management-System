package com.HospitalManagement.service;

import java.util.List;
import java.util.Optional;

import com.HospitalManagement.bean.MedicalHistoryBean;


public interface MedicalHistoryService {
	
	MedicalHistoryBean saveMedicalHistory(MedicalHistoryBean medicalHistoryBean);
	
	List<MedicalHistoryBean> getAllMedicalHistory();
	
	public Optional<MedicalHistoryBean> getMedicalHistoryById(int id);
	
	String deleteMedicalHistoryById(int id);
	
	MedicalHistoryBean updateMedicalHistory(int id, MedicalHistoryBean medicalHistoryBean);
	
	List<MedicalHistoryBean> getMedicalHistoryByPatientId(int patientId);

}
