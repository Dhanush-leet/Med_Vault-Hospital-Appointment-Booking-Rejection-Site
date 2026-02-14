package com.medvault.service;

import com.medvault.dto.AuthRequest;
import com.medvault.dto.AuthResponse;
import com.medvault.dto.RegisterRequest;
import com.medvault.entity.Doctor;
import com.medvault.entity.Patient;
import com.medvault.entity.Role;
import com.medvault.entity.User;
import com.medvault.repository.DoctorRepository;
import com.medvault.repository.PatientRepository;
import com.medvault.repository.UserRepository;
import com.medvault.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

        private final UserRepository userRepository;
        private final DoctorRepository doctorRepository;
        private final PatientRepository patientRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthService(UserRepository userRepository,
                        DoctorRepository doctorRepository,
                        PatientRepository patientRepository,
                        PasswordEncoder passwordEncoder,
                        JwtService jwtService,
                        AuthenticationManager authenticationManager) {
                this.userRepository = userRepository;
                this.doctorRepository = doctorRepository;
                this.patientRepository = patientRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtService = jwtService;
                this.authenticationManager = authenticationManager;
        }

        @Transactional
        public AuthResponse register(RegisterRequest request) {
                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new RuntimeException("Email already exists");
                }

                User user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(request.getRole())
                                .build();

                User savedUser = userRepository.save(user);

                if (request.getRole() == Role.DOCTOR) {
                        Doctor doctor = Doctor.builder()
                                        .user(savedUser)
                                        .specialization(request.getSpecialization())
                                        .experience(request.getExperience())
                                        .build();
                        doctorRepository.save(doctor);
                } else if (request.getRole() == Role.PATIENT) {
                        Patient patient = Patient.builder()
                                        .user(savedUser)
                                        .dob(request.getDob())
                                        .bloodGroup(request.getBloodGroup())
                                        .build();
                        patientRepository.save(patient);
                }

                var jwtToken = jwtService.generateToken(savedUser);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .id(savedUser.getId())
                                .name(savedUser.getName())
                                .email(savedUser.getEmail())
                                .role(savedUser.getRole())
                                .build();
        }

        public AuthResponse authenticate(AuthRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .build();
        }
}
