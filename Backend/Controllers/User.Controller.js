import Event from "../Models/Event.model.js";
import UserEvent from "../Models/User.model.js";
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, events });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const registerEvent = async (req, res) => {
    try {
        
        const {userId,eventId}=req.body; 
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ msg: "Event not found" });

        // Prevent duplicate registration
        if (event.registeredUsers.includes(userId)) {
            return res.status(400).json({ msg: "Already registered" });
        }

        event.registeredUsers.push(userId);
        await event.save();

        res.status(200).json({ msg: "Registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getMyEvents = async (req, res) => {
    const { userId } = req.params;

    try {
        const registeredEvents = await UserEvent.find({ userId }).populate("eventId");
        const events = registeredEvents.map(reg => reg.eventId);
        res.status(200).json({ success: true, events });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
