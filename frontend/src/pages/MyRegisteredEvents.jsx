import { useEffect, useState } from "react"
import axios from "axios"

const MyRegisteredEvents = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                const user = JSON.parse(localStorage.getItem("user")); // get stored user

                const res = await axios.get(
                    `http://localhost:8080/api/v1/events/my-events/${user._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setEvents(res.data.events);
            } catch (err) {
                console.error("Error fetching registrations:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRegisteredEvents();
    }, []);


    if (loading) return <p>Loading your events...</p>;
    if (events.length === 0) return <p>No events registered yet 🤷‍♂️</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">📋 My Registered Events</h1>
            <div className="grid gap-4">
                {events.map((event) => (
                    <div key={event._id} className="p-4 bg-white shadow rounded">
                        <h2 className="text-lg font-semibold">{event.title}</h2>
                        <p className="text-sm text-gray-500">Organized by: {event.organizer?.name || "Unknown"}</p>
                        <p className="text-sm text-gray-500">
                            Date: {new Date(event.date).toLocaleDateString()}
                        </p>
                        <button className="text-red-500 text-sm mt-2">Cancel Registration</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyRegisteredEvents