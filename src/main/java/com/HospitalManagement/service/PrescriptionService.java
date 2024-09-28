package com.HospitalManagement.service;

import java.util.List;
import java.util.Optional;

import com.HospitalManagement.bean.PrescriptionsBean;
import com.HospitalManagement.entity.PrescriptionsEntity;


public interface PrescriptionService {

	PrescriptionsBean savePrescription(PrescriptionsBean prescriptionsBean);
	
	Optional<PrescriptionsBean> getPrescriptionById(int id);
	
	List<PrescriptionsBean> getAllPrescriptions();
	
	PrescriptionsBean updatePrescription(int id, PrescriptionsBean prescriptionsBean);
	
	void deletePrescription(int id);
	
	List<PrescriptionsBean> getPrescriptionsByPatientId(int patientId);
	
}
