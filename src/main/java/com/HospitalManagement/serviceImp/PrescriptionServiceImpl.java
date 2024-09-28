package com.HospitalManagement.serviceImp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.HospitalManagement.bean.PrescriptionsBean;
import com.HospitalManagement.entity.AppointmentsEntity;
import com.HospitalManagement.entity.DoctorsEntity;
import com.HospitalManagement.entity.MedicationsEntity;
import com.HospitalManagement.entity.PatientsEntity;
import com.HospitalManagement.entity.PrescriptionsEntity;
import com.HospitalManagement.repository.DoctorRepo;
import com.HospitalManagement.repository.MedicationRepo;
import com.HospitalManagement.repository.PatientRepo;
import com.HospitalManagement.repository.PrescriptionRepo;
import com.HospitalManagement.service.PrescriptionService;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

	@Autowired
	PrescriptionRepo prescriptionRepo;
	
	@Autowired
	PatientRepo patientRepo;
	
	@Autowired
	DoctorRepo doctorRepo;
	
	@Autowired
	MedicationRepo medicationRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
    @Override
    public PrescriptionsBean savePrescription(PrescriptionsBean prescriptionsBean) {
        // Convert PrescriptionsBean to PrescriptionsEntity
        PrescriptionsEntity prescriptionsEntity = modelMapper.map(prescriptionsBean, PrescriptionsEntity.class);
        prescriptionsEntity.setPrescriptionDate(LocalDateTime.now());
        
        // Fetch the associated PatientEntity, DoctorEntity, and MedicationEntity from the database
        PatientsEntity patientEntity = patientRepo.findById(prescriptionsBean.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        DoctorsEntity doctorEntity = doctorRepo.findById(prescriptionsBean.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        MedicationsEntity medicationEntity = medicationRepo.findById(prescriptionsBean.getMedicationId())
                .orElseThrow(() -> new RuntimeException("Medication not found"));

        // Set the patient, doctor, and medication in the prescription entity
        prescriptionsEntity.setPatientsPrescription(patientEntity);
        prescriptionsEntity.setDoctorPrescription(doctorEntity);
        prescriptionsEntity.setMedicationPrescription(medicationEntity);

        // Save PrescriptionsEntity to the database
        PrescriptionsEntity savedPrescriptionEntity = prescriptionRepo.save(prescriptionsEntity);

        // Map the saved entity back to DTO
        return mapToDto2(savedPrescriptionEntity);
    }

    // Helper method to map PrescriptionsEntity to PrescriptionsBean
    private PrescriptionsBean mapToDto2(PrescriptionsEntity prescriptionsEntity) {
        PrescriptionsBean prescriptionsBean = modelMapper.map(prescriptionsEntity, PrescriptionsBean.class);
        
        // Manually set patientId, doctorId, medicationId, and other details if they're not mapped automatically
        if (prescriptionsEntity.getPatientsPrescription() != null) {
            prescriptionsBean.setPatientId(prescriptionsEntity.getPatientsPrescription().getId());
            prescriptionsBean.setPatientName(prescriptionsEntity.getPatientsPrescription().getName());
        }
        if (prescriptionsEntity.getDoctorPrescription() != null) {
            prescriptionsBean.setDoctorId(prescriptionsEntity.getDoctorPrescription().getId()); // Fixed typo: getDoctoreId() -> getDoctorId()
            prescriptionsBean.setDoctorName(prescriptionsEntity.getDoctorPrescription().getName());
        }
        if (prescriptionsEntity.getMedicationPrescription() != null) {
            prescriptionsBean.setMedicationId(prescriptionsEntity.getMedicationPrescription().getMedicationId());
            prescriptionsBean.setMedicationName(prescriptionsEntity.getMedicationPrescription().getMedicationName());
            prescriptionsBean.setDosage(prescriptionsEntity.getMedicationPrescription().getDosage());
            prescriptionsBean.setUsageInstructions(prescriptionsEntity.getMedicationPrescription().getUsageInstructions());
        }

        return prescriptionsBean;
    }
	
	
	    
	    @Override
	    public Optional<PrescriptionsBean> getPrescriptionById(int id) {
	        // Fetch the prescription entity by ID
	        Optional<PrescriptionsEntity> prescriptionEntityOpt = prescriptionRepo.findById(id);

	        // If the entity is present, map it to the DTO, otherwise return an empty Optional
	        return prescriptionEntityOpt.map(this::mapToDto5);
	    }

	    // Helper method to map PrescriptionsEntity to PrescriptionsBean
	    private PrescriptionsBean mapToDto5(PrescriptionsEntity prescriptionsEntity) {
	        PrescriptionsBean prescriptionsBean = modelMapper.map(prescriptionsEntity, PrescriptionsBean.class);
	        
	        // Manually set IDs and other details if not mapped automatically
	        if (prescriptionsEntity.getPatientsPrescription() != null) {
	            prescriptionsBean.setPatientId(prescriptionsEntity.getPatientsPrescription().getId());
	            prescriptionsBean.setPatientName(prescriptionsEntity.getPatientsPrescription().getName());
	        }
	        if (prescriptionsEntity.getDoctorPrescription() != null) {
	            prescriptionsBean.setDoctorId(prescriptionsEntity.getDoctorPrescription().getId());
	            prescriptionsBean.setDoctorName(prescriptionsEntity.getDoctorPrescription().getName());
	        }
	        if (prescriptionsEntity.getMedicationPrescription() != null) {
	            prescriptionsBean.setMedicationId(prescriptionsEntity.getMedicationPrescription().getMedicationId());
	            prescriptionsBean.setMedicationName(prescriptionsEntity.getMedicationPrescription().getMedicationName());
	            prescriptionsBean.setDosage(prescriptionsEntity.getMedicationPrescription().getDosage());
	            prescriptionsBean.setUsageInstructions(prescriptionsEntity.getMedicationPrescription().getUsageInstructions());
	        }

	        return prescriptionsBean;
	    }
	    
	    
	    
	    @Override
	    public List<PrescriptionsBean> getAllPrescriptions() {
	        // Fetch all prescription entities
	        List<PrescriptionsEntity> prescriptionsEntities = prescriptionRepo.findAll();

	        // Map each entity to its corresponding bean
	        return prescriptionsEntities.stream().map(this::mapToDto6).collect(Collectors.toList());
	    }

	    // Helper method to map PrescriptionsEntity to PrescriptionsBean
	    private PrescriptionsBean mapToDto6(PrescriptionsEntity prescriptionsEntity) {
	        PrescriptionsBean prescriptionsBean = modelMapper.map(prescriptionsEntity, PrescriptionsBean.class);
	        
	        // Manually set IDs and other details if not mapped automatically
	        if (prescriptionsEntity.getPatientsPrescription() != null) {
	            prescriptionsBean.setPatientId(prescriptionsEntity.getPatientsPrescription().getId());
	            prescriptionsBean.setPatientName(prescriptionsEntity.getPatientsPrescription().getName());
	        }
	        if (prescriptionsEntity.getDoctorPrescription() != null) {
	            prescriptionsBean.setDoctorId(prescriptionsEntity.getDoctorPrescription().getId());
	            prescriptionsBean.setDoctorName(prescriptionsEntity.getDoctorPrescription().getName());
	        }
	        if (prescriptionsEntity.getMedicationPrescription() != null) {
	            prescriptionsBean.setMedicationId(prescriptionsEntity.getMedicationPrescription().getMedicationId());
	            prescriptionsBean.setMedicationName(prescriptionsEntity.getMedicationPrescription().getMedicationName());
	            prescriptionsBean.setDosage(prescriptionsEntity.getMedicationPrescription().getDosage());
	            prescriptionsBean.setUsageInstructions(prescriptionsEntity.getMedicationPrescription().getUsageInstructions());
	        }

	        return prescriptionsBean;
	    }
	    
	    
	    @Override
	    public PrescriptionsBean updatePrescription(int id, PrescriptionsBean prescriptionsBean) {
	        // Fetch the existing prescription entity from the database
	        PrescriptionsEntity existingPrescriptionEntity = prescriptionRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("Prescription not found"));

	        // Update the existing entity with new values
	        existingPrescriptionEntity.setQuantity(prescriptionsBean.getQuantity());
	        existingPrescriptionEntity.setPrescriptionDate(LocalDateTime.now());

	        // Fetch and set the associated entities
	        PatientsEntity patientEntity = patientRepo.findById(prescriptionsBean.getPatientId())
	                .orElseThrow(() -> new RuntimeException("Patient not found"));
	        DoctorsEntity doctorEntity = doctorRepo.findById(prescriptionsBean.getDoctorId())
	                .orElseThrow(() -> new RuntimeException("Doctor not found"));
	        MedicationsEntity medicationEntity = medicationRepo.findById(prescriptionsBean.getMedicationId())
	                .orElseThrow(() -> new RuntimeException("Medication not found"));

	        existingPrescriptionEntity.setPatientsPrescription(patientEntity);
	        existingPrescriptionEntity.setDoctorPrescription(doctorEntity);
	        existingPrescriptionEntity.setMedicationPrescription(medicationEntity);

	        // Save the updated entity
	        PrescriptionsEntity updatedPrescriptionEntity = prescriptionRepo.save(existingPrescriptionEntity);

	        // Map the updated entity back to DTO
	        return mapToDto2(updatedPrescriptionEntity);
	    }

	    
	    
	    @Override
	    public void deletePrescription(int id) {
	        // Check if the prescription exists
	        if (prescriptionRepo.existsById(id)) {
	            prescriptionRepo.deleteById(id);
	        } else {
	            throw new RuntimeException("Prescription not found with id: " + id);
	        }
	    }
	    
	    
	    
	    // Get prescriptions by patient ID
	    @Override
	    public List<PrescriptionsBean> getPrescriptionsByPatientId(int patientId) {
	        List<PrescriptionsEntity> prescriptionsEntities = prescriptionRepo.findByPatientsPrescriptionId(patientId);
	        return prescriptionsEntities.stream().map(this::mapToDto6).collect(Collectors.toList());
	    }
	    
}
