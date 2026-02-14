import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    User,
    Settings,
    LogOut,
    Menu,
    X,
    Activity,
    FileText,
    HeartPulse
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ role }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = {
        admin: [
            { icon: <LayoutDashboard />, label: 'Overview', path: '/admin/dashboard' },
            { icon: <User />, label: 'Users', path: '/admin/users' },
            { icon: <Calendar />, label: 'System Health', path: '/admin/stats' },
        ],
        doctor: [
            { icon: <LayoutDashboard />, label: 'Dashboard', path: '/doctor/dashboard' },
            { icon: <Calendar />, label: 'Appointments', path: '/doctor/appointments' },
            { icon: <Activity />, label: 'Patient Vitals', path: '/doctor/vitals' },
        ],
        patient: [
            { icon: <LayoutDashboard />, label: 'My Health', path: '/patient/dashboard' },
            { icon: <Calendar />, label: 'Book Appointment', path: '/patient/book' },
            { icon: <FileText />, label: 'Medical Records', path: '/patient/records' },
        ]
    };

    const items = (role && menuItems[role.toLowerCase()]) || [];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.aside
            animate={{ width: collapsed ? 80 : 280 }}
            className="h-screen glass sticky top-0 left-0 flex flex-col transition-all overflow-hidden border-r border-white/10"
        >
            <div className="p-6 flex items-center justify-between">
                {!collapsed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 font-black text-2xl tracking-tighter">
                        <HeartPulse className="text-primary-500 w-8 h-8" />
                        <span className="gradient-text">MedVault</span>
                    </motion.div>
                )}
                <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                    {collapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {items.map((item) => (
                    <Link key={item.path} to={item.path}>
                        <motion.div
                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${location.pathname === item.path ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                            whileHover={{ x: 5 }}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{item.label}</motion.span>}
                        </motion.div>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                >
                    <LogOut className="shrink-0" />
                    {!collapsed && <span>Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
