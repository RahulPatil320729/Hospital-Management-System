package com.HospitalManagement.bean;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicalHistoryBean {
	
	private int recordId;
	private int patientId; 
	private String medicalCondition;
	private LocalDateTime diagnosisDate;
	private String treatment;

	

}
