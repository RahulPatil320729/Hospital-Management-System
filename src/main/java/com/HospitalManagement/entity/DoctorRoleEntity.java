package com.HospitalManagement.entity;

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
@Getter
@Setter
@Table(name="doctorrole")
public class DoctorRoleEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="doctorrole_id")
	private int doctorloginid;
	
	@Column(name="doctor_role")
	private String role;
	
	@JoinColumn(name = "doctor_id")
    @ManyToOne
    @JsonBackReference
    private DoctorsEntity doctorsEntityForDoctorRole;

		
}
