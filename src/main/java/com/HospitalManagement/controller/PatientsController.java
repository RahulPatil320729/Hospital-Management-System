package com.HospitalManagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.HospitalManagement.bean.PatientsBean;
import com.HospitalManagement.entity.PatientsEntity;
import com.HospitalManagement.repository.PatientRepo;
import com.HospitalManagement.service.PatientService;
import com.fasterxml.jackson.core.JsonProcessingException;



@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api")
public class PatientsController {
	
    @Autowired
    PatientService patientservice;
    
    @Autowired
    PatientRepo repo;
    
  @PostMapping("/savePatient")
  public String SavePatients(@RequestBody PatientsBean request) {
		return patientservice.SavePatients(request);
  }

    @GetMapping("/getAllPatientDetails")
    public List<PatientsEntity> getPatientDetails(){
		return patientservice.getAllPatientDetails();
	}
    
    @GetMapping("/getAllPatientDetails/{id}")
    public PatientsEntity getPatientDetails(@PathVariable int id) throws JsonProcessingException{
    	return patientservice.getAllPatientDetails(id);
    }

    
  @PutMapping("/getAllpatientDetails/{id}")
	public PatientsEntity getUpdate(@PathVariable int id, @RequestBody PatientsBean request) throws JsonProcessingException {
		return patientservice.updateRecord(id, request);
	}
    
    
    @DeleteMapping("/deletePatient/{id}")
    public String DeletePatient(@PathVariable int id) {
		repo.deleteById(id);
		return "Data deleted successfully";	
    }
    
  
    
    


    
    

   
    
    
}
