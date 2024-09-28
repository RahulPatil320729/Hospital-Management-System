package com.HospitalManagement.bean;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvoiceBean {

    private int invoiceId;
    private int patientId;
    private int doctorId;
    private LocalDateTime invoiceDate;
    private double totalAmount;
	
	
}
