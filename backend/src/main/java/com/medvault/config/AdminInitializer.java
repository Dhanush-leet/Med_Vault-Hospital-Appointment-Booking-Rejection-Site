package com.medvault.config;

import com.medvault.entity.Role;
import com.medvault.entity.User;
import com.medvault.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final com.medvault.repository.DoctorRepository doctorRepository;

    @Override
    @jakarta.transaction.Transactional
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@medvault.com")) {
            User admin = User.builder()
                    .name("System Admin")
                    .email("admin@medvault.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("Admin user created: admin@medvault.com / Admin@123");
        }

        if (doctorRepository.count() == 0) {
            String[][] doctorData = {
                    { "Dr. Sarah Wilson", "sarah@medvault.com", "Cardiologist", "12" },
                    { "Dr. James Chen", "james@medvault.com", "Neurologist", "8" },
                    { "Dr. Elena Rossi", "elena@medvault.com", "Pediatrician", "15" }
            };

            for (String[] data : doctorData) {
                User doctorUser = User.builder()
                        .name(data[0])
                        .email(data[1])
                        .password(passwordEncoder.encode("Doctor@123"))
                        .role(Role.DOCTOR)
                        .build();
                userRepository.save(doctorUser);

                com.medvault.entity.Doctor doctor = com.medvault.entity.Doctor.builder()
                        .user(doctorUser)
                        .specialization(data[2])
                        .experience(Integer.parseInt(data[3]))
                        .availability(true)
                        .build();
                doctorRepository.save(doctor);
            }
            System.out.println("Sample doctors initialized.");
        }
    }
}
