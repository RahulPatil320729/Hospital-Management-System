package com.HospitalManagement.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HospitalManagement.Security.JwtAuthRequest;
import com.HospitalManagement.Security.JwtAuthResponse;
import com.HospitalManagement.Security.JwtTokenHelper;
import com.HospitalManagement.entity.DoctorsEntity;
import com.HospitalManagement.entity.PatientsEntity;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody JwtAuthRequest request) {

        // Authenticate the user
        this.doAuthenticate(request.getEmail(), request.getPassword());

        // Load user details
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        Integer id = null;
        String name = null;
        List<String> roles = null;

        // Check if the user is a patient or doctor
        if (userDetails instanceof PatientsEntity) {
            PatientsEntity patient = (PatientsEntity) userDetails;
            id = patient.getId();
            name = patient.getName();
            roles = patient.getPatientRoleEntities().stream()
                    .map(role -> role.getRole()) // Assuming `getRole()` returns the role name
                    .collect(Collectors.toList());

        } else if (userDetails instanceof DoctorsEntity) {
            DoctorsEntity doctor = (DoctorsEntity) userDetails;
            id = doctor.getId();
            name = doctor.getName();
            roles = doctor.getDoctorRoleEntities().stream()
                    .map(role -> role.getRole()) // Assuming `getRole()` returns the role name
                    .collect(Collectors.toList());
        }

        // Generate JWT token
        String token = jwtTokenHelper.generateToken(userDetails);

        // Build response
        JwtAuthResponse response = JwtAuthResponse.builder()
                .jwttoken(token)
                .id(id.toString())
                .name(name)
                .email(userDetails.getUsername())
                .roles(roles)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            authenticationManager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid Username or Password !!");
        }
        
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }



}
