package com.medvault.repository;

import com.medvault.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    @Query("SELECT a FROM Appointment a JOIN FETCH a.patient p JOIN FETCH p.user JOIN FETCH a.doctor d JOIN FETCH d.user WHERE d.id = :doctorId")
    List<Appointment> findByDoctorId(@Param("doctorId") UUID doctorId);

    @Query("SELECT a FROM Appointment a JOIN FETCH a.patient p JOIN FETCH p.user JOIN FETCH a.doctor d JOIN FETCH d.user WHERE p.id = :patientId")
    List<Appointment> findByPatientId(@Param("patientId") UUID patientId);
}
