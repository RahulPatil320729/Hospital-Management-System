package com.HospitalManagement.service;

import java.util.List;
import java.util.Optional;

import com.HospitalManagement.bean.MedicationsBean;

public interface MedicationService {
	
	MedicationsBean saveMedication(MedicationsBean medicationBean);

	Optional<MedicationsBean> getMedicationById(int id);
	
    List<MedicationsBean> getAllMedications();
    
    MedicationsBean updateMedication(int id, MedicationsBean medicationsBean);
    
    String deleteMedicationById(int id);
	
}
