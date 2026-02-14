import { useEffect, useState } from "react";
import axios from "axios";

export default function useDashboard() {
    const [stats, setStats] = useState({
        users: 0,
        doctors: 0,
        patients: 0,
        appointments: 0
    });

    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/stats", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => setStats(res.data))
            .catch(err => console.error("Could not fetch dashboard stats", err));
    }, []);

    return stats;
}
