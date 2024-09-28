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
@Table(name = "Appointments")
public class AppointmentsEntity {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    @Column(name = "appointment_id")
	    private int appointmentId;
	    
	    @Column(name = "appointment_status")
	    private String appointmentStatus;

	    @JoinColumn(name = "patient_id")
	    @ManyToOne
	    @JsonBackReference
	    private PatientsEntity patientsEntity;

	    @JoinColumn(name = "doctor_id")
	    @ManyToOne
	    @JsonBackReference
	    private DoctorsEntity doctorsEntity;

	    @Column(name = "appointment_date")
	    private String appointmentDate;
}
