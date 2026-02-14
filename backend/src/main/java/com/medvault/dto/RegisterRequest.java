package com.medvault.dto;

import com.medvault.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;

    // Doctor specific
    private String specialization;
    private Integer experience;

    // Patient specific
    private LocalDate dob;
    private String bloodGroup;

    public RegisterRequest() {
    }

    public RegisterRequest(String name, String email, String password, Role role, String specialization,
            Integer experience, LocalDate dob, String bloodGroup) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.specialization = specialization;
        this.experience = experience;
        this.dob = dob;
        this.bloodGroup = bloodGroup;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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

    public static RegisterRequestBuilder builder() {
        return new RegisterRequestBuilder();
    }

    public static class RegisterRequestBuilder {
        private String name;
        private String email;
        private String password;
        private Role role;
        private String specialization;
        private Integer experience;
        private LocalDate dob;
        private String bloodGroup;

        public RegisterRequestBuilder name(String name) {
            this.name = name;
            return this;
        }

        public RegisterRequestBuilder email(String email) {
            this.email = email;
            return this;
        }

        public RegisterRequestBuilder password(String password) {
            this.password = password;
            return this;
        }

        public RegisterRequestBuilder role(Role role) {
            this.role = role;
            return this;
        }

        public RegisterRequestBuilder specialization(String specialization) {
            this.specialization = specialization;
            return this;
        }

        public RegisterRequestBuilder experience(Integer experience) {
            this.experience = experience;
            return this;
        }

        public RegisterRequestBuilder dob(LocalDate dob) {
            this.dob = dob;
            return this;
        }

        public RegisterRequestBuilder bloodGroup(String bloodGroup) {
            this.bloodGroup = bloodGroup;
            return this;
        }

        public RegisterRequest build() {
            return new RegisterRequest(name, email, password, role, specialization, experience, dob, bloodGroup);
        }
    }
}
