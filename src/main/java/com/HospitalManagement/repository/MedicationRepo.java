package com.HospitalManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HospitalManagement.entity.MedicationsEntity;

public interface MedicationRepo extends JpaRepository<MedicationsEntity, Integer>{

}
