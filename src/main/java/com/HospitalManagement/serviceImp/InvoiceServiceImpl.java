package com.HospitalManagement.serviceImp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.HospitalManagement.bean.InvoiceBean;
import com.HospitalManagement.entity.DoctorsEntity;
import com.HospitalManagement.entity.InvoiceEntity;
import com.HospitalManagement.entity.PatientsEntity;
import com.HospitalManagement.repository.DoctorRepo;
import com.HospitalManagement.repository.InvoiceRepo;
import com.HospitalManagement.repository.PatientRepo;
import com.HospitalManagement.service.InvoiceService;

@Service
public class InvoiceServiceImpl implements InvoiceService{

	@Autowired
	InvoiceRepo invoiceRepo;
	
	@Autowired
	PatientRepo patientRepo;
	
	@Autowired
	DoctorRepo doctorRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Override
    public InvoiceBean saveInvoice(InvoiceBean invoiceBean) {
        // Convert InvoiceBean to InvoiceEntity
        InvoiceEntity invoiceEntity = modelMapper.map(invoiceBean, InvoiceEntity.class);
        invoiceEntity.setInvoiceDate(LocalDateTime.now());

        // Fetch the associated PatientEntity and DoctorEntity from the database
        PatientsEntity patientEntity = patientRepo.findById(invoiceBean.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        DoctorsEntity doctorEntity = doctorRepo.findById(invoiceBean.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Set the patient and doctor in the invoice entity
        invoiceEntity.setPatientInvoice(patientEntity);
        invoiceEntity.setDoctorInvoice(doctorEntity);

        // Save InvoiceEntity to the database
        InvoiceEntity savedInvoiceEntity = invoiceRepo.save(invoiceEntity);

        // Map the saved entity back to DTO
        return mapToDto(savedInvoiceEntity);
    }

    // Helper method to map InvoiceEntity to InvoiceBean
    private InvoiceBean mapToDto(InvoiceEntity invoiceEntity) {
        InvoiceBean invoiceBean = modelMapper.map(invoiceEntity, InvoiceBean.class);

        // Manually set patientId and doctorId if they're not mapped automatically
        if (invoiceEntity.getPatientInvoice() != null) {
            invoiceBean.setPatientId(invoiceEntity.getPatientInvoice().getId());
        }
        if (invoiceEntity.getDoctorInvoice() != null) {
            invoiceBean.setDoctorId(invoiceEntity.getDoctorInvoice().getId());
        }

        return invoiceBean;
    }
    
    
    
    @Override
    public List<InvoiceBean> getAllInvoices() {
        // Fetch all invoice entities
        List<InvoiceEntity> invoiceEntities = invoiceRepo.findAll();
        
        // Convert entities to DTOs
        return invoiceEntities.stream()
                .map(this::mapToDto2)
                .collect(Collectors.toList());
    }

    // Helper method to map InvoiceEntity to InvoiceBean
    private InvoiceBean mapToDto2(InvoiceEntity invoiceEntity) {
        InvoiceBean invoiceBean = modelMapper.map(invoiceEntity, InvoiceBean.class);

        // Manually set patientId and doctorId if they're not mapped automatically
        if (invoiceEntity.getPatientInvoice() != null) {
            invoiceBean.setPatientId(invoiceEntity.getPatientInvoice().getId());
        }
        if (invoiceEntity.getDoctorInvoice() != null) {
            invoiceBean.setDoctorId(invoiceEntity.getDoctorInvoice().getId());
        }

        return invoiceBean;
    }
	
	
    @Override
    public Optional<InvoiceBean> getInvoiceById(int id) {
        return invoiceRepo.findById(id)
                .map(this::mapToDto3);
    }

    // Helper method to map InvoiceEntity to InvoiceBean
    private InvoiceBean mapToDto3(InvoiceEntity invoiceEntity) {
        InvoiceBean invoiceBean = modelMapper.map(invoiceEntity, InvoiceBean.class);

        // Manually set patientId and doctorId if they're not mapped automatically
        if (invoiceEntity.getPatientInvoice() != null) {
            invoiceBean.setPatientId(invoiceEntity.getPatientInvoice().getId());
        }
        if (invoiceEntity.getDoctorInvoice() != null) {
            invoiceBean.setDoctorId(invoiceEntity.getDoctorInvoice().getId());
        }

        return invoiceBean;
    }
	
	

    @Override
    public InvoiceBean updateInvoice(int id, InvoiceBean invoiceBean) {   	
    	 // Check if the invoice exists
        InvoiceEntity existingInvoice = invoiceRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
        
        // Convert InvoiceBean to InvoiceEntity
        InvoiceEntity invoiceEntity = modelMapper.map(invoiceBean, InvoiceEntity.class);
        
        // Fetch the associated PatientEntity and DoctorEntity from the database
        PatientsEntity patientEntity = patientRepo.findById(invoiceBean.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + invoiceBean.getPatientId()));
        DoctorsEntity doctorEntity = doctorRepo.findById(invoiceBean.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + invoiceBean.getDoctorId()));

        // Update the existing invoice with the new data, preserving existing values where necessary
        existingInvoice.setPatientInvoice(patientEntity);
        existingInvoice.setDoctorInvoice(doctorEntity);
        
        // Update only the fields that are provided in the invoiceBean
        if (invoiceBean.getInvoiceDate() != null) {
            existingInvoice.setInvoiceDate(invoiceBean.getInvoiceDate());
        }
        if (invoiceBean.getTotalAmount() != 0) { // Assuming totalAmount is 0 if not provided
            existingInvoice.setTotalAmount(invoiceBean.getTotalAmount());
        }

        // Save the updated entity
        InvoiceEntity updatedInvoiceEntity = invoiceRepo.save(existingInvoice);

        // Map the updated entity back to DTO
        return mapToDto(updatedInvoiceEntity);       
    }
    
    
    @Override
    public String deleteInvoice(int id) {
        if (invoiceRepo.existsById(id)) {
            invoiceRepo.deleteById(id);
            return "Invoice Deleted Successfully";
        } else {
            throw new RuntimeException("Invoice not found with id: " + id);
        }
    }
    
    
	
	
}
