package com.HospitalManagement.bean;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentsBean {
	
	private int AppointmentId;
	private int patientId;
	private int doctorId;
	private String appointmentStatus;
    private String appointmentDate;
    
    // Additional fields for doctor and patient details
    private String doctorName;
    private String doctorSpecialization;
    private String doctorEmail;
    private String patientName;
    private int patientAge;
    private String patientGender;
    private String patientEmail;
    private long patientContactNumber;

}
