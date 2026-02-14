import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Activity, Database, Trash2, Server } from 'lucide-react';
import { adminService } from '../services/api';
import useDashboard from '../hooks/useDashboard';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import InteractiveModel from '../components/InteractiveModel';
import AnimatedStats from '../components/AnimatedStats';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load heavy charts
const Line = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Line })));
const Doughnut = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Doughnut })));

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

function DNAModel() {
    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <InteractiveModel modelPath="/models/dna.glb" scale={0.5} />
        </Float>
    );
}

function Loader() {
    return <Html center><div className="text-white text-sm font-mono animate-pulse">LOADING 3D ASSETS...</div></Html>;
}

const AdminDashboard = () => {
    const stats = useDashboard();
    // In a real app, users would be fetched via another hook or context
    const users = [
        { id: 1, name: "Dr. Smith", email: "smith@medvault.com", role: "DOCTOR" },
        { id: 2, name: "John Doe", email: "john@gmail.com", role: "PATIENT" },
        { id: 3, name: "Admin User", email: "admin@medvault.com", role: "ADMIN" }
    ];

    const doughnutData = {
        labels: ['Doctors', 'Patients', 'Admins'],
        datasets: [{
            data: [stats.doctors || 0, stats.patients || 0, 3],
            backgroundColor: ['#0ea5e9', '#8b5cf6', '#e11d48'],
            borderWidth: 0,
        }]
    };

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 bg-slate-950 min-h-screen text-slate-200">
            <header className="flex flex-col md:flex-row justify-between items-end gap-6 pb-8 border-b border-white/5">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Admin Control Room
                    </h1>
                    <p className="text-slate-400 font-medium flex items-center gap-2">
                        <Server className="w-4 h-4 text-emerald-500 animate-pulse" />
                        System Optimal • Latency 12ms
                    </p>
                </div>
            </header>

            {/* 3D Visualizer Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-1 h-[400px] bg-slate-900/50 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute top-6 left-6 z-10">
                        <h2 className="text-xl font-bold text-white">Genomic Data Stream</h2>
                        <p className="text-xs text-slate-400">Live 3D Visualization</p>
                    </div>
                    <ErrorBoundary fallback={<div className="h-full flex items-center justify-center text-indigo-500 font-bold bg-slate-900/50">Genomic visualizer offline</div>}>
                        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#8b5cf6" />
                            <Suspense fallback={<Loader />}>
                                <DNAModel />
                            </Suspense>
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                        </Canvas>
                    </ErrorBoundary>
                </motion.div>

                {/* Live Stats Grid */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    {[
                        { label: 'Total Users', value: stats.users, icon: <Users />, color: 'bg-blue-600' },
                        { label: 'Doctors', value: stats.doctors, icon: <Activity />, color: 'bg-emerald-600' },
                        { label: 'Patients', value: stats.patients, icon: <Users />, color: 'bg-purple-600' },
                        { label: 'Appointments', value: stats.appointments, icon: <Calendar />, color: 'bg-rose-600' }
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] flex flex-col justify-between hover:bg-slate-800 transition-all hover:scale-[1.02] cursor-pointer group"
                        >
                            <div className="flex justify-between items-start">
                                <div className={`${s.color} p-3 rounded-xl text-white shadow-lg`}>
                                    {s.icon}
                                </div>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-300 transition-colors">Live</span>
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-white mt-4">{s.value}</h3>
                                <p className="text-slate-500 text-sm font-medium">{s.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Charts & Data */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Recharts Component */}
                    <div className="h-80">
                        <AnimatedStats />
                    </div>

                    {/* User Table */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Database className="w-5 h-5 text-indigo-500" /> User Database
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-950/50 text-slate-500 text-xs uppercase font-bold">
                                    <tr>
                                        <th className="px-8 py-4">Identity</th>
                                        <th className="px-8 py-4">Role</th>
                                        <th className="px-8 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-4">
                                                <p className="font-bold text-slate-200">{u.name}</p>
                                                <p className="text-xs text-slate-500">{u.email}</p>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${u.role === 'ADMIN' ? 'border-red-500/30 text-red-500' :
                                                    u.role === 'DOCTOR' ? 'border-blue-500/30 text-blue-500' :
                                                        'border-slate-500/30 text-slate-400'
                                                    }`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">User Distribution</h3>
                        <div className="space-y-4 mt-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sky-500"></div> Doctors</span>
                                <span className="text-white font-bold">{stats.doctors}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-500"></div> Patients</span>
                                <span className="text-white font-bold">{stats.patients}</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64 mt-8">
                        <Suspense fallback={<div className="h-full w-full bg-slate-800 animate-pulse rounded-full" />}>
                            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '70%' }} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
