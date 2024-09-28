package com.HospitalManagement.serviceImp;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HospitalManagement.bean.MedicationsBean;
import com.HospitalManagement.entity.MedicationsEntity;
import com.HospitalManagement.repository.MedicationRepo;
import com.HospitalManagement.service.MedicationService;

@Service
public class MedicationServiceImp implements MedicationService{
	
	@Autowired
	MedicationRepo medicationRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public MedicationsBean saveMedication(MedicationsBean medicationBean) {
		    // Convert MedicationsBean to MedicationsEntity
		    MedicationsEntity medicationsEntity = modelMapper.map(medicationBean, MedicationsEntity.class);
		    
		    // Set any additional fields if necessary
		    // For example, if you need to set the current date or other default values:
		    // medicationsEntity.setCreatedDate(LocalDateTime.now());
		    
		    // Save MedicationsEntity to the database
		    MedicationsEntity savedMedicationsEntity = medicationRepo.save(medicationsEntity);
		    
		    // Map the saved entity back to DTO
		    return mapToDto(savedMedicationsEntity);
		}

		private MedicationsBean mapToDto(MedicationsEntity medicationsEntity) {
		    MedicationsBean medicationsBean = modelMapper.map(medicationsEntity, MedicationsBean.class);
		    
		    // You can add additional logic here if needed
		    // For example, if you need to set or map extra fields
		    // medicationsBean.setAdditionalField(medicationsEntity.getAdditionalField());
		    
		    return medicationsBean;
		}
		
		
		
		@Override
	    public Optional<MedicationsBean> getMedicationById(int id) {
	        return medicationRepo.findById(id)
	            .map(this::mapToDto2);
	    }

	    private MedicationsBean mapToDto2(MedicationsEntity medicationsEntity) {
	        MedicationsBean medicationsBean = modelMapper.map(medicationsEntity, MedicationsBean.class);
	        return medicationsBean;
	    }
		
	    
	    @Override
	    public List<MedicationsBean> getAllMedications() {
	        return medicationRepo.findAll().stream()
	            .map(this::mapToDto3)
	            .collect(Collectors.toList());
	    }

	    private MedicationsBean mapToDto3(MedicationsEntity medicationsEntity) {
	        return modelMapper.map(medicationsEntity, MedicationsBean.class);
	    }

	    
	    @Override
	    public MedicationsBean updateMedication(int id, MedicationsBean medicationsBean) {
	        // Check if the medication exists
	        if (!medicationRepo.existsById(id)) {
	            throw new RuntimeException("Medication not found with id: " + id);
	        }
	        // Convert DTO to entity
	        MedicationsEntity medicationsEntity = modelMapper.map(medicationsBean, MedicationsEntity.class);
	        medicationsEntity.setMedicationId(id); // Ensure ID is set for the update
	        // Save the updated entity
	        MedicationsEntity updatedMedicationsEntity = medicationRepo.save(medicationsEntity);
	        return mapToDto4(updatedMedicationsEntity);
	    }

	    private MedicationsBean mapToDto4(MedicationsEntity medicationsEntity) {
	        return modelMapper.map(medicationsEntity, MedicationsBean.class);
	    }
	    
	    
	    
	    @Override
	    public String deleteMedicationById(int id) {
	        if (medicationRepo.existsById(id)) {
	            medicationRepo.deleteById(id);
	            return "Data Deleted Successfully";
	        } else {
	            throw new RuntimeException("Medication id not found: " + id);
	        }
	    }

	    private MedicationsBean mapToDto5(MedicationsEntity medicationsEntity) {
	        return modelMapper.map(medicationsEntity, MedicationsBean.class);
	    }
	    
	    
	    
}
