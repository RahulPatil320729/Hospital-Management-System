package com.HospitalManagement.controller;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.HospitalManagement.bean.DoctorsBean;
import com.HospitalManagement.entity.DoctorsEntity;
import com.HospitalManagement.repository.DoctorRepo;
import com.HospitalManagement.service.DoctorService;
import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/doctor")
public class DoctorsController {
	
	@Autowired
	DoctorService doctorservice;
	
	@Autowired
	DoctorRepo repo;
	
	@PostMapping("/saveDoctor")
	public String SaveDoctor(@RequestBody DoctorsBean request) {
		return doctorservice.SaveDoctor(request);
	}
	
	@GetMapping("/getAllDoctorDetails")
	public List<DoctorsEntity> getDoctorDetails(){
		return doctorservice.getAllDoctorDetails();
	}
	
    // Pagination endpoint
    @GetMapping("/getAllDoctorDetailsPaginated")
    public Page<DoctorsEntity> getDoctorDetailsPaginated(
            @RequestParam(defaultValue = "0") int page, 
            @RequestParam(defaultValue = "8") int size) {
        return doctorservice.getAllDoctorDetailsPaginated(page, size);
    }
	
	@GetMapping("/getAllDoctorDetails/{id}")
	public DoctorsEntity getDoctor(@PathVariable int id) throws JsonProcessingException{
		return doctorservice.getAllDoctorDetails(id);
	}
	
	@PutMapping("/getAllDoctorDetails/{id}")
	public DoctorsEntity getUpdate(@PathVariable int id,@RequestBody DoctorsBean request) throws JsonProcessingException {
		return doctorservice.updateRecord(id, request);		
	} 
	
	@DeleteMapping("/deleteDoctor/{id}")
	public String DeleteDoctor(@PathVariable int id) {
		repo.deleteById(id);
		return "Data deleted successfully";
	}
	

    @GetMapping("/getDoctorsBySpecialization/{specialization}")
    public List<DoctorsEntity> getDoctorsBySpecialization(@PathVariable String specialization) {
        return doctorservice.getDoctorsBySpecialization(specialization);
    }
    
  
    
}
