import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { doctorService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
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

    const filteredAppointments = filter === 'ALL'
        ? appointments
        : appointments.filter(a => a.status === filter);

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8 bg-slate-950 min-h-screen text-slate-200">
            <header className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Appointment <span className="text-indigo-500">Master List</span></h1>
                    <p className="text-slate-400 font-medium">Manage and review all patient consultations.</p>
                </div>
                <div className="flex bg-slate-900 p-1 rounded-2xl border border-white/5">
                    {['ALL', 'PENDING', 'COMPLETED', 'CANCELLED'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === f ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </header>

            <div className="space-y-4">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((app, i) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-800/50 transition-all border-l-4 border-l-indigo-500"
                        >
                            <div className="flex items-center gap-6 flex-1">
                                <div className="w-14 h-14 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center font-bold text-xl border border-indigo-500/20">
                                    {app.patient.user.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white">{app.patient.user.name}</h4>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(app.appointmentDate).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(app.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${app.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                        app.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                            'bg-red-500/10 text-red-500 border border-red-500/20'
                                    }`}>
                                    {app.status}
                                </span>

                                {app.status === 'PENDING' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateStatus(app.id, 'COMPLETED')}
                                            className="p-3 bg-emerald-600/20 text-emerald-500 rounded-xl hover:bg-emerald-600 hover:text-white transition-all border border-emerald-500/20"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(app.id, 'CANCELLED')}
                                            className="p-3 bg-red-600/20 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-500/20"
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="py-20 text-center bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-white/5">
                        <Calendar className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">No appointments matched the selected filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments;
