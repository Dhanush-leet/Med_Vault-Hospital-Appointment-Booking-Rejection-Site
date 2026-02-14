package com.medvault.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private LocalDate dob;

    @Column(name = "blood_group")
    private String bloodGroup;

    public Patient() {
    }

    public Patient(UUID id, User user, LocalDate dob, String bloodGroup) {
        this.id = id;
        this.user = user;
        this.dob = dob;
        this.bloodGroup = bloodGroup;
    }

    public static PatientBuilder builder() {
        return new PatientBuilder();
    }

    public static class PatientBuilder {
        private UUID id;
        private User user;
        private LocalDate dob;
        private String bloodGroup;

        public PatientBuilder id(UUID id) {
            this.id = id;
            return this;
        }

        public PatientBuilder user(User user) {
            this.user = user;
            return this;
        }

        public PatientBuilder dob(LocalDate dob) {
            this.dob = dob;
            return this;
        }

        public PatientBuilder bloodGroup(String bloodGroup) {
            this.bloodGroup = bloodGroup;
            return this;
        }

        public Patient build() {
            return new Patient(id, user, dob, bloodGroup);
        }
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }
}
