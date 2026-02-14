# 🏥 MedVault – Enterprise 3D Electronic Health Record Platform

> A next-generation, production-ready Electronic Health Record (EHR) system with interactive 3D dashboards, real-time analytics, and enterprise-grade security.

---

## 🌐 Overview

MedVault is a modern full-stack healthcare management platform built with **Spring Boot + React**.

It combines:

- 🔐 Secure JWT authentication  
- 🧬 Interactive 3D medical models  
- 📊 Real-time analytics dashboards  
- 📁 Secure medical file uploads  
- 🏥 Role-based portals (Admin, Doctor, Patient)  
- 🚀 Production-level architecture  

Designed to simulate a real SaaS healthcare startup product.

---

# 🚀 Tech Stack

## 🔹 Backend
- Spring Boot 3.x  
- Java 21  
- PostgreSQL  
- Spring Security  
- JWT Authentication  
- Spring Data JPA  
- Lombok  
- Maven  

## 🔹 Frontend
- React (Vite)  
- Tailwind CSS  
- Framer Motion  
- Three.js (@react-three/fiber + drei)  
- Recharts  
- Axios  
- React Router  

---

# 🌟 Core Features

---

## 🎬 Award-Winning 3D Landing Page

- Animated gradient background  
- SVG heartbeat animation  
- Glassmorphism navigation  
- Floating blurred visual effects  
- Premium startup-level UI  
- 3D interactive object rendered with Three.js  

---

## 🧑‍⚕️ Patient Dashboard – Interactive Health Hub

- 🫀 Real 3D Heart Model (.glb)  
- Click-to-scale interaction  
- Hover glow effects  
- Health score visualization  
- Medical record upload from local files  
- Appointment history timeline  
- Animated health metrics  
- Secure JWT-protected access  

---

## 👩‍⚕️ Doctor Dashboard – Clinical Analytics Center

- 🧠 Real 3D Brain Model (.glb)  
- Appointment radar analytics  
- Patient quick preview modal  
- Consultation notes management  
- Availability toggle system  
- Real-time patient statistics  
- Interactive chart visualizations  

---

## 🏥 Admin Dashboard – Enterprise Control Room

- 🧬 3D DNA Analytics Model  
- Live system stats (Users, Doctors, Patients, Appointments)  
- Animated line & bar charts  
- User management panel  
- System performance insights  
- Role-based endpoint protection  

---

## 📊 Real-Time Analytics

- Live data fetched from backend APIs  
- Responsive animated charts  
- Dashboard metrics:
  - Total Users  
  - Appointments  
  - Doctors  
  - Patients  

---

## 📁 Secure Medical Record Upload

- Local file selection  
- Multipart upload handling  
- Files stored on backend server  
- Configurable upload directory  
- Size limits configured  
- Secure JWT-based upload endpoint  

---

## 🔐 Security & Authentication

- JWT-based stateless authentication  
- BCrypt password hashing  
- Role-based access control  
- Protected routes:
  - `/api/admin/**`
  - `/api/doctor/**`
  - `/api/patient/**`
- Admin auto-created on startup  

### 🔑 Default Admin Credentials

```

Email: [admin@medvault.com](mailto:admin@medvault.com)
Password: Admin@123

````

---

# 🗄 Database (PostgreSQL)

- UUID-based primary keys  
- Users table (ADMIN, DOCTOR, PATIENT)  
- Doctors table (extends User)  
- Patients table (extends User)  
- Appointments table  
- Medical Records table  
- Indexed for performance  
- Hibernate auto-DDL support  

---

# ⚙️ Setup Instructions

---

## 1️⃣ Database Setup

- Install PostgreSQL  
- Create database:

```sql
CREATE DATABASE medvault_db;
````

* Update credentials in:

```
backend/src/main/resources/application.properties
```

---

## 2️⃣ Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📁 Project Structure

```
MedVault/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── dto/
│   ├── security/
│   └── config/
│
├── frontend/
│   ├── components/
│   ├── dashboards/
│   ├── pages/
│   ├── services/
│   ├── models/ (GLB files)
│   └── context/
│
└── database.sql
```

---

# 🧠 Advanced Capabilities

* Lazy-loaded 3D models
* Suspense-based rendering
* Performance optimized Canvas rendering
* Compressed GLB assets
* Reusable interactive 3D component
* Clean service-layer architecture
* DTO-based backend response handling
* Global exception handling

---

# 🏆 Why This Project Stands Out

✔ Real 3D Medical Model Integration
✔ Full-stack JWT-secured architecture
✔ Production-level modular design
✔ Real-time dashboard analytics
✔ File upload handling
✔ Enterprise role-based access
✔ Optimized performance strategy

This project demonstrates:

* Advanced frontend engineering
* Secure backend architecture
* 3D integration capability
* Product-level thinking
* SaaS healthcare design principles

---

# 🚀 Future Enhancements

* AI-powered health prediction engine
* WebSocket real-time notifications
* Cloud file storage (AWS S3)
* Docker containerization
* CI/CD pipeline
* Deployment on Render + Vercel

---

# 👨‍💻 Author

**Dhanush Shankar**
Full Stack Developer | Spring Boot | React | 3D UI Integration

```
