package com.HospitalManagement.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HospitalManagement.entity.DoctorsEntity;

public interface DoctorRepo extends JpaRepository<DoctorsEntity, Integer>{

	List<DoctorsEntity> findByDoctorSpecialization(String doctorSpecialization);
	
	DoctorsEntity findByEmail(String email);
	
	Page<DoctorsEntity> findByDoctorSpecialization(String specialization, Pageable pageable);
}
