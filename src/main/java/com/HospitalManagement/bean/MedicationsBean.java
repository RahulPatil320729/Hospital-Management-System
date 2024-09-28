package com.HospitalManagement.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicationsBean {
    private int medicationId;
    private String medicationName;
    private String dosage;
    private String usageInstructions;
}
