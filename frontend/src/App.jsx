import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorAppointments from './pages/DoctorAppointments';
import DoctorVitals from './pages/DoctorVitals';
import PatientDashboard from './pages/PatientDashboard';
import BookAppointment from './pages/BookAppointment';
import MedicalRecords from './pages/MedicalRecords';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Admin Routes */}
                    <Route path="/admin/*" element={
                        <DashboardLayout>
                            <Routes>
                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="users" element={<AdminDashboard />} /> {/* Simplified for demo */}
                                <Route path="*" element={<Navigate to="dashboard" />} />
                            </Routes>
                        </DashboardLayout>
                    } />

                    {/* Doctor Routes */}
                    <Route path="/doctor/*" element={
                        <DashboardLayout>
                            <Routes>
                                <Route path="dashboard" element={<DoctorDashboard />} />
                                <Route path="appointments" element={<DoctorAppointments />} />
                                <Route path="vitals" element={<DoctorVitals />} />
                                <Route path="*" element={<Navigate to="dashboard" />} />
                            </Routes>
                        </DashboardLayout>
                    } />

                    <Route path="/patient/*" element={
                        <DashboardLayout>
                            <Routes>
                                <Route path="dashboard" element={<PatientDashboard />} />
                                <Route path="book" element={<BookAppointment />} />
                                <Route path="records" element={<MedicalRecords />} />
                                <Route path="*" element={<Navigate to="dashboard" />} />
                            </Routes>
                        </DashboardLayout>
                    } />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
