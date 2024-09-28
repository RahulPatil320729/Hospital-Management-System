package com.HospitalManagement.service;

import java.util.List;
import java.util.Optional;

import com.HospitalManagement.bean.LabTestRecordBean;
import com.HospitalManagement.entity.LabTestRecordEntity;


public interface LabTestService {

	LabTestRecordBean saveLabTestRecord(LabTestRecordBean labTestRecordBean);
	
	Optional<LabTestRecordBean> getLabTestRecordById(int id);
	
	List<LabTestRecordBean> getAllLabTestRecords();
	
	String deleteLabTestRecordById(int id);
	
	LabTestRecordBean updateLabTestRecord(int id, LabTestRecordBean labTestRecordBean);
	
	List<LabTestRecordBean> getLabTestRecordsByPatientId(int patientId);
}
