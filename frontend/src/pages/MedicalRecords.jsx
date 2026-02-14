import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Trash2, Eye, Filter, Plus } from 'lucide-react';
import { patientService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PatientUpload from '../components/PatientUpload';

const MedicalRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        fetchRecords();
    }, [user.id]);

    const fetchRecords = async () => {
        try {
            const res = await patientService.getRecords(user.id);
            setRecords(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 p-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Medical Records</h1>
                    <p className="text-slate-500 font-medium">Manage your digital health folder and documents.</p>
                </div>
                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:scale-105 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    New Upload
                </button>
            </header>

            {showUpload && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
                    <PatientUpload onUploadSuccess={fetchRecords} />
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.map((rec, i) => (
                    <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a href={rec.fileUrl} target="_blank" rel="noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all inline-block">
                                <Download className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <FileText className="w-8 h-8" />
                        </div>

                        <h3 className="text-lg font-extrabold text-slate-800 mb-2 truncate">
                            {rec.description || rec.fileName || "Untitled Record"}
                        </h3>

                        <div className="flex items-center justify-between mt-6">
                            <span className="text-xs font-bold text-slate-400 uppercase">{new Date(rec.uploadedAt).toLocaleDateString()}</span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black tracking-widest uppercase">PDF</span>
                        </div>
                    </motion.div>
                ))}

                {records.length === 0 && !loading && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
                        <p className="text-slate-400 font-medium">No documents found. Start by uploading your first record.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalRecords;
