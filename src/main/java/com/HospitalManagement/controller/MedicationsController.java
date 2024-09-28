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

import com.HospitalManagement.bean.MedicationsBean;
import com.HospitalManagement.service.MedicationService;


@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/Medications")
public class MedicationsController {
	
	
	@Autowired
	MedicationService medicationService;


	 // Endpoint to save a new medication
    @PostMapping("/save")
    public ResponseEntity<MedicationsBean> saveMedication(@RequestBody MedicationsBean medicationsBean) {
        try {
            MedicationsBean savedMedication = medicationService.saveMedication(medicationsBean);
            return new ResponseEntity<>(savedMedication, HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle exceptions (e.g., validation errors, database errors)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @GetMapping("/getMedicationById/{id}")
    public ResponseEntity<MedicationsBean> getMedicationById(@PathVariable int id) {
        return medicationService.getMedicationById(id)
            .map(medication -> new ResponseEntity<>(medication, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    
    @GetMapping("/getAllMedicationDetails")
    public ResponseEntity<List<MedicationsBean>> getAllMedications() {
        List<MedicationsBean> medications = medicationService.getAllMedications();
        if (medications.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(medications, HttpStatus.OK);
    }
    
	
    @PutMapping("/updateMedicationById/{id}")
    public ResponseEntity<MedicationsBean> updateMedication(@PathVariable int id, @RequestBody MedicationsBean medicationsBean) {
        try {
            MedicationsBean updatedMedication = medicationService.updateMedication(id, medicationsBean);
            return new ResponseEntity<>(updatedMedication, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMedication(@PathVariable int id) {
        try {
            String message = medicationService.deleteMedicationById(id);
            return new ResponseEntity<>(message, HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while deleting data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    
}
