package com.HospitalManagement.serviceImp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.HospitalManagement.bean.AppointmentsBean;
import com.HospitalManagement.entity.AppointmentsEntity;
import com.HospitalManagement.entity.DoctorsEntity;
import com.HospitalManagement.entity.PatientsEntity;
import com.HospitalManagement.repository.AppointmentsRepo;
import com.HospitalManagement.repository.DoctorRepo;
import com.HospitalManagement.repository.PatientRepo;
import com.HospitalManagement.service.AppointmentService;
import com.HospitalManagement.utility.AppConstant.JOB_APPLICATION_STATUS;

@Service
public class AppointmentServiceImp implements AppointmentService{
	
	@Autowired
	AppointmentsRepo appointmentsRepo;

	@Autowired
	PatientRepo patientRepo;
	
	@Autowired
	DoctorRepo doctorRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Override
	public AppointmentsBean saveAppointment(AppointmentsBean appointmentsBean) {
	    // Convert AppointmentsBean to AppointmentsEntity
	    AppointmentsEntity appointmentsEntity = modelMapper.map(appointmentsBean, AppointmentsEntity.class);

	    // Set the default status to "Pending"
	    appointmentsEntity.setAppointmentStatus("PENDING");

	    // Fetch the associated PatientEntity and DoctorEntity from the database
	    PatientsEntity patientEntity = patientRepo.findById(appointmentsBean.getPatientId())
	            .orElseThrow(() -> new RuntimeException("Patient not found"));
	    DoctorsEntity doctorEntity = doctorRepo.findById(appointmentsBean.getDoctorId())
	            .orElseThrow(() -> new RuntimeException("Doctor not found"));

	    // Set the patient and doctor in the appointment entity
	    appointmentsEntity.setPatientsEntity(patientEntity);
	    appointmentsEntity.setDoctorsEntity(doctorEntity);

	    // Save AppointmentsEntity to the database
	    AppointmentsEntity savedAppointmentEntity = appointmentsRepo.save(appointmentsEntity);

	    // Map the saved entity back to DTO
	    return mapToDto(savedAppointmentEntity);
	}

	// Helper method to map AppointmentsEntity to AppointmentsBean
	private AppointmentsBean mapToDto(AppointmentsEntity appointmentsEntity) {
	    AppointmentsBean appointmentsBean = modelMapper.map(appointmentsEntity, AppointmentsBean.class);

	    // Manually set doctor and patient details if they're not mapped automatically
	    // This assumes that patient and doctor details are automatically mapped in the DTO.
	    if (appointmentsEntity.getPatientsEntity() != null) {
	        PatientsEntity patient = appointmentsEntity.getPatientsEntity();
	        appointmentsBean.setPatientName(patient.getName()); // Adjust according to your Patient entity
	        appointmentsBean.setPatientAge(patient.getPatientAge()); // Adjust according to your Patient entity
	        appointmentsBean.setPatientGender(patient.getPatientGender()); // Adjust according to your Patient entity
	        appointmentsBean.setPatientEmail(patient.getEmail()); // Adjust according to your Patient entity
	        appointmentsBean.setPatientContactNumber(patient.getPatientContactNumber());
	    }
	    if (appointmentsEntity.getDoctorsEntity() != null) {
	        DoctorsEntity doctor = appointmentsEntity.getDoctorsEntity();
	        appointmentsBean.setDoctorName(doctor.getName()); // Adjust according to your Doctor entity
	        appointmentsBean.setDoctorSpecialization(doctor.getDoctorSpecialization()); // Adjust according to your Doctor entity
	        appointmentsBean.setDoctorEmail(doctor.getEmail()); // Adjust according to your Doctor entity
	    }

	    return appointmentsBean;
	}

    
    
    @Override
    public Optional<AppointmentsBean> getAppointmentById(int id) {
        return appointmentsRepo.findById(id)
            .map(entity -> {
                AppointmentsBean appointmentBean = modelMapper.map(entity, AppointmentsBean.class);

                // Set doctor details
                DoctorsEntity doctor = entity.getDoctorsEntity();
                if (doctor != null) {
                    appointmentBean.setDoctorName(doctor.getName());
                    appointmentBean.setDoctorSpecialization(doctor.getDoctorSpecialization());
                    appointmentBean.setDoctorEmail(doctor.getEmail());
                }

                // Set patient details
                PatientsEntity patient = entity.getPatientsEntity();
                if (patient != null) {
                    appointmentBean.setPatientName(patient.getName());
                    appointmentBean.setPatientAge(patient.getPatientAge());
                    appointmentBean.setPatientGender(patient.getPatientGender());
                    appointmentBean.setPatientEmail(patient.getEmail());
                    appointmentBean.setPatientContactNumber(patient.getPatientContactNumber());
                }

                return appointmentBean;
            });
    }
    
    
    @Override
    public List<AppointmentsBean> getAllAppointments() {
        List<AppointmentsEntity> appointmentsEntities = appointmentsRepo.findAll();
        List<AppointmentsBean> appointmentsBeans = new ArrayList<>();

        for (AppointmentsEntity appointmentEntity : appointmentsEntities) {
            // Map the entity to the bean
            AppointmentsBean appointmentBean = modelMapper.map(appointmentEntity, AppointmentsBean.class);

            // Set doctor details
            if (appointmentEntity.getDoctorsEntity() != null) {
                appointmentBean.setDoctorId(appointmentEntity.getDoctorsEntity().getId());
                appointmentBean.setDoctorName(appointmentEntity.getDoctorsEntity().getName());
                appointmentBean.setDoctorSpecialization(appointmentEntity.getDoctorsEntity().getDoctorSpecialization());
                appointmentBean.setDoctorEmail(appointmentEntity.getDoctorsEntity().getEmail());
            }

            // Set patient details
            if (appointmentEntity.getPatientsEntity() != null) {
                appointmentBean.setPatientId(appointmentEntity.getPatientsEntity().getId());
                appointmentBean.setPatientName(appointmentEntity.getPatientsEntity().getName());
                appointmentBean.setPatientAge(appointmentEntity.getPatientsEntity().getPatientAge());
                appointmentBean.setPatientGender(appointmentEntity.getPatientsEntity().getPatientGender());
                appointmentBean.setPatientEmail(appointmentEntity.getPatientsEntity().getEmail());
                appointmentBean.setPatientContactNumber(appointmentEntity.getPatientsEntity().getPatientContactNumber());
            }

            // Add the populated bean to the list
            appointmentsBeans.add(appointmentBean);
        }

        return appointmentsBeans;
    }

    
//  Delete an appointment
    @Override
    public String deleteAppointment(int id) {
        if (appointmentsRepo.existsById(id)) {
            appointmentsRepo.deleteById(id);   
            return "Data Deleted Successfully";   
        } else {
            throw new RuntimeException("Appointment not found : " + id);
        }                                                                          
    }

//  Update an appointment
//    @Override
//    public AppointmentsBean updateAppointment(int appointmentId, AppointmentsBean appointmentsBean) {
//        // Fetch the existing appointment from the database
//        AppointmentsEntity existingAppointment = appointmentsRepo.findById(appointmentId)
//                .orElseThrow(() -> new RuntimeException("Appointment not found"));
//
//        // Update the fields with the new values provided
//        existingAppointment.setAppointmentStatus(appointmentsBean.getAppointmentStatus());
//        existingAppointment.setAppointmentDate(appointmentsBean.getAppointmentDate());
//
//        // Fetch the associated PatientEntity and DoctorEntity from the database
//        PatientsEntity patientEntity = patientRepo.findById(appointmentsBean.getPatientId())
//                .orElseThrow(() -> new RuntimeException("Patient not found"));
//        DoctorsEntity doctorEntity = doctorRepo.findById(appointmentsBean.getDoctorId())
//                .orElseThrow(() -> new RuntimeException("Doctor not found"));
//
//        // Update patient and doctor in the appointment entity
//        existingAppointment.setPatientsEntity(patientEntity);
//        existingAppointment.setDoctorsEntity(doctorEntity);
//
//        // Save the updated AppointmentsEntity to the database
//        AppointmentsEntity updatedAppointmentEntity = appointmentsRepo.save(existingAppointment);
//
//        // Map the updated entity back to DTO
//        return mapToDto3(updatedAppointmentEntity);
//    }
//
//    // Helper method to map AppointmentsEntity to AppointmentsBean
//    private AppointmentsBean mapToDto3(AppointmentsEntity appointmentsEntity) {
//        AppointmentsBean appointmentsBean = modelMapper.map(appointmentsEntity, AppointmentsBean.class);
//
//        // Manually set doctor and patient details if they're not mapped automatically
//        if (appointmentsEntity.getPatientsEntity() != null) {
//            PatientsEntity patient = appointmentsEntity.getPatientsEntity();
//            appointmentsBean.setPatientName(patient.getName()); // Adjust according to your Patient entity
//            appointmentsBean.setPatientAge(patient.getPatientAge());   // Adjust according to your Patient entity
//            appointmentsBean.setPatientGender(patient.getPatientGender()); // Adjust according to your Patient entity
//            appointmentsBean.setPatientEmail(patient.getEmail()); // Adjust according to your Patient entity
//            appointmentsBean.setPatientContactNumber(patient.getPatientContactNumber());
//        }
//        if (appointmentsEntity.getDoctorsEntity() != null) {
//            DoctorsEntity doctor = appointmentsEntity.getDoctorsEntity();
//            appointmentsBean.setDoctorName(doctor.getName()); // Adjust according to your Doctor entity
//            appointmentsBean.setDoctorSpecialization(doctor.getDoctorSpecialization()); // Adjust according to your Doctor entity
//            appointmentsBean.setDoctorEmail(doctor.getEmail()); // Adjust according to your Doctor entity
//        }
//
//        return appointmentsBean;
//    }
    
    
    
 // Method to get appointments by patientId
    public List<AppointmentsBean> getAppointmentsByPatientId(int patientId) {
        // Fetch appointments where the patient ID matches
        List<AppointmentsEntity> appointmentsEntities = appointmentsRepo.findByPatientsEntity_Id(patientId);

        // Map the entity list to the bean list
        return appointmentsEntities.stream().map(this::mapToDto1).collect(Collectors.toList());
    }

    // Helper method to map AppointmentsEntity to AppointmentsBean
    private AppointmentsBean mapToDto1(AppointmentsEntity appointmentsEntity) {
        AppointmentsBean appointmentsBean = modelMapper.map(appointmentsEntity, AppointmentsBean.class);

        // Manually set patient details if necessary
        if (appointmentsEntity.getPatientsEntity() != null) {
            PatientsEntity patient = appointmentsEntity.getPatientsEntity();
            appointmentsBean.setPatientName(patient.getName());
            appointmentsBean.setPatientAge(patient.getPatientAge());
            appointmentsBean.setPatientGender(patient.getPatientGender());
            appointmentsBean.setPatientEmail(patient.getEmail());
            appointmentsBean.setPatientContactNumber(patient.getPatientContactNumber());
        }

        // Manually set doctor details if necessary
        if (appointmentsEntity.getDoctorsEntity() != null) {
            appointmentsBean.setDoctorName(appointmentsEntity.getDoctorsEntity().getName());
            appointmentsBean.setDoctorSpecialization(appointmentsEntity.getDoctorsEntity().getDoctorSpecialization());
            appointmentsBean.setDoctorEmail(appointmentsEntity.getDoctorsEntity().getEmail());
        }

        return appointmentsBean;
    }

    
    @Override
    public List<AppointmentsBean> getAppointmentsByDoctorId(int doctorId) {
        // Fetch appointments where the doctor ID matches
        List<AppointmentsEntity> appointmentsEntities = appointmentsRepo.findByDoctorsEntity_Id(doctorId);

        // Return an empty list if no appointments are found
        if (appointmentsEntities.isEmpty()) {
            System.out.println("No appointments found for doctor ID: " + doctorId);
            return new ArrayList<>();
        }

        // Map the entity list to the bean list
        return appointmentsEntities.stream().map(this::mapToDto1).collect(Collectors.toList());
    }
    
    
    //update appointment detail date and status
    @Override
    public AppointmentsBean updateAppointment(int appointmentId, AppointmentsBean appointmentsBean) {
        // Fetch the existing appointment from the database
        AppointmentsEntity existingAppointment = appointmentsRepo.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Update the fields with the new values provided (status and date)
        existingAppointment.setAppointmentStatus(appointmentsBean.getAppointmentStatus());
        existingAppointment.setAppointmentDate(appointmentsBean.getAppointmentDate());

        // Retain the existing patient and doctor entities
        PatientsEntity patientEntity = existingAppointment.getPatientsEntity();
        DoctorsEntity doctorEntity = existingAppointment.getDoctorsEntity();

        // No need to fetch or update the patient and doctor if you're only updating the appointment status and date
        existingAppointment.setPatientsEntity(patientEntity);
        existingAppointment.setDoctorsEntity(doctorEntity);

        // Save the updated AppointmentsEntity to the database
        AppointmentsEntity updatedAppointmentEntity = appointmentsRepo.save(existingAppointment);

        // Map the updated entity back to DTO
        return mapToDtoForUpdate(updatedAppointmentEntity);
    }

    // Helper method to map AppointmentsEntity to AppointmentsBean for update
    private AppointmentsBean mapToDtoForUpdate(AppointmentsEntity appointmentsEntity) {
        AppointmentsBean appointmentsBean = modelMapper.map(appointmentsEntity, AppointmentsBean.class);

        // Manually set doctor and patient details
        if (appointmentsEntity.getPatientsEntity() != null) {
            PatientsEntity patient = appointmentsEntity.getPatientsEntity();
            appointmentsBean.setPatientName(patient.getName());
            appointmentsBean.setPatientAge(patient.getPatientAge());
            appointmentsBean.setPatientGender(patient.getPatientGender());
            appointmentsBean.setPatientEmail(patient.getEmail());
            appointmentsBean.setPatientContactNumber(patient.getPatientContactNumber());
        }
        if (appointmentsEntity.getDoctorsEntity() != null) {
            DoctorsEntity doctor = appointmentsEntity.getDoctorsEntity();
            appointmentsBean.setDoctorName(doctor.getName());
            appointmentsBean.setDoctorSpecialization(doctor.getDoctorSpecialization());
            appointmentsBean.setDoctorEmail(doctor.getEmail());
        }

        return appointmentsBean;
    }
    
    
    
	
}
