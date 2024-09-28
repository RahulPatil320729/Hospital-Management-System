package com.HospitalManagement.entity;

import java.time.LocalDate;
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
@Table(name = "labtest_table")
public class LabTestRecordEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="test_id")
	private int testId;
	
	@Column(name="test_name")
	private String testName;
	
	@Column(name="test_data")
	private LocalDateTime testDate;  // Using LocalDateTime for the date
	
	@Column(name="test_result")
	private String result;
	
    @JoinColumn(name = "patient_id")
    @ManyToOne
    @JsonBackReference
    private PatientsEntity patientsEntityForLabTest;
	
}
