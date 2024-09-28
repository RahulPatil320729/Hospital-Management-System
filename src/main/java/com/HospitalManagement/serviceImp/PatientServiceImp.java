package com.HospitalManagement.serviceImp;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.HospitalManagement.bean.PatientsBean;
import com.HospitalManagement.entity.PatientRoleEntity;
import com.HospitalManagement.entity.PatientsEntity;
import com.HospitalManagement.repository.DoctorRepo;
import com.HospitalManagement.repository.PatientRepo;
import com.HospitalManagement.repository.PatientRoleRepo;
import com.HospitalManagement.service.PatientService;
import com.fasterxml.jackson.core.JsonProcessingException;



@Service
public class PatientServiceImp implements PatientService{
  
	@Autowired
	PatientRepo repo;
	
	@Autowired
	PatientRoleRepo patientRoleRepo;
	
	@Autowired
	DoctorRepo doctorRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	 
    @Override
    public String SavePatients(PatientsBean request) {
        // Create and populate PatientsEntity
        PatientsEntity patient = new PatientsEntity();
        patient.setName(request.getName());
        patient.setPatientAge(request.getPatientAge());
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientContactNumber(request.getPatientContactNumber());
        patient.setEmail(request.getEmail());
        patient.setPassword(passwordEncoder.encode(request.getPassword()));

        // Save the patient entity
        PatientsEntity savedPatient = repo.save(patient);

        // Create and populate PatientRoleEntity
        PatientRoleEntity patientRole = new PatientRoleEntity();
        patientRole.setRole("User"); // Set the default role to "User"
        patientRole.setPatientsEntityForPatientRole(savedPatient); // Associate the role with the patient

        // Save the patient role entity
        patientRoleRepo.save(patientRole);

        return "Patient and role saved successfully";
    }
	
	 
	@Override
	public List<PatientsEntity> getAllPatientDetails(){
		return repo.findAll();
	}
	
	@Override
	public PatientsEntity getAllPatientDetails(int id) throws JsonProcessingException{
		return repo.findById(id).orElseThrow(()-> new ArithmeticException());
	}

	@Override
	public PatientsEntity updateRecord(int id, PatientsBean request) {
		PatientsEntity patient=repo.findById(id).orElseThrow(()->new ArithmeticException());
		patient.setName(request.getName());
        patient.setPatientAge(request.getPatientAge());
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientContactNumber(request.getPatientContactNumber());
        patient.setEmail(request.getEmail());
        patient.setPassword(request.getPassword());
        return repo.save(patient);
	}
	
	
		
}