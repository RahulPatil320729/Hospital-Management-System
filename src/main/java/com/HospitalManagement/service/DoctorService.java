package com.HospitalManagement.service;

import java.util.List;
import org.springframework.data.domain.Page;
import com.HospitalManagement.bean.DoctorsBean;
import com.HospitalManagement.entity.DoctorsEntity;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface DoctorService {

	String SaveDoctor(DoctorsBean request);
	
	List<DoctorsEntity> getAllDoctorDetails();
	
	// Pagination implementation
	Page<DoctorsEntity> getAllDoctorDetailsPaginated(int page, int size);
	
	DoctorsEntity getAllDoctorDetails(int id) throws JsonProcessingException;
	
	DoctorsEntity updateRecord(int id,DoctorsBean request);
	
	List<DoctorsEntity> getDoctorsBySpecialization(String specialization);
	
}
