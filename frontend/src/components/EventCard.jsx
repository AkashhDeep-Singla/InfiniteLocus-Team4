import { useState } from "react";

const EventCard = ({ event, onRegister }) => {
    const [registering, setRegistering] = useState(false);

    const handleRegisterClick = async () => {
        setRegistering(true);
        await onRegister(event._id);
        setRegistering(false);
    };

    const formattedDate = event.EventTime
        ? new Date(event.EventTime).toLocaleString()
        : "Date/Time TBD";
    return (
        <div className="border p-4 rounded shadow-sm space-y-2 bg-white">
            <h3 className="text-xl font-semibold text-blue-800">
                {event.eventName || "Untitled Event"}
            </h3>
            <p className="text-sm text-gray-600">
                {formattedDate} @ {event.venue || "Venue TBD"}
            </p>
            <p className="text-gray-700">{event.description || "No description provided."}</p>
            <p className="text-sm text-gray-500">Capacity: {event.capacity || "N/A"}</p>
            <button
                onClick={handleRegisterClick}
                disabled={registering}
                className={`mt-2 px-4 py-2 rounded text-white ${registering ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {registering ? "Registering..." : "Register"}
            </button>
        </div>
    );
};

export default EventCard;