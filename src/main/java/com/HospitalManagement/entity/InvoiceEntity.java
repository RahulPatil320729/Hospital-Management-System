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
@Setter
@Getter
@Table(name = "invoices")
public class InvoiceEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int invoiceId;
	
	
	 @ManyToOne
	 @JsonBackReference
	 @JoinColumn(name = "patient_id")
	 private PatientsEntity patientInvoice;

	 @ManyToOne
	 @JsonBackReference
	 @JoinColumn(name = "doctor_id")
	 private DoctorsEntity doctorInvoice;

	 
	 @Column(name = "invoice_date")
	 private LocalDateTime invoiceDate;
	
	 @Column(name = "total_amount")
	 private double totalAmount;

}
