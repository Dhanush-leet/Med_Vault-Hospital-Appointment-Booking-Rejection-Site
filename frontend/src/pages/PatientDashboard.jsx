import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Activity, Clock, FileCheck, User, ChevronRight } from 'lucide-react';
import { patientService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PatientUpload from '../components/PatientUpload';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import InteractiveModel from '../components/InteractiveModel';
import ErrorBoundary from '../components/ErrorBoundary';

function HeartModel() {
    return (
        <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
            <InteractiveModel modelPath="/models/heart.glb" scale={0.5} />
        </Float>
    );
}

function Loader() {
    return <Html center><div className="text-white text-sm font-mono animate-pulse">LOADING 3D ASSETS...</div></Html>;
}

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mock data in case backend is empty for demo visual
                const [appRes, recRes] = await Promise.all([
                    patientService.getAppointments(user.id),
                    patientService.getRecords(user.id)
                ]);
                setAppointments(appRes.data);
                setRecords(recRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user.id]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
        </div>
    );

    const upcoming = appointments.filter(a => a.status === 'PENDING')[0];

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                        Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">{user.name}</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg">Your health hub is active and visualized in real-time.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Status</p>
                    <div className="flex items-center gap-2 justify-end mt-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-emerald-600">Healthy</span>
                    </div>
                </div>
            </header>

            {/* Quick Vitals Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: 'Heart Rate', value: '72 bpm', color: 'bg-rose-50 text-rose-600', icon: Activity },
                    { label: 'BP', value: '120/80', color: 'bg-blue-50 text-blue-600', icon: Activity },
                    { label: 'Oxygen', value: '98%', color: 'bg-emerald-50 text-emerald-600', icon: FileCheck },
                    { label: 'Glucose', value: '90 mg/dL', color: 'bg-amber-50 text-amber-600', icon: Activity }
                ].map((vital, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className={`p-6 rounded-[2rem] ${vital.color} border border-white shadow-sm flex flex-col items-center text-center gap-2`}
                    >
                        <vital.icon className="w-5 h-5 opacity-60" />
                        <p className="text-xs font-bold uppercase tracking-wider opacity-70">{vital.label}</p>
                        <p className="text-2xl font-black">{vital.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* 3D & Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* L: 3D Heart Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1 h-[400px] bg-red-50 rounded-[2.5rem] relative overflow-hidden group shadow-xl border border-red-100"
                >
                    <div className="absolute top-6 left-6 z-10">
                        <h2 className="text-xl font-bold text-rose-900">Cardio Monitor</h2>
                        <p className="text-xs text-rose-500">Live 3D Visualization</p>
                    </div>
                    <ErrorBoundary fallback={<div className="h-full flex items-center justify-center text-rose-500 font-bold bg-rose-50/50">Model unavailable</div>}>
                        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
                            <ambientLight intensity={0.8} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <directionalLight position={[-2, 5, 2]} intensity={1} color="#f43f5e" />
                            <Suspense fallback={<Loader />}>
                                <HeartModel />
                            </Suspense>
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                        </Canvas>
                    </ErrorBoundary>
                </motion.div>

                {/* M: Upcoming Appointment */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-between"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                    <div className="flex justify-between items-start z-10">
                        <div>
                            <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Next Appointment</p>
                            {upcoming ? (
                                <>
                                    <h2 className="text-3xl font-bold mb-1">Dr. {upcoming.doctor?.user?.name || 'Specialist'}</h2>
                                    <p className="text-slate-400 font-medium">{upcoming.doctor?.specialization || 'Consultation'}</p>
                                </>
                            ) : (
                                <h2 className="text-3xl font-bold text-slate-300">No Upcoming Visits</h2>
                            )}
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {upcoming && (
                        <div className="flex gap-8 mt-8 border-t border-white/10 pt-6 z-10">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Date</p>
                                <p className="text-xl font-bold">{new Date(upcoming.appointmentDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Time</p>
                                <p className="text-xl font-bold flex items-center gap-2">
                                    {new Date(upcoming.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Comprehensive Appointments List */}
            <div className="pt-12 border-t border-slate-100">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-indigo-500" />
                        Scheduling Feed
                    </h3>
                    <button onClick={() => window.location.href = '/patient/book'} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Book New Session</button>
                </div>

                <div className="space-y-4">
                    {appointments.filter(a => a.status === 'PENDING').length > 0 ? (
                        appointments.filter(a => a.status === 'PENDING').map((app, i) => (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row items-center justify-between gap-6 group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-bold text-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                        {app.doctor?.user?.name?.charAt(0) || 'D'}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Dr. {app.doctor?.user?.name || 'Unknown'}</h4>
                                        <p className="text-xs text-slate-500 font-medium">{app.doctor?.specialization || 'Consultation'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 px-8 py-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 transition-all">
                                    <div className="text-center">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Date</p>
                                        <p className="text-sm font-bold text-slate-700">{new Date(app.appointmentDate).toDateString()}</p>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200" />
                                    <div className="text-center">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Time</p>
                                        <p className="text-sm font-bold text-slate-700">{new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-4 py-2 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-xl border border-amber-100">Pending Approval</span>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="py-12 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-medium">No sessions scheduled yet.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Upload Section */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-emerald-500" />
                        Smart Upload Center
                    </h3>
                    <PatientUpload />
                </motion.div>

                {/* Records List */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-500" />
                        Medical Timeline
                    </h3>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {records.map((rec, i) => (
                            <motion.div
                                key={rec.id}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                                className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-100 flex items-center justify-between group transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <FileCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{rec.description || rec.fileName || "Medical Record"}</p>
                                        <p className="text-xs text-slate-400">{new Date(rec.uploadedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">PDF</span>
                            </motion.div>
                        ))}
                        {records.length === 0 && (
                            <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
                                No records found. Upload one to get started.
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* My Doctors Section */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-12 border-t border-slate-100">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <User className="w-6 h-6 text-indigo-500" />
                        My Specialists
                    </h3>
                    <button onClick={() => window.location.href = '/patient/book'} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Find More Doctors</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from(new Set(appointments.filter(a => a.doctor).map(a => a.doctor.id))).map(docId => {
                        const doctor = appointments.find(a => a.doctor?.id === docId)?.doctor;
                        if (!doctor) return null;
                        return (
                            <motion.div
                                key={docId}
                                whileHover={{ y: -5 }}
                                className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                                    {doctor.user?.name?.charAt(0) || '?'}
                                </div>
                                <h4 className="font-bold text-slate-800">{doctor.user?.name || 'Unknown Doctor'}</h4>
                                <p className="text-xs text-slate-500 font-medium">{doctor.specialization}</p>
                            </motion.div>
                        );
                    })}
                    {appointments.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-medium">Book your first consultation to see your care team here.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default PatientDashboard;
