package com.docauth.service;

import com.docauth.dto.DoctorDto;
import com.docauth.entity.Doctor;
import com.docauth.repository.DoctorRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<DoctorDto> findAll() {
        return doctorRepository.findAll().stream().map(this::toDto).toList();
    }

    public DoctorDto findById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        return toDto(doctor);
    }

    public DoctorDto create(DoctorDto dto) {
        Doctor doctor = toEntity(dto);
        return toDto(doctorRepository.save(doctor));
    }

    public DoctorDto update(Long id, DoctorDto dto) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        doctor.setDoctorName(dto.getDoctorName());
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setEmail(dto.getEmail());
        return toDto(doctorRepository.save(doctor));
    }

    public void delete(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new IllegalArgumentException("Doctor not found");
        }
        doctorRepository.deleteById(id);
    }

    private DoctorDto toDto(Doctor doctor) {
        DoctorDto dto = new DoctorDto();
        dto.setId(doctor.getId());
        dto.setDoctorName(doctor.getDoctorName());
        dto.setSpecialization(doctor.getSpecialization());
        dto.setEmail(doctor.getEmail());
        return dto;
    }

    private Doctor toEntity(DoctorDto dto) {
        Doctor doctor = new Doctor();
        doctor.setDoctorName(dto.getDoctorName());
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setEmail(dto.getEmail());
        return doctor;
    }
}
