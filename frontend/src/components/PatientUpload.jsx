import { useState } from "react";
import axios from "axios";
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PatientUpload({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, success, error

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setStatus('idle');
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:8080/api/patient/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setStatus('success');
            if (onUploadSuccess) onUploadSuccess();
            setTimeout(() => setStatus('idle'), 3000);
            setFile(null);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/50 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-500" />
                Upload Medical Records
            </h3>

            <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-emerald-400 transition-colors bg-white/50 mb-4">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                        <Upload className="w-6 h-6" />
                    </div>
                    {file ? (
                        <p className="text-sm font-medium text-emerald-600 truncate max-w-[200px]">{file.name}</p>
                    ) : (
                        <>
                            <p className="text-slate-600 font-medium">Click or Drag file to upload</p>
                            <p className="text-xs text-slate-400">PDF, JPG, PNG (Max 10MB)</p>
                        </>
                    )}
                </div>
            </div>

            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Secure Upload'}
            </button>

            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="mt-4 p-3 bg-emerald-100/50 text-emerald-700 rounded-xl flex items-center gap-2 text-sm font-medium"
                    >
                        <CheckCircle className="w-4 h-4" /> File uploaded successfully!
                    </motion.div>
                )}
                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="mt-4 p-3 bg-red-100/50 text-red-700 rounded-xl flex items-center gap-2 text-sm font-medium"
                    >
                        <AlertCircle className="w-4 h-4" /> Upload failed. Please try again.
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
