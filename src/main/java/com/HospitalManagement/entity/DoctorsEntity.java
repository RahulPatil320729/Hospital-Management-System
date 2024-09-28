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
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity	
@Table(name="doctor_table")
public class DoctorsEntity implements UserDetails{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="doctor_id")
	private int id;
	
	@Column(name="doctor_name")
	private String name;
	
	@Column(name="doctor_specialization")
	private String doctorSpecialization;
	
	@Column(name="doctor_contact")
	private long doctorContactNumber;
	
	@Column(name="doctor_email")
	private String email;
	
	@Column(name="doctor_password")
	private String password;
	
	@Column(name="doctor_description")
	private String description;
	
	@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String img;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "doctorsEntity")
	private List<AppointmentsEntity> appointmentsEntities=new ArrayList<>();
	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "doctorPrescription")
	private List<PrescriptionsEntity> prescriptionsEntities =new ArrayList<>();
	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "doctorInvoice")
	private List<InvoiceEntity> invoiceEntities =new ArrayList<>();
	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "doctorsEntityForDoctorRole")
	private List<DoctorRoleEntity> doctorRoleEntities =new ArrayList<>();


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return doctorRoleEntities.stream().map(role->new SimpleGrantedAuthority("ROLE_" + role.getRole())).collect(Collectors.toSet());
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
