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

import com.HospitalManagement.bean.LabTestRecordBean;
import com.HospitalManagement.entity.LabTestRecordEntity;
import com.HospitalManagement.repository.LabTestRepo;
import com.HospitalManagement.service.LabTestService;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/labTest")
public class LabTestController {
      
	@Autowired
	LabTestService labtestservice;

    @PostMapping("/save")
    public ResponseEntity<LabTestRecordBean> saveLabTestRecord(@RequestBody LabTestRecordBean labTestRecordBean) {
    try{
        LabTestRecordBean savedLabTestRecord = labtestservice.saveLabTestRecord(labTestRecordBean);
        return new ResponseEntity<>(savedLabTestRecord, HttpStatus.CREATED);
        } catch (RuntimeException e) {
          // Handle specific exceptions or validation errors
          return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }   
    }
	
    
    
    @GetMapping("/getLabTestDetails/{id}")
    public ResponseEntity<LabTestRecordBean> getLabTestRecordById(@PathVariable("id") int id) {
        try {
            Optional<LabTestRecordBean> labTestRecordBean = labtestservice.getLabTestRecordById(id);
            return labTestRecordBean.map(bean -> new ResponseEntity<>(bean, HttpStatus.OK))
                                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            // Log the exception (e.g., using a logger)
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   
    
    @GetMapping("/getAllLabTestDetails")
    public ResponseEntity<List<LabTestRecordBean>> getAllLabTestRecords() {
        try {
            // Call the service to get all lab test records
            List<LabTestRecordBean> labTestRecordBeans = labtestservice.getAllLabTestRecords();
            
            // Return the records with an HTTP 200 OK status
            return new ResponseEntity<>(labTestRecordBeans, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception (e.g., using a logger)
            // Return an HTTP 500 Internal Server Error status
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLabTestRecordById(@PathVariable int id){
    	try {
    		String result = labtestservice.deleteLabTestRecordById(id);
    		return new ResponseEntity<>(result, HttpStatus.OK);
    	}catch(RuntimeException e){
          // Return a 404 Not Found status if the appointment does not exist
          return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    	}
    }

    
    @PutMapping("/updateLabTestRecord/{id}")
    public ResponseEntity<LabTestRecordBean> updateLabTestRecord(@PathVariable("id") int id,
                                                                  @RequestBody LabTestRecordBean labTestRecordBean) {
        try {
            LabTestRecordBean updatedLabTestRecordBean = labtestservice.updateLabTestRecord(id, labTestRecordBean);
            return new ResponseEntity<>(updatedLabTestRecordBean, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Log the exception (e.g., using a logger)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        } catch (Exception e) {
            // Log the exception (e.g., using a logger)
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }
    
    
    // Endpoint to get lab test records by patient ID
    @GetMapping("/getLabTestsByPatientId/{patientId}")
    public ResponseEntity<List<LabTestRecordBean>> getLabTestsByPatientId(@PathVariable int patientId) {
        List<LabTestRecordBean> labTestRecords = labtestservice.getLabTestRecordsByPatientId(patientId);
        return new ResponseEntity<>(labTestRecords, HttpStatus.OK);
    }
    
    
}
