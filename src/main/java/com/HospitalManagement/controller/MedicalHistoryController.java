package com.HospitalManagement.controller;

import java.util.List;
import java.util.Optional;

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

import com.HospitalManagement.bean.MedicalHistoryBean;
import com.HospitalManagement.service.MedicalHistoryService;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/medicalHistory")
public class MedicalHistoryController {

	@Autowired
	MedicalHistoryService medicalHistoryService;
	
	
	  // Endpoint to save a medical history record
    @PostMapping("/save")
    public ResponseEntity<MedicalHistoryBean> saveMedicalHistory(@RequestBody MedicalHistoryBean medicalHistoryBean) {
        try {
            MedicalHistoryBean savedMedicalHistoryBean = medicalHistoryService.saveMedicalHistory(medicalHistoryBean);
            return new ResponseEntity<>(savedMedicalHistoryBean, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
	
    
 // Endpoint to get all medical history records
    @GetMapping("/getAllDetail")
    public ResponseEntity<List<MedicalHistoryBean>> getAllMedicalHistory() {
        try {
            List<MedicalHistoryBean> medicalHistoryList = medicalHistoryService.getAllMedicalHistory();
            return new ResponseEntity<>(medicalHistoryList, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception (if needed) and return a server error response
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    

    // Endpoint to get a medical history record by ID
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<MedicalHistoryBean> getMedicalHistoryById(@PathVariable int id) {
        Optional<MedicalHistoryBean> medicalHistoryBean = medicalHistoryService.getMedicalHistoryById(id);
        if (medicalHistoryBean.isPresent()) {
            return new ResponseEntity<>(medicalHistoryBean.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    
    
    
 // Endpoint to delete a medical history record by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMedicalHistoryById(@PathVariable int id) {
        try {
            String responseMessage = medicalHistoryService.deleteMedicalHistoryById(id);
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    
    // Endpoint to update a medical history record by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<MedicalHistoryBean> updateMedicalHistory(
            @PathVariable int id,
            @RequestBody MedicalHistoryBean medicalHistoryBean) {
        try {
            MedicalHistoryBean updatedMedicalHistoryBean = medicalHistoryService.updateMedicalHistory(id, medicalHistoryBean);
            return new ResponseEntity<>(updatedMedicalHistoryBean, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    
    @GetMapping("/medicalHistoryByPatientId/{patientId}")
    public List<MedicalHistoryBean> getMedicalHistoryByPatientId(@PathVariable int patientId) {
        return medicalHistoryService.getMedicalHistoryByPatientId(patientId);
    }
    
    
}
