const EventCard = ({ event, onRegister }) => {
    return (
        <div className="border p-4 rounded shadow-sm space-y-2">
            <h3 className="text-xl font-semibold">{event.eventName}</h3>
            <p className="text-sm text-gray-600">{event.EventTime} @ {event.venue}</p>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-sm text-gray-500">Capacity: {event.capacity}</p>
            <button
                onClick={() => onRegister(event._id)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Register
            </button>
        </div>
    )
}

export default EventCard