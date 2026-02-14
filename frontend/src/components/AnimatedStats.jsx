import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "Jan", patients: 30 },
    { name: "Feb", patients: 45 },
    { name: "Mar", patients: 60 },
    { name: "Apr", patients: 75 },
    { name: "May", patients: 90 },
    { name: "Jun", patients: 110 }
];

export default function AnimatedStats() {
    return (
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl h-full">
            <h2 className="text-xl font-semibold mb-4 text-emerald-800">Patient Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#059669" />
                    <YAxis stroke="#059669" />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: 'none' }}
                        itemStyle={{ color: '#059669' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="patients"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
