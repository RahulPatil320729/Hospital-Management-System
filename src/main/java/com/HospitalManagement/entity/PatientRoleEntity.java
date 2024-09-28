package com.HospitalManagement.entity;

import java.util.List;

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

@Entity
@Setter
@Getter
@Table(name="patientrole")
public class PatientRoleEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="patientrole_id")
	private int userloginid;
	
	@Column(name="patient_role")
	private String role;
	
	@JoinColumn(name = "patient_id")
    @ManyToOne
    @JsonBackReference
    private PatientsEntity patientsEntityForPatientRole;
	

}
