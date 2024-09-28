package com.HospitalManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HospitalManagement.entity.PatientRoleEntity;

public interface PatientRoleRepo extends JpaRepository<PatientRoleEntity, Integer>{

}
