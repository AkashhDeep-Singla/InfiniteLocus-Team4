import { useEffect, useState } from "react";
import axios from "axios";

const MyRegisteredEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                const user = JSON.parse(localStorage.getItem("user"));

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

    const handleCancel = async (eventId) => {
        try {
            setCancellingId(eventId);
            const token = localStorage.getItem("token");

            const res = await axios.delete(
                `http://localhost:8080/api/v1/user/unregister/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                setEvents((prev) => prev.filter((e) => e._id !== eventId));
                alert("Registration cancelled");
            } else {
                alert("Failed to cancel registration");
            }
        } catch (err) {
            console.error("Cancel failed:", err);
            alert("Something went wrong ");
        } finally {
            setCancellingId(null);
        }
    };

    if (loading) return <p>Loading your events...</p>;
    if (events.length === 0) return <p>No events registered yet 🤷‍♂️</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">📋 My Registered Events</h1>
            <div className="grid gap-4">
                {events.map((event) => (
                    <div key={event._id} className="p-4 bg-white shadow rounded">
                        <h2 className="text-lg font-semibold">{event.eventName || "Untitled Event"}</h2>
                        <p className="text-sm text-gray-500">
                            Organizer: {event.organizer?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500">
                            Date:{" "}
                            {event.EventTime
                                ? new Date(event.EventTime).toLocaleString()
                                : "TBD"}
                        </p>
                        <button
                            className="text-red-500 text-sm mt-2 hover:underline disabled:opacity-60"
                            onClick={() => handleCancel(event._id)}
                            disabled={cancellingId === event._id}
                        >
                            {cancellingId === event._id ? "Cancelling..." : "Cancel Registration"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRegisteredEvents;
