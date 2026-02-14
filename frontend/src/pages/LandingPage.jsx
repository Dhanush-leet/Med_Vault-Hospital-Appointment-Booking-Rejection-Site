import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';

function PremiumObject() {
    return (
        <Float speed={3} rotationIntensity={2} floatIntensity={2}>
            <mesh>
                <icosahedronGeometry args={[1.8, 1]} />
                <meshStandardMaterial
                    color="#14B8A6"
                    metalness={0.5}
                    roughness={0.2}
                    emissive="#10B981"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
}

export default function LandingPage() {
    const { scrollYProgress } = useScroll();
    const yBlob = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const features = [
        { title: "End-to-End Encryption", desc: "Military-grade AES-256 encryption ensuring your medical data remains your own." },
        { title: "Smart Appointment Flow", desc: "AI-powered scheduling engine that reduces wait times by 40%." },
        { title: "AI Health Insights", desc: "Proactive health monitoring with predictive analytics for better outcomes." }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-rose-50 text-slate-800 overflow-x-hidden relative font-sans">

            {/* Animated Floating Background Blobs */}
            <motion.div
                style={{ y: yBlob }}
                className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-emerald-200 rounded-full blur-3xl opacity-20 pointer-events-none"
            />
            <motion.div
                style={{ y: yBlob }}
                className="absolute bottom-40 right-[-100px] w-[600px] h-[600px] bg-rose-200 rounded-full blur-3xl opacity-20 pointer-events-none"
            />

            {/* NAVBAR */}
            <nav className="fixed w-full backdrop-blur-xl bg-white/70 border-b border-white/40 z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 tracking-tight">
                        MedVault
                    </Link>

                    <div className="space-x-4 flex items-center">
                        <Link to="/login" className="px-6 py-2.5 rounded-full text-emerald-700 hover:bg-emerald-50 font-medium transition-all duration-300">
                            Login
                        </Link>
                        <Link to="/register" className="px-6 py-2.5 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:scale-[1.02] active:scale-[0.98] font-medium transition-all duration-300">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 pt-32 pb-20 max-w-7xl mx-auto">

                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:w-1/2 text-center lg:text-left z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-6">
                        Healthcare. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                            Beautifully Digital.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        A secure, intelligent Electronic Health Record system designed
                        with elegance, speed, and enterprise-level compliance.
                    </p>

                    {/* Animated Heartbeat Line */}
                    <div className="mt-10 mb-10 h-12 w-full max-w-md mx-auto lg:mx-0 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-pulse rounded-full blur-xl"></div>
                        <svg width="100%" height="100%" viewBox="0 0 400 60" preserveAspectRatio="none">
                            <path
                                d="M0 30 L50 30 L70 10 L100 50 L130 20 L160 30 L400 30"
                                stroke="#10B981"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <animate
                                    attributeName="stroke-dasharray"
                                    from="0,400"
                                    to="400,0"
                                    dur="2.5s"
                                    repeatCount="indefinite"
                                    calcMode="spline"
                                    keySplines="0.4 0 0.2 1"
                                    keyTimes="0;1"
                                />
                                <animate
                                    attributeName="opacity"
                                    values="0;1;1;0"
                                    dur="2.5s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </svg>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/register" className="px-8 py-4 bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-1 transition-all duration-300 font-semibold text-lg">
                            Start Your Journey
                        </Link>

                        <button className="px-8 py-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg shadow-slate-100 hover:bg-white hover:-translate-y-1 transition-all duration-300 font-semibold text-lg text-slate-600">
                            Watch Demo
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT 3D OBJECT */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="lg:w-1/2 h-[500px] w-full mt-12 lg:mt-0 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/20 to-rose-200/20 rounded-full blur-3xl transform scale-75 animate-pulse"></div>
                    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#fb7185" />
                        <PremiumObject />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} enablePan={false} />
                    </Canvas>
                </motion.div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-32 px-6 md:px-20 relative z-10 bg-white/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Redefining Patient Care
                        </h3>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            Experience the future of healthcare management with tools designed for clarity, speed, and precision.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10, boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.15)" }}
                                className="p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] transition-all duration-300 group cursor-default"
                            >
                                <div className="w-14 h-14 bg-emerald-100/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-6 h-6 rounded-full bg-emerald-400/80"></div>
                                </div>
                                <h4 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">
                                    {item.title}
                                </h4>
                                <p className="text-slate-600 leading-relaxed font-medium opacity-80">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 text-center text-slate-500 bg-white/40 backdrop-blur-xl border-t border-white/30 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-medium">© 2026 MedVault. All rights reserved.</p>
                    <div className="flex gap-6 text-sm font-semibold text-slate-400">
                        <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
                        <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
