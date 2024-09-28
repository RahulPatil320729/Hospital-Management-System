package com.HospitalManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HospitalManagement.entity.InvoiceEntity;

public interface InvoiceRepo extends JpaRepository<InvoiceEntity, Integer>{

}
