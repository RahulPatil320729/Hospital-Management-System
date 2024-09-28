package com.HospitalManagement.serviceImp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.HospitalManagement.bean.LabTestRecordBean;
import com.HospitalManagement.entity.LabTestRecordEntity;
import com.HospitalManagement.entity.PatientsEntity;
import com.HospitalManagement.repository.LabTestRepo;
import com.HospitalManagement.repository.PatientRepo;
import com.HospitalManagement.service.LabTestService;

@Service
public class LabTestServiceImp implements LabTestService {

	@Autowired
	LabTestRepo labTestRepo;
	
	@Autowired
	PatientRepo patientRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Override
	public LabTestRecordBean saveLabTestRecord(LabTestRecordBean labTestRecordBean) {
	    // Convert LabTestRecordBean to LabTestRecordEntity
	    LabTestRecordEntity labTestRecordEntity = modelMapper.map(labTestRecordBean, LabTestRecordEntity.class);
	    
	    // Set the current date/time for the testDate
	    labTestRecordEntity.setTestDate(LocalDateTime.now());
	    
	    // Fetch the associated PatientEntity from the database
	    PatientsEntity patientEntity = patientRepo.findById(labTestRecordBean.getPatientId())
	            .orElseThrow(() -> new RuntimeException("Patient not found"));

	    // Set the patient in the lab test record entity
	    labTestRecordEntity.setPatientsEntityForLabTest(patientEntity);

	    // Save LabTestRecordEntity to the database
	    LabTestRecordEntity savedLabTestRecordEntity = labTestRepo.save(labTestRecordEntity);

	    // Map the saved entity back to DTO
	    return mapToDto(savedLabTestRecordEntity);
	}
	private LabTestRecordBean mapToDto(LabTestRecordEntity labTestRecordEntity) {
	    LabTestRecordBean labTestRecordBean = modelMapper.map(labTestRecordEntity, LabTestRecordBean.class);
	    
	    // Manually set patientId if it's not mapped automatically
	    if (labTestRecordEntity.getPatientsEntityForLabTest() != null) {
	        labTestRecordBean.setPatientId(labTestRecordEntity.getPatientsEntityForLabTest().getId());
	    }
	    
	    return labTestRecordBean;
	}
	
   //This is for find by id
	 @Override
	    public Optional<LabTestRecordBean> getLabTestRecordById(int id) {
	        return labTestRepo.findById(id)
	                .map(this::mapToDto2);
	    }

	    private LabTestRecordBean mapToDto2(LabTestRecordEntity labTestRecordEntity) {
	        LabTestRecordBean labTestRecordBean = modelMapper.map(labTestRecordEntity, LabTestRecordBean.class);
	        if (labTestRecordEntity.getPatientsEntityForLabTest() != null) {
	            labTestRecordBean.setPatientId(labTestRecordEntity.getPatientsEntityForLabTest().getId());
	        }
	        return labTestRecordBean;
	    }
	    
	    
	//This is for to get All data
	    @Override
	    public List<LabTestRecordBean> getAllLabTestRecords() {
	        // Fetch all LabTestRecordEntity from the repository
	        List<LabTestRecordEntity> labTestRecordEntities = labTestRepo.findAll();

	        // Convert the list of entities to DTOs
	        return labTestRecordEntities.stream()
	                .map(this::mapToDto3)
	                .collect(Collectors.toList());
	    }

	    private LabTestRecordBean mapToDto3(LabTestRecordEntity labTestRecordEntity) {
	        LabTestRecordBean labTestRecordBean = modelMapper.map(labTestRecordEntity, LabTestRecordBean.class);
	        
	        // Manually set patientId if it's not mapped automatically
	        if (labTestRecordEntity.getPatientsEntityForLabTest() != null) {
	            labTestRecordBean.setPatientId(labTestRecordEntity.getPatientsEntityForLabTest().getId());
	        }

	        return labTestRecordBean;
	    }
	    
	    
	    @Override
	    public String deleteLabTestRecordById(int id) {
	        if (labTestRepo.existsById(id)) {
	            labTestRepo.deleteById(id);   
	            return "Data Deleted Successfully";   
	        } else {
	            throw new RuntimeException("Test id not found : " + id);
	        }  
	    }
	    
	    
//	    Update LabTest Table    
	    @Override
	    public LabTestRecordBean updateLabTestRecord(int id, LabTestRecordBean labTestRecordBean) {
	        // Fetch the existing record from the database
	        LabTestRecordEntity existingRecord = labTestRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("LabTestRecord with ID " + id + " not found"));

	        // Update the fields of the existing record with the new values
	        if (labTestRecordBean.getTestName() != null) {
	            existingRecord.setTestName(labTestRecordBean.getTestName());
	        }
	        if (labTestRecordBean.getResult() != null) {
	            existingRecord.setResult(labTestRecordBean.getResult());
	        }

	        // Optionally update the testDate if it is provided
	        // existingRecord.setTestDate(LocalDateTime.now()); // Uncomment if you want to update the date/time

	        // Fetch the associated PatientEntity from the database
	        if (labTestRecordBean.getPatientId() != 0) {
	            PatientsEntity patientEntity = patientRepo.findById(labTestRecordBean.getPatientId())
	                    .orElseThrow(() -> new RuntimeException("Patient not found"));

	            existingRecord.setPatientsEntityForLabTest(patientEntity);
	        }

	        // Save the updated LabTestRecordEntity to the database
	        LabTestRecordEntity updatedLabTestRecordEntity = labTestRepo.save(existingRecord);

	        // Map the updated entity back to DTO
	        return mapToDto4(updatedLabTestRecordEntity);
	    }

	    private LabTestRecordBean mapToDto4(LabTestRecordEntity labTestRecordEntity) {
	        LabTestRecordBean labTestRecordBean = modelMapper.map(labTestRecordEntity, LabTestRecordBean.class);
	        if (labTestRecordEntity.getPatientsEntityForLabTest() != null) {
	            labTestRecordBean.setPatientId(labTestRecordEntity.getPatientsEntityForLabTest().getId());
	        }
	        return labTestRecordBean;
	    }
	    
	    
	    
	 // Method to get lab test data by patient ID
	    @Override
	    public List<LabTestRecordBean> getLabTestRecordsByPatientId(int patientId) {
	        // Fetch the patient entity by ID
	        PatientsEntity patientEntity = patientRepo.findById(patientId)
	                .orElseThrow(() -> new RuntimeException("Patient not found"));

	        // Fetch lab test records for the specific patient
	        List<LabTestRecordEntity> labTestRecordEntities = labTestRepo.findByPatientsEntityForLabTest_Id(patientId);

	        // Convert the list of entities to beans (DTOs)
	        return labTestRecordEntities.stream()
	                .map(this::mapToDto6)
	                .collect(Collectors.toList());
	    }

	    private LabTestRecordBean mapToDto6(LabTestRecordEntity labTestRecordEntity) {
	        LabTestRecordBean labTestRecordBean = modelMapper.map(labTestRecordEntity, LabTestRecordBean.class);
	        if (labTestRecordEntity.getPatientsEntityForLabTest() != null) {
	            labTestRecordBean.setPatientId(labTestRecordEntity.getPatientsEntityForLabTest().getId());
	        }
	        return labTestRecordBean;
	    }
	    
	    
	    
	    
}
	    
	

