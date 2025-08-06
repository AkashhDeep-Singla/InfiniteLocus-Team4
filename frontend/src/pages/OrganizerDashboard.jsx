import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { useEffect, useState } from "react"
import axios from "axios"

const OrganizerDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const organizerId = localStorage.getItem("userId")

                const res = await axios.get(
                    `http://localhost:8080/api/v1/organizer/${organizerId}/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch organizer dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <p>Loading Organizer Dashboard...</p>;
    if (!stats) return <p>Failed to load data </p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">
                🚀 Hello, {localStorage.getItem("userName") || "Organizer"}!
            </h1>
            <p className="text-gray-600 mb-6">Here’s how your events are performing 📈</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-sm text-gray-500">Events Created</h2>
                    <p className="text-3xl font-bold text-blue-500">{stats.totalCreatedEvents}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-sm text-gray-500">Total Registrations</h2>
                    <p className="text-3xl font-bold text-green-500">{stats.totalRegistrations}</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded shadow w-full">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    📊 Registrations per Event
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={stats.events} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="title"
                            angle={-20}
                            textAnchor="end"
                            interval={0}
                            height={60}
                        />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="registrations" fill="#4ade80" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OrganizerDashboard;
