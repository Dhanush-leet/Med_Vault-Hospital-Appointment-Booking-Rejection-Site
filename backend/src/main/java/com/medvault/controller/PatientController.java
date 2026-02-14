package com.medvault.controller;

import com.medvault.entity.Appointment;
import com.medvault.entity.MedicalRecord;
import com.medvault.service.AppointmentService;
import com.medvault.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.medvault.dto.AppointmentRequest;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PATIENT')")
public class PatientController {

    private final AppointmentService appointmentService;
    private final MedicalRecordService medicalRecordService;
    private final com.medvault.repository.DoctorRepository doctorRepository;

    @GetMapping("/doctors")
    public ResponseEntity<List<com.medvault.entity.Doctor>> getDoctors() {
        return ResponseEntity.ok(doctorRepository.findAllWithUser());
    }

    @PostMapping("/{patientId}/book")
    public ResponseEntity<?> book(
            @PathVariable UUID patientId,
            @RequestBody AppointmentRequest request) {
        try {
            System.out.println("Booking appointment: patient=" + patientId + ", doctor=" + request.getDoctorId()
                    + ", date=" + request.getDate());
            LocalDateTime dt;
            try {
                dt = LocalDateTime.parse(request.getDate());
            } catch (DateTimeParseException e) {
                dt = LocalDateTime.parse(request.getDate(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            }

            Appointment saved = appointmentService.bookAppointment(request.getDoctorId(), patientId, dt,
                    request.getNotes());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "appointmentId", saved.getId(),
                    "message", "Appointment scheduled successfully"));
        } catch (Exception e) {
            System.err.println("Error booking appointment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/{patientId}/appointments")
    public ResponseEntity<List<Appointment>> getAppointments(@PathVariable UUID patientId) {
        return ResponseEntity.ok(appointmentService.getPatientAppointments(patientId));
    }

    @PostMapping("/{patientId}/records")
    public ResponseEntity<MedicalRecord> uploadRecord(
            @PathVariable UUID patientId,
            @RequestParam String fileUrl,
            @RequestParam String description) {
        return ResponseEntity.ok(medicalRecordService.uploadRecord(patientId, fileUrl, description));
    }

    @GetMapping("/{patientId}/records")
    public ResponseEntity<List<MedicalRecord>> getRecords(@PathVariable UUID patientId) {
        return ResponseEntity.ok(medicalRecordService.getPatientRecords(patientId));
    }
}
