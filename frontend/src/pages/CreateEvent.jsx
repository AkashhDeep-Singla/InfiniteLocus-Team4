import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
    const [form, setForm] = useState({
        eventName: "",
        EventTime: "",
        venue: "",
        capacity: "",
        description: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:8080/api/v1/event/create",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 201) {
                setMessage("Event created successfully!");
                setForm({
                    eventName: "",
                    EventTime: "",
                    venue: "",
                    capacity: "",
                    description: "",
                });
            }
        } catch (err) {
            console.error("Event creation failed:", err);
            setMessage("Failed to create event. Please try again.");
        }
    };

    return (
        <div className="p-6 max-w-md bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">📅 Create New Event</h2>

            {message && (
                <p className="mb-4 text-sm font-medium text-blue-600">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="eventName"
                    placeholder="Event Name"
                    value={form.eventName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    name="EventTime"
                    type="datetime-local"
                    value={form.EventTime}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    name="venue"
                    placeholder="Venue"
                    value={form.venue}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    name="capacity"
                    type="number"
                    placeholder="Capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
