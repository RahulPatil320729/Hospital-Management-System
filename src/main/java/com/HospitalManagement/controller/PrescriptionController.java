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

import com.HospitalManagement.bean.PrescriptionsBean;
import com.HospitalManagement.service.PrescriptionService;

@RestController
@CrossOrigin("*")
@RequestMapping("/prescription")
public class PrescriptionController {

	@Autowired
	PrescriptionService prescriptionService;
	
	
	// Create a new prescription
    @PostMapping("/savePrescription")
    public ResponseEntity<PrescriptionsBean> savePrescription(@RequestBody PrescriptionsBean prescriptionsBean) {
        try {
            // Call the service method to save the prescription
            PrescriptionsBean savedPrescription = prescriptionService.savePrescription(prescriptionsBean);
            // Return the saved prescription with HTTP status 201 (Created)
            return ResponseEntity.status(201).body(savedPrescription);
        } catch (RuntimeException e) {
            // Handle exceptions (e.g., patient, doctor, or medication not found)
            return ResponseEntity.status(400).body(null);
        }
    }
	
	
    // Retrieve a prescription by ID
    @GetMapping("getById/{id}")
    public ResponseEntity<PrescriptionsBean> getPrescriptionById(@PathVariable("id") int id) {
        Optional<PrescriptionsBean> prescription = prescriptionService.getPrescriptionById(id);

        if (prescription.isPresent()) {
            return ResponseEntity.ok(prescription.get());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    
    // Retrieve all prescriptions
    @GetMapping("/getAll")
    public ResponseEntity<List<PrescriptionsBean>> getAllPrescriptions() {
        // Fetch all prescriptions using the service
        List<PrescriptionsBean> prescriptions = prescriptionService.getAllPrescriptions();

        // Return the list of prescriptions wrapped in a ResponseEntity
        return ResponseEntity.ok(prescriptions);
    }
    
    
 // Update an existing prescription
    @PutMapping("/update/{id}")
    public ResponseEntity<PrescriptionsBean> updatePrescription(@PathVariable("id") int id,@RequestBody PrescriptionsBean prescriptionsBean) {
        try {
            PrescriptionsBean updatedPrescription = prescriptionService.updatePrescription(id, prescriptionsBean);
            return new ResponseEntity<>(updatedPrescription, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePrescription(@PathVariable("id") int id) {
        try {
            prescriptionService.deletePrescription(id);
            return new ResponseEntity<>("Prescription deleted successfully", HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while deleting the prescription", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @GetMapping("/prescriptionGetById/{patientId}")
    public ResponseEntity<List<PrescriptionsBean>> getPrescriptionsByPatientId(@PathVariable int patientId) {
        List<PrescriptionsBean> prescriptions = prescriptionService.getPrescriptionsByPatientId(patientId);
        if (prescriptions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(prescriptions, HttpStatus.OK);
    }
	
}
