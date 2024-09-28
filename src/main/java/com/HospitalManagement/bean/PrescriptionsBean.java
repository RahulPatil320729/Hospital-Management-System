package com.HospitalManagement.bean;

import java.time.LocalDateTime;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrescriptionsBean {
    
    private int prescriptionId;
	private int patientId;
	private String patientName;
	private int doctorId;
	private String DoctorName;
    private int medicationId;
    private LocalDateTime prescriptionDate;
    private int quantity;
    
    
    private String medicationName;
    private String dosage;
    private String usageInstructions;
	
	
}
