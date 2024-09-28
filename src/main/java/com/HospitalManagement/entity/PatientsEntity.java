package com.HospitalManagement.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity	
@Table(name="patient_table")
public class PatientsEntity implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "patient_seq")
	@Column(name="patient_id")
	private int id;
	
	@Column(name="patient_name")
	private String name;
	
	@Column(name="patient_age")
	private int patientAge;
	
	@Column(name="patient_gender")
	private String patientGender;
	
	@Column(name="patient_address")
	private String patientAddress;
	
	@Column(name="patient_contact")
	private long patientContactNumber;

	@Column(name="patient_email")
	private String email;
	
	@Column(name="patient_password")
	private String password;
	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "patientsEntity")
	private List<AppointmentsEntity> appointmentsEntities = new ArrayList<>();
	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "patientsEntityForLabTest")
	private List<LabTestRecordEntity> labTestRecordEntities = new ArrayList<>();
	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "patientsEntityForMedicalHistory")
	private List<MedicalHistoryEntity> medicalHistoryEntities =new ArrayList<>();
	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "patientsPrescription")
	private List<PrescriptionsEntity> prescriptionsEntities =new ArrayList<>();
	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "patientInvoice")
	private List<InvoiceEntity> invoiceEntities =new ArrayList<>();
		
	
	@JsonManagedReference
	@OneToMany(mappedBy = "patientsEntityForPatientRole")
	private List<PatientRoleEntity> patientRoleEntities =new ArrayList<>();


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return patientRoleEntities.stream().map(role->new SimpleGrantedAuthority("ROLE_" + role.getRole())).collect(Collectors.toSet());
	}


	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}
	
	
	 @Override
	    public boolean isAccountNonExpired() {
	        return true; // Customize according to your logic
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true; // Customize according to your logic
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true; // Customize according to your logic
	    }

	    @Override
	    public boolean isEnabled() {
	        return true; // Customize according to your logic
	    }

	

}

