-- -----------------------------------------------------
-- DATABASE CREATION
-- -----------------------------------------------------

-- CREATE DATABASE medvault_db;

-- -----------------------------------------------------
-- EXTENSIONS
-- -----------------------------------------------------

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------
-- USERS TABLE
-- -----------------------------------------------------

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'DOCTOR', 'PATIENT')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- DOCTORS TABLE
-- -----------------------------------------------------

CREATE TABLE doctors (
    id UUID PRIMARY KEY,
    specialization VARCHAR(150),
    experience INTEGER,
    availability BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- PATIENTS TABLE
-- -----------------------------------------------------

CREATE TABLE patients (
    id UUID PRIMARY KEY,
    dob DATE,
    blood_group VARCHAR(10),
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- APPOINTMENTS TABLE
-- -----------------------------------------------------

CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL,
    patient_id UUID NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- MEDICAL RECORDS TABLE
-- -----------------------------------------------------

CREATE TABLE medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL,
    file_url TEXT NOT NULL,
    description TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- -----------------------------------------------------

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_medical_records_patient ON medical_records(patient_id);
