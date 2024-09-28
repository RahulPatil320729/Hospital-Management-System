package com.HospitalManagement.serviceImp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HospitalManagement.bean.MedicalHistoryBean;
import com.HospitalManagement.entity.MedicalHistoryEntity;
import com.HospitalManagement.entity.PatientsEntity;
import com.HospitalManagement.repository.MedicalHistoryRepo;
import com.HospitalManagement.repository.MedicationRepo;
import com.HospitalManagement.repository.PatientRepo;
import com.HospitalManagement.service.MedicalHistoryService;

@Service
public class MedicalHistoryServiceImpl implements MedicalHistoryService{

	@Autowired
	MedicalHistoryRepo medicalHistoryRepo;
	
	@Autowired
	PatientRepo patientRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	  @Override
	    public MedicalHistoryBean saveMedicalHistory(MedicalHistoryBean medicalHistoryBean) {
	        // Convert MedicalHistoryBean to MedicalHistoryEntity
	        MedicalHistoryEntity medicalHistoryEntity = modelMapper.map(medicalHistoryBean, MedicalHistoryEntity.class);

	        // Set the current date/time for the diagnosisDate
	        medicalHistoryEntity.setDiagnosisDate(LocalDateTime.now());

	        // Fetch the associated PatientEntity from the database
	        PatientsEntity patientEntity = patientRepo.findById(medicalHistoryBean.getPatientId())
	                .orElseThrow(() -> new RuntimeException("Patient not found"));

	        // Set the patient in the medical history entity
	        medicalHistoryEntity.setPatientsEntityForMedicalHistory(patientEntity);

	        // Save MedicalHistoryEntity to the database
	        MedicalHistoryEntity savedMedicalHistoryEntity = medicalHistoryRepo.save(medicalHistoryEntity);

	        // Map the saved entity back to DTO
	        return mapToDto(savedMedicalHistoryEntity);
	    }

	    private MedicalHistoryBean mapToDto(MedicalHistoryEntity medicalHistoryEntity) {
	        MedicalHistoryBean medicalHistoryBean = modelMapper.map(medicalHistoryEntity, MedicalHistoryBean.class);

	        // Manually set patientId if it's not mapped automatically
	        if (medicalHistoryEntity.getPatientsEntityForMedicalHistory() != null) {
	            medicalHistoryBean.setPatientId(medicalHistoryEntity.getPatientsEntityForMedicalHistory().getId());
	        }

	        return medicalHistoryBean;
	    }
	
	
	    
	    @Override
	    public List<MedicalHistoryBean> getAllMedicalHistory() {
	        // Fetch all MedicalHistoryEntity from the repository
	        List<MedicalHistoryEntity> medicalHistoryEntities = medicalHistoryRepo.findAll();

	        // Convert the list of entities to DTOs
	        return medicalHistoryEntities.stream()
	                .map(this::mapToDto2)
	                .collect(Collectors.toList());
	    }

	    private MedicalHistoryBean mapToDto2(MedicalHistoryEntity medicalHistoryEntity) {
	        MedicalHistoryBean medicalHistoryBean = modelMapper.map(medicalHistoryEntity, MedicalHistoryBean.class);
	        
	        // Manually set patientId if it's not mapped automatically
	        if (medicalHistoryEntity.getPatientsEntityForMedicalHistory() != null) {
	            medicalHistoryBean.setPatientId(medicalHistoryEntity.getPatientsEntityForMedicalHistory().getId());
	        }

	        return medicalHistoryBean;
	    }
	    
	    
	    @Override
	    public Optional<MedicalHistoryBean> getMedicalHistoryById(int id) {
	        return medicalHistoryRepo.findById(id)
	                .map(this::mapToDto3);
	    }

	    private MedicalHistoryBean mapToDto3(MedicalHistoryEntity medicalHistoryEntity) {
	        MedicalHistoryBean medicalHistoryBean = modelMapper.map(medicalHistoryEntity, MedicalHistoryBean.class);
	        if (medicalHistoryEntity.getPatientsEntityForMedicalHistory() != null) {
	            medicalHistoryBean.setPatientId(medicalHistoryEntity.getPatientsEntityForMedicalHistory().getId());
	        }
	        return medicalHistoryBean;
	    }
	    
	    
	    @Override
	    public String deleteMedicalHistoryById(int id) {
	        if (medicalHistoryRepo.existsById(id)) {
	            medicalHistoryRepo.deleteById(id);
	            return "Data Deleted Successfully";
	        } else {
	            throw new RuntimeException("Medical History ID not found: " + id);
	        }
	    }
	    
	    
	    
	    @Override
	    public MedicalHistoryBean updateMedicalHistory(int id, MedicalHistoryBean medicalHistoryBean) {
	        // Fetch the existing record from the database
	        MedicalHistoryEntity existingRecord = medicalHistoryRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("MedicalHistory with ID " + id + " not found"));

	        // Update the fields of the existing record with the new values
	        if (medicalHistoryBean.getMedicalCondition() != null) {
	            existingRecord.setMedicalCondition(medicalHistoryBean.getMedicalCondition());
	        }
	        if (medicalHistoryBean.getDiagnosisDate() != null) {
	            existingRecord.setDiagnosisDate(medicalHistoryBean.getDiagnosisDate());
	        }
	        if (medicalHistoryBean.getTreatment() != null) {
	            existingRecord.setTreatment(medicalHistoryBean.getTreatment());
	        }

	        // Fetch the associated PatientEntity from the database
	        if (medicalHistoryBean.getPatientId() != 0) {
	            PatientsEntity patientEntity = patientRepo.findById(medicalHistoryBean.getPatientId())
	                    .orElseThrow(() -> new RuntimeException("Patient not found"));

	            existingRecord.setPatientsEntityForMedicalHistory(patientEntity);
	        }

	        // Save the updated MedicalHistoryEntity to the database
	        MedicalHistoryEntity updatedMedicalHistoryEntity = medicalHistoryRepo.save(existingRecord);

	        // Map the updated entity back to DTO
	        return mapToDto4(updatedMedicalHistoryEntity);
	    }

	    private MedicalHistoryBean mapToDto4(MedicalHistoryEntity medicalHistoryEntity) {
	        MedicalHistoryBean medicalHistoryBean = modelMapper.map(medicalHistoryEntity, MedicalHistoryBean.class);
	        if (medicalHistoryEntity.getPatientsEntityForMedicalHistory() != null) {
	            medicalHistoryBean.setPatientId(medicalHistoryEntity.getPatientsEntityForMedicalHistory().getId());
	        }
	        return medicalHistoryBean;
	    }
	    
	    
	    @Override
	    public List<MedicalHistoryBean> getMedicalHistoryByPatientId(int patientId) {
	        // Fetch medical history entities by patient ID
	        List<MedicalHistoryEntity> medicalHistoryEntities = medicalHistoryRepo.findByPatientsEntityForMedicalHistory_Id(patientId);
	        
	        // Convert the list of entities to DTOs
	        return medicalHistoryEntities.stream()
	                .map(this::mapToDto)
	                .collect(Collectors.toList());
	    }
	    
	    
	    
}
