package com.HospitalManagement.serviceImp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import java.util.List;
import java.util.stream.Collectors;
import org.hibernate.bytecode.internal.bytebuddy.PrivateAccessorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.HospitalManagement.bean.DoctorsBean;
import com.HospitalManagement.entity.DoctorRoleEntity;
import com.HospitalManagement.entity.DoctorsEntity;
import com.HospitalManagement.repository.DoctorRepo;
import com.HospitalManagement.repository.DoctorRoleRepo;
import com.HospitalManagement.service.DoctorService;
import com.fasterxml.jackson.core.JsonProcessingException;

@Service
public class DoctorServiceImp implements DoctorService{
	
	@Autowired
	DoctorRepo repo;
	
	@Autowired
	DoctorRoleRepo doctorRoleRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public String SaveDoctor(DoctorsBean request) {
		DoctorsEntity doctor =new DoctorsEntity();
		doctor.setName(request.getName());
		doctor.setDoctorSpecialization(request.getDoctorSpecialization());
		doctor.setDoctorContactNumber(request.getDoctorContactNumber());
		doctor.setEmail(request.getEmail());
		doctor.setPassword(passwordEncoder.encode(request.getPassword()));
		doctor.setDescription(request.getDescription());
		doctor.setImg(request.getImg());
		
		DoctorsEntity SaveDoctor=repo.save(doctor);
		
		DoctorRoleEntity doctorRole =new DoctorRoleEntity();
		doctorRole.setRole("Doctor");
		doctorRole.setDoctorsEntityForDoctorRole(SaveDoctor);
		
		doctorRoleRepo.save(doctorRole);
		
		return "Doctor and role saved successfully";
	}

	@Override
	public List<DoctorsEntity> getAllDoctorDetails(){
		return repo.findAll();
	}
	
    // Pagination implementation
    public Page<DoctorsEntity> getAllDoctorDetailsPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAll(pageable);
    }
	
	@Override
	public DoctorsEntity getAllDoctorDetails(int id) throws JsonProcessingException{
		return repo.findById(id).orElseThrow(()-> new ArithmeticException());
	}
	
	@Override
	public DoctorsEntity updateRecord(int id,DoctorsBean request) {
	    DoctorsEntity doctor=repo.findById(id).orElseThrow(()->new ArithmeticException());
	    doctor.setName(request.getName());
	    doctor.setDoctorSpecialization(request.getDoctorSpecialization());
		doctor.setDoctorContactNumber(request.getDoctorContactNumber());
		doctor.setEmail(request.getEmail());
		doctor.setPassword(request.getPassword());
		doctor.setDescription(request.getDescription());
		doctor.setImg(request.getImg());
	    return repo.save(doctor);
	}

	@Override
	public List<DoctorsEntity> getDoctorsBySpecialization(String specialization) {
		// TODO Auto-generated method stub
		return null;
	}
	


    

    
}
