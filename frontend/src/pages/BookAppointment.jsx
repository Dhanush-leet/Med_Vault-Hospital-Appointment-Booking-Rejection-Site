import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, User, Clock, CheckCircle, ChevronRight, Search } from 'lucide-react';
import { patientService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await patientService.getDoctors();
                setDoctors(res.data);
                if (res.data.length > 0) {
                    setSelectedDoctor(res.data[0]);
                }
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
                const mockDoctors = [
                    { id: '1', user: { name: 'Dr. Sarah Wilson' }, specialization: 'Cardiology' },
                    { id: '2', user: { name: 'Dr. James Chen' }, specialization: 'Neurology' },
                    { id: '3', user: { name: 'Dr. Elena Rossi' }, specialization: 'Pediatrics' }
                ];
                setDoctors(mockDoctors);
                setSelectedDoctor(mockDoctors[0]);
            }
        };
        fetchDoctors();
    }, []);

    const handleBook = async (e) => {
        e.preventDefault();

        if (!selectedDoctor) {
            setError('Please select a specialist from the list.');
            return;
        }

        if (!date) {
            setError('Please pick both a date and a time for your consultation.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await patientService.bookAppointment(user.id, {
                doctorId: selectedDoctor.id,
                date: date,
                notes: notes
            });
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Booking failed. Please check your internet connection or try a different time slot.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-emerald-200"
                >
                    <CheckCircle className="w-12 h-12" />
                </motion.div>
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h2>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto">Your consultation has been scheduled. You can now view it in your dashboard.</p>
                </div>
                <Link
                    to="/patient/dashboard"
                    className="btn-primary inline-flex items-center gap-2 group"
                >
                    Return to Dashboard
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-6">
            <header>
                <h1 className="text-3xl font-black text-slate-900">Book an Appointment</h1>
                <p className="text-slate-500">Select a specialist and choose your preferred time.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Doctor Selection */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Search className="w-5 h-5 text-primary-500" />
                        Choose a Specialist
                    </h3>
                    <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                        {doctors.map((doc) => (
                            <motion.div
                                key={doc.id}
                                whileHover={{ x: 5 }}
                                onClick={() => setSelectedDoctor(doc)}
                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedDoctor?.id === doc.id ? 'border-primary-500 bg-primary-50/50' : 'border-slate-100 bg-white hover:border-primary-200'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-primary-600 font-bold">
                                        {doc.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{doc.user.name}</p>
                                        <p className="text-xs text-slate-500">{doc.specialization}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Booking Form */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleBook} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Consultation With</label>
                            <input
                                type="text"
                                readOnly
                                value={selectedDoctor ? selectedDoctor.user.name : 'Select a doctor...'}
                                className="w-full px-6 py-4 bg-slate-100 rounded-2xl font-bold text-slate-800 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Date & Time</label>
                            <input
                                type="datetime-local"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={`w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all ${!date ? 'border-amber-200' : 'border-slate-200'}`}
                            />
                            {!date && (
                                <p className="text-[10px] text-amber-600 font-bold flex items-center gap-1 mt-1 px-2">
                                    <Clock className="w-3 h-3" />
                                    Please select both date and time.
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Notes (Optional)</label>
                            <textarea
                                rows="3"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Describe your symptoms..."
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 mt-4 rounded-full font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${loading ? 'bg-slate-300 text-slate-500' : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-primary-200'}`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Calendar className="w-5 h-5" />
                                    Confirm Appointment
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
