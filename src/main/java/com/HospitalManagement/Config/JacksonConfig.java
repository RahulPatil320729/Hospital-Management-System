//package com.HospitalManagement.Config;

//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import com.fasterxml.jackson.annotation.JsonInclude;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.PropertyNamingStrategy;
//import com.fasterxml.jackson.databind.SerializationFeature;
//@Configuration
//public class JacksonConfig {
//	  @SuppressWarnings("deprecation")
//	@Bean
//	    public ObjectMapper objectMapper() {
//	        ObjectMapper mapper = new ObjectMapper();
//	        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
//	        
//	       mapper.setDefaultPropertyInclusion(JsonInclude.Include.NON_NULL); 
//	        // Additional configuration if needed
//	        return mapper;
//	    }
//}

