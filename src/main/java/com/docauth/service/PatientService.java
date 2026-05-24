package com.docauth.service;

import com.docauth.dto.PatientDto;
import com.docauth.entity.Patient;
import com.docauth.repository.PatientRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<PatientDto> findAll() {
        return patientRepository.findAll().stream().map(this::toDto).toList();
    }

    public PatientDto findById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        return toDto(patient);
    }

    public PatientDto create(PatientDto dto) {
        Patient patient = toEntity(dto);
        return toDto(patientRepository.save(patient));
    }

    public PatientDto update(Long id, PatientDto dto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        patient.setPatientName(dto.getPatientName());
        patient.setAge(dto.getAge());
        patient.setDisease(dto.getDisease());
        return toDto(patientRepository.save(patient));
    }

    public void delete(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new IllegalArgumentException("Patient not found");
        }
        patientRepository.deleteById(id);
    }

    private PatientDto toDto(Patient patient) {
        PatientDto dto = new PatientDto();
        dto.setId(patient.getId());
        dto.setPatientName(patient.getPatientName());
        dto.setAge(patient.getAge());
        dto.setDisease(patient.getDisease());
        return dto;
    }

    private Patient toEntity(PatientDto dto) {
        Patient patient = new Patient();
        patient.setPatientName(dto.getPatientName());
        patient.setAge(dto.getAge());
        patient.setDisease(dto.getDisease());
        return patient;
    }
}
