package com.HospitalManagement.service;

import java.util.List;
import java.util.Optional;
import com.HospitalManagement.bean.AppointmentsBean;
import com.HospitalManagement.entity.AppointmentsEntity;




public interface AppointmentService {
	
	public AppointmentsBean saveAppointment(AppointmentsBean appointmentsBean);
	
	public Optional<AppointmentsBean> getAppointmentById(int id);
	
	public List<AppointmentsBean> getAllAppointments();
	
	String deleteAppointment(int id);
	
	public AppointmentsBean updateAppointment(int id, AppointmentsBean appointmentsBean);
	
	List<AppointmentsBean> getAppointmentsByPatientId(int patientId);
	
	List<AppointmentsBean> getAppointmentsByDoctorId(int doctorId);
	
}
