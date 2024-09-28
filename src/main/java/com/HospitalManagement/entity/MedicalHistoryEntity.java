package com.HospitalManagement.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "MedicalHistory")
public class MedicalHistoryEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="record_id")
	private int recordId;

	@JoinColumn(name = "patient_id")
    @ManyToOne
    @JsonBackReference
    private PatientsEntity patientsEntityForMedicalHistory;
	
	@Column(name="medical_condition")
	private String medicalCondition;
	
	@Column(name="medical_diagnosisDate")
	private LocalDateTime diagnosisDate;
	
	@Column(name="medical_treatment")
	private String treatment;
	
	
}
