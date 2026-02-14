import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, CheckCircle, XCircle, FileText, ChevronRight, Stethoscope } from 'lucide-react';
import { doctorService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import InteractiveModel from '../components/InteractiveModel';
import ErrorBoundary from '../components/ErrorBoundary';

function BrainModel() {
    return (
        <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
            <InteractiveModel modelPath="/models/brain.glb" scale={0.4} />
        </Float>
    );
}

function Loader() {
    return <Html center><div className="text-white text-sm font-mono animate-pulse">LOADING 3D ASSETS...</div></Html>;
}

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await doctorService.getAppointments(user.id);
                setAppointments(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [user.id]);

    const handleUpdateStatus = async (id, status) => {
        try {
            await doctorService.updateStatus(id, status, "Updated by doctor");
            setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
        } catch (err) {
            console.error(err)
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-950">
            <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
        </div>
    );

    const pending = appointments.filter(a => a.status === 'PENDING');
    const completed = appointments.filter(a => a.status === 'COMPLETED' || a.status === 'CANCELLED');

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 bg-slate-950 min-h-screen text-slate-200">
            <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                        Dr. <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">{user.name}</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-lg flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-blue-500" />
                        {pending.length} pending consultations today
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                        Available
                    </span>
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* L: 3D Brain Viz */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-1 h-[500px] bg-slate-900/50 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute top-6 left-6 z-10">
                        <h2 className="text-xl font-bold text-white">Neural Analysis</h2>
                        <p className="text-xs text-slate-400">Interactive 3D Model</p>
                    </div>
                    <ErrorBoundary fallback={<div className="h-full flex items-center justify-center text-blue-500 font-bold bg-slate-900/50">Analysis service offline</div>}>
                        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
                            <ambientLight intensity={0.6} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <directionalLight position={[-2, 5, 2]} intensity={1} color="#3b82f6" />
                            <Suspense fallback={<Loader />}>
                                <BrainModel />
                            </Suspense>
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                        </Canvas>
                    </ErrorBoundary>
                </motion.div>

                {/* R: Appointments Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            Live Queue
                        </h3>
                        <span className="text-xs font-mono text-slate-500">REAL-TIME UPDATES ENABLED</span>
                    </div>

                    {pending.length === 0 ? (
                        <div className="p-12 border border-dashed border-white/10 rounded-[2rem] bg-slate-900/20 text-center flex flex-col items-center justify-center h-full">
                            <CheckCircle className="w-16 h-16 text-emerald-500/20 mb-4" />
                            <h4 className="text-xl font-bold text-white mb-2">Queue Cleared</h4>
                            <p className="text-slate-500 max-w-md mx-auto">You have requested no further appointments for the current session.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pending.map((app, i) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    className="p-6 bg-slate-900/80 border border-white/5 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-slate-800 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">
                                            {app.patient.user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{app.patient.user.name}</h4>
                                            <div className="flex items-center gap-3 text-sm text-slate-400 mt-2">
                                                <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-bold border border-white/5">
                                                    Age: {app.patient.dob ? new Date().getFullYear() - new Date(app.patient.dob).getFullYear() : 'N/A'}
                                                </span>
                                                <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-bold border border-white/5 text-rose-400">Blood: {app.patient.bloodGroup}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                                        <div className="text-right mr-4 hidden md:block">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Scheduled</p>
                                            <p className="text-white font-mono text-lg">{new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleUpdateStatus(app.id, 'COMPLETED'); }}
                                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-emerald-900/20"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleUpdateStatus(app.id, 'CANCELLED'); }}
                                                className="px-4 py-3 bg-slate-800 hover:bg-red-500/20 hover:text-red-500 text-slate-400 rounded-xl transition-all border border-white/5 hover:border-red-500/20"
                                            >
                                                <XCircle className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent History Grid */}
            <div className="pt-8 border-t border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-white">Session History</h3>
                    <button className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">View All Archive</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {completed.slice(0, 4).map((app, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            key={app.id}
                            className="p-5 bg-slate-900/50 border border-white/5 rounded-[1.5rem] hover:bg-slate-800/50 transition-colors group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                                    {app.patient.user.name.charAt(0)}
                                </div>
                                <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${app.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {app.status}
                                </span>
                            </div>
                            <div>
                                <p className="font-bold text-lg text-slate-200 mb-1">{app.patient.user.name}</p>
                                <p className="text-xs text-slate-500 font-mono">{new Date(app.appointmentDate).toLocaleDateString()}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
