package com.HospitalManagement.serviceImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.HospitalManagement.entity.DoctorsEntity;
import com.HospitalManagement.entity.PatientsEntity;
import com.HospitalManagement.repository.DoctorRepo;
import com.HospitalManagement.repository.PatientRepo;


@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	
	@Autowired
	private PatientRepo patientRepo;
	
	@Autowired
	private DoctorRepo doctorRepo;
	
	

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		PatientsEntity patientsEntity=patientRepo.findByEmail(email);
		if(patientsEntity!=null) {
			return patientsEntity;
		}
		DoctorsEntity doctorsEntity=doctorRepo.findByEmail(email);
		if(doctorsEntity!=null) {
			return doctorsEntity;
		}
		throw new UsernameNotFoundException("User not found with email: " + email);
	}



	public CustomUserDetailsService(PatientRepo patientRepo, DoctorRepo doctorRepo) {
		super();
		this.patientRepo = patientRepo;
		this.doctorRepo = doctorRepo;
	}

}
