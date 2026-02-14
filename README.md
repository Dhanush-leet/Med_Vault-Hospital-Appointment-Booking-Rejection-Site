# 🏥 MedVault – Secure Electronic Health Record System

MedVault is a production-ready EHR system built with Spring Boot and React.

## 🚀 Teck Stack
- **Backend:** Spring Boot 3.x, Java 21, PostgreSQL, Spring Security, JWT
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Three.js, Chart.js

## 🛠️ Setup Instructions

### 1. Database Setup
- Install PostgreSQL.
- Create a database named `medvault_db`.
- Run the `database.sql` script to set up tables (Optional, Hibernate will auto-create on first run).
- Update `backend/src/main/resources/application.properties` with your PostgreSQL credentials.

### 2. Backend Setup
```bash
cd backend
mvn spring-boot:run
```
- Admin credentials auto-created: `admin@medvault.com` / `Admin@123`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌟 Key Features
- **3D Heartbeat Landing Page**: Immersize medical experience using Three.js.
- **Role-Based Portals**: Custom dashboards for Admins, Doctors, and Patients.
- **Secure Authentication**: JWT-based stateless security.
- **Medical Records**: Upload and manage health records securely.
- **Appointment Booking**: Real-time scheduling and status management.

## 📁 Project Structure
- `/backend`: Spring Boot application.
- `/frontend`: React application.
- `database.sql`: Original PostgreSQL schema.
