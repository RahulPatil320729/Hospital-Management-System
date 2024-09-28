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

import com.HospitalManagement.bean.AppointmentsBean;
import com.HospitalManagement.entity.AppointmentsEntity;
import com.HospitalManagement.repository.AppointmentsRepo;
import com.HospitalManagement.service.AppointmentService;


@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/appointment")
public class AppointmentsController {

	@Autowired
    AppointmentService appointmentService;
	
    // Create a new appointment
    @PostMapping("/saveAppointment")
    public ResponseEntity<AppointmentsBean> saveAppointment(@RequestBody AppointmentsBean appointmentsBean) {
        try {
            AppointmentsBean savedAppointment = appointmentService.saveAppointment(appointmentsBean);
            return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Handle exceptions (e.g., patient or doctor not found)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Handle other exceptions
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
//  Retrieve an appointment by ID
    @GetMapping("/getAppointmentDetail/{id}")
    public ResponseEntity<AppointmentsBean> getAppointmentById(@PathVariable("id") int id) {
        Optional<AppointmentsBean> appointment = appointmentService.getAppointmentById(id);
        if (appointment.isPresent()) {
            return ResponseEntity.ok(appointment.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
 // Get all appointment details
    @GetMapping("/getAppointmentDetails")
    public ResponseEntity<List<AppointmentsBean>> getAllAppointments() {
        try {
            List<AppointmentsBean> appointments = appointmentService.getAllAppointments();
            if (appointments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable int id) {
        try {
            String result = appointmentService.deleteAppointment(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Return a 404 Not Found status if the appointment does not exist
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    
    @PutMapping("update/{id}")
    public ResponseEntity<AppointmentsBean> updateAppointment(@PathVariable int id, @RequestBody AppointmentsBean appointmentsBean) {
        try {
            // Call the service method to update the appointment
            AppointmentsBean updatedAppointment = appointmentService.updateAppointment(id, appointmentsBean);
            // Return the updated appointment with a 200 OK status
            return new ResponseEntity<>(updatedAppointment, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Handle exceptions and return a 404 Not Found status
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    
    
    // API to get all appointments by patient ID
    @GetMapping("patient/{patientId}")
    public List<AppointmentsBean> getAppointmentsByPatientId(@PathVariable int patientId) {
        return appointmentService.getAppointmentsByPatientId(patientId);
    }
	
    // Get appointments by doctorId
    @GetMapping("doctor/{doctorId}")
    public ResponseEntity<?> getAppointmentsByDoctorId(@PathVariable int doctorId) {
        List<AppointmentsBean> appointments = appointmentService.getAppointmentsByDoctorId(doctorId);

        if (appointments.isEmpty()) {
            // Log message when no appointments are found
            System.out.println("No appointment data found for doctor with ID: " + doctorId);
            return ResponseEntity.status(404).body("No appointment data found for the given doctor.");
        }

        return ResponseEntity.ok(appointments);
    }
	
}
