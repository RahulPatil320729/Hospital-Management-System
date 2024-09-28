package com.HospitalManagement.Config;

import org.modelmapper.ModelMapper;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.HospitalManagement.bean.AppointmentsBean;
import com.HospitalManagement.entity.AppointmentsEntity;

@Configuration
public class ModelMapperConfig {
	
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(AppointmentsEntity.class, AppointmentsBean.class)
            .addMappings(mapper -> {
                mapper.map(src -> src.getPatientsEntity().getId(), AppointmentsBean::setPatientId);
                mapper.map(src -> src.getDoctorsEntity().getId(), AppointmentsBean::setDoctorId);         
            });
        return modelMapper;
    }
    
    
      
}
