import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full" />
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
        </div>
    );

    if (!user) return <Navigate to="/login" />;

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar role={user.role} />
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
