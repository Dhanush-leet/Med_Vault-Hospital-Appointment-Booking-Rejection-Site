import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Droplets, Thermometer, Wind, User } from 'lucide-react';
import { doctorService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DoctorVitals = () => {
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

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-slate-950">
            <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
        </div>
    );

    // Get unique patients
    const patients = Array.from(new Set(appointments.map(a => a.patient.id)))
        .map(id => appointments.find(a => a.patient.id === id).patient);

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8 bg-slate-950 min-h-screen text-slate-200">
            <header>
                <h1 className="text-4xl font-black text-white tracking-tight">Patient <span className="text-blue-500">Vitals Monitor</span></h1>
                <p className="text-slate-400 font-medium">Real-time physiological data for your active patient list.</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {patients.length > 0 ? (
                    patients.map((patient, i) => (
                        <motion.div
                            key={patient.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>

                            <div className="flex items-center gap-6 mb-8 relative z-10">
                                <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center font-bold text-2xl border border-blue-500/20">
                                    {patient.user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{patient.user.name}</h3>
                                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Active Patient</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                {[
                                    { icon: <Heart className="w-5 h-5" />, label: 'Heart Rate', value: '74', unit: 'bpm', color: 'text-rose-500', bg: 'bg-rose-500/10' },
                                    { icon: <Activity className="w-5 h-5" />, label: 'Blood Pressure', value: '118/76', unit: 'mmHg', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                                    { icon: <Wind className="w-5 h-5" />, label: 'Oxygen', value: '98', unit: '%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                                    { icon: <Thermometer className="w-5 h-5" />, label: 'Temperature', value: '98.6', unit: '°F', color: 'text-amber-500', bg: 'bg-amber-500/10' }
                                ].map((stat, idx) => (
                                    <div key={idx} className="p-6 bg-slate-800/50 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all flex flex-col gap-2">
                                        <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                                            {stat.icon}
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-white">{stat.value}</span>
                                            <span className="text-[10px] font-bold text-slate-500">{stat.unit}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-white/5">
                        <User className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">No active patients found to monitor.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorVitals;
