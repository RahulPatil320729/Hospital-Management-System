package com.HospitalManagement.bean;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LabTestRecordBean {
    
	    private int testid;
	    private String testName;
	    private LocalDateTime testDate;  // Using LocalDateTime for the date
	    private String result;  
	    
	    private int patientId;
	    
}
