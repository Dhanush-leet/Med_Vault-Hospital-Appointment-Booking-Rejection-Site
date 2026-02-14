import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (data) => API.post('/auth/login', data),
    register: (data) => API.post('/auth/register', data),
};

export const adminService = {
    getStats: () => API.get('/admin/stats'),
    getUsers: () => API.get('/admin/users'),
    deleteUser: (id) => API.delete(`/admin/users/${id}`),
};

export const doctorService = {
    getAppointments: (id) => API.get(`/doctor/${id}/appointments`),
    updateStatus: (id, status, notes) => API.put(`/doctor/appointments/${id}/status`, null, { params: { status, notes } }),
};

export const patientService = {
    getDoctors: () => API.get('/patient/doctors'),
    bookAppointment: (id, data) => API.post(`/patient/${id}/book`, data),
    getAppointments: (id) => API.get(`/patient/${id}/appointments`),
    uploadRecord: (id, data) => API.post(`/patient/${id}/records`, null, { params: data }),
    getRecords: (id) => API.get(`/patient/${id}/records`),
};

export default API;
