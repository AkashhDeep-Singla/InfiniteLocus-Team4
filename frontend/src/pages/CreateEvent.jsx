import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
    const [form, setForm] = useState({
        title: "",
        date: "",
        location: "",
        description: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

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
                setMessage(" Event created successfully!");
                setForm({
                    title: "",
                    date: "",
                    location: "",
                    description: "",
                    capacity: "",
                });
            }
        } catch (err) {
            console.error("Event creation failed:", err);
            setMessage("Failed to create event. Please try again.");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Create New Event</h2>

            {message && (
                <p className="mb-4 text-sm font-medium text-blue-600">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <input
                    name="title"
                    placeholder="Event Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <input
                    name="capacity"
                    type="number"
                    placeholder="Capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
