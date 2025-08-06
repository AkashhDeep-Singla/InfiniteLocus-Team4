import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

const COLORS = ["#4ade80", "#f87171"]

const Dashboard = () => {
    const [data, setData] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");
                const user = JSON.parse(localStorage.getItem("user"));

                const res = await fetch(`http://localhost:8080/api/v1/dashboard/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const dashboardData = await res.json();
                setData(dashboardData);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
            }
        };

        fetchDashboard();
    }, []);


    if (!data) return <p>Loading dashboard...</p>;

    const chartData = Object.entries(data.registrationStatus).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">
                🎉 Welcome back, {user?.name || "User"}!
            </h1>
            <p className="text-gray-600 mb-6">Here's your event overview 👇</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-sm text-gray-500">Total Events</h2>
                    <p className="text-3xl font-bold">{data.totalEvents}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-sm text-gray-500">Registered Events</h2>
                    <p className="text-3xl font-bold text-green-500">{data.registeredEvents}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-sm text-gray-500">Upcoming Events</h2>
                    <p className="text-3xl font-bold text-blue-500">{data.upcomingEvents}</p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded shadow w-full max-w-lg mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-center">Registration Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
