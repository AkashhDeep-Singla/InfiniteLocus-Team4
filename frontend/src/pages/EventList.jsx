import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import axios from "axios";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/event/allevents");
            setEvents(response.data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (eventId) => {
        try {
            const token = localStorage.getItem("token");
            const eventData = {
                eventId,
            }
            const response = await axios.post(
                `http://localhost:8080/api/v1/user/register/`,
                { eventData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Successfully registered for the event!");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Failed to register. Please try again.");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Available Events 📅</h2>

            {loading ? (
                <p>Loading events...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => (
                        <EventCard
                            key={event._id}
                            event={event}
                            onRegister={handleRegister}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventList;
