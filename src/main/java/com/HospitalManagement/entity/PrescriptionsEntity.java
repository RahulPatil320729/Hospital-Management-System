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

@Entity
@Getter
@Setter
@Table(name = "prescriptions")
public class PrescriptionsEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "prescription_id")
    private int prescriptionId;
		
	@ManyToOne
	@JsonBackReference
    @JoinColumn(name = "patient_id")
    private PatientsEntity patientsPrescription;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "doctor_id")
    private DoctorsEntity doctorPrescription;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "medication_id")
    private MedicationsEntity medicationPrescription;
    
    @Column(name = "prescription_date")
    private LocalDateTime prescriptionDate;
    
    @Column(name = "quantity")
    private int quantity;

}
