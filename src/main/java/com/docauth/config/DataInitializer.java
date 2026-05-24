package com.docauth.config;

import com.docauth.entity.Doctor;
import com.docauth.entity.Patient;
import com.docauth.entity.Role;
import com.docauth.repository.DoctorRepository;
import com.docauth.repository.PatientRepository;
import com.docauth.repository.UserRepository;
import com.docauth.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AuthService authService;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public DataInitializer(
            UserRepository userRepository,
            AuthService authService,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository
    ) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            authService.createUser("admin", "admin123", Role.ADMIN);
            authService.createUser("doctor", "doctor123", Role.DOCTOR);
        }

        if (doctorRepository.count() == 0) {
            Doctor doctor = new Doctor();
            doctor.setDoctorName("Dr Rahul");
            doctor.setSpecialization("Cardiologist");
            doctor.setEmail("rahul@gmail.com");
            doctorRepository.save(doctor);
        }

        if (patientRepository.count() == 0) {
            Patient patient = new Patient();
            patient.setPatientName("Amit");
            patient.setAge(35);
            patient.setDisease("Fever");
            patientRepository.save(patient);
        }
    }
}
