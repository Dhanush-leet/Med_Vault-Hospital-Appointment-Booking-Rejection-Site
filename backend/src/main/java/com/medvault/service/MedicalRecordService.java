package com.medvault.service;

import com.medvault.entity.MedicalRecord;
import com.medvault.entity.Patient;
import com.medvault.repository.MedicalRecordRepository;
import com.medvault.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;

    public MedicalRecord uploadRecord(UUID patientId, String fileUrl, String description) {
        Patient patient = patientRepository.findById(patientId).orElseThrow();
        MedicalRecord record = MedicalRecord.builder()
                .patient(patient)
                .fileUrl(fileUrl)
                .description(description)
                .build();
        return medicalRecordRepository.save(record);
    }

    public List<MedicalRecord> getPatientRecords(UUID patientId) {
        return medicalRecordRepository.findByPatientId(patientId);
    }
}
