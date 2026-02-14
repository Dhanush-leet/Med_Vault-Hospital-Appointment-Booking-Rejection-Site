import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader2, UserPlus, Stethoscope, UserCircle } from 'lucide-react';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'PATIENT',
        specialization: '', experience: '', dob: '', bloodGroup: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await authService.register(formData);
            login(res.data);
            const role = res.data.role.toLowerCase();
            navigate(`/${role}/dashboard`);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="absolute inset-0 bg-secondary-600/5 -z-10" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass w-full max-w-2xl p-10 rounded-[2.5rem]"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black mb-2 gradient-text">Create Account</h1>
                    <p className="text-slate-500">Join the MedVault medical network</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input type="text" placeholder="Full Name" required className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input type="email" placeholder="Email Address" required className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="password" placeholder="Password" required className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>

                    <div className="flex gap-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                        {['PATIENT', 'DOCTOR'].map((role) => (
                            <button
                                key={role}
                                type="button"
                                className={`flex-1 py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${formData.role === role ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500'}`}
                                onClick={() => setFormData({ ...formData, role })}
                            >
                                {role === 'PATIENT' ? <UserCircle className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
                                {role}
                            </button>
                        ))}
                    </div>

                    {formData.role === 'DOCTOR' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Specialization (e.g. Cardiologist)" required className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} />
                            <input type="number" placeholder="Experience (Years)" required className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
                        </motion.div>
                    )}

                    {formData.role === 'PATIENT' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-slate-400 ml-4">Date of Birth</label>
                                <input type="date" required className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-slate-400 ml-4">Blood Group</label>
                                <select className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium appearance-none" required value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}>
                                    <option value="">Select Blood Group</option>
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                            </div>
                        </motion.div>
                    )}

                    <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-4">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-5 h-5" /> Register Account</>}
                    </button>

                    {error && <p className="text-red-500 text-center font-medium">{error}</p>}
                </form>

                <div className="mt-8 text-center text-slate-500 font-medium">
                    Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Login</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
