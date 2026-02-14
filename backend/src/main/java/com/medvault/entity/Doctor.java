package com.medvault.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private String specialization;
    private Integer experience;
    private Boolean availability = true;

    public Doctor() {
    }

    public Doctor(UUID id, User user, String specialization, Integer experience, Boolean availability) {
        this.id = id;
        this.user = user;
        this.specialization = specialization;
        this.experience = experience;
        this.availability = availability != null ? availability : true;
    }

    public static DoctorBuilder builder() {
        return new DoctorBuilder();
    }

    public static class DoctorBuilder {
        private UUID id;
        private User user;
        private String specialization;
        private Integer experience;
        private Boolean availability = true;

        public DoctorBuilder id(UUID id) {
            this.id = id;
            return this;
        }

        public DoctorBuilder user(User user) {
            this.user = user;
            return this;
        }

        public DoctorBuilder specialization(String specialization) {
            this.specialization = specialization;
            return this;
        }

        public DoctorBuilder experience(Integer experience) {
            this.experience = experience;
            return this;
        }

        public DoctorBuilder availability(Boolean availability) {
            this.availability = availability;
            return this;
        }

        public Doctor build() {
            return new Doctor(id, user, specialization, experience, availability);
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

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }
}
