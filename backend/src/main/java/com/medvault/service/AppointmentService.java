package com.medvault.service;

import com.medvault.entity.Appointment;
import com.medvault.entity.Doctor;
import com.medvault.entity.Patient;
import com.medvault.repository.AppointmentRepository;
import com.medvault.repository.DoctorRepository;
import com.medvault.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public Appointment bookAppointment(UUID doctorId, UUID patientId, LocalDateTime dateTime, String notes) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
        Patient patient = patientRepository.findById(patientId).orElseThrow();

        Appointment appointment = Appointment.builder()
                .doctor(doctor)
                .patient(patient)
                .appointmentDate(dateTime)
                .notes(notes)
                .status("PENDING")
                .build();

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getDoctorAppointments(UUID doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public List<Appointment> getPatientAppointments(UUID patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public Appointment updateStatus(UUID appointmentId, String status, String notes) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow();
        appointment.setStatus(status);
        if (notes != null) {
            appointment.setNotes(notes);
        }
        return appointmentRepository.save(appointment);
    }
}
