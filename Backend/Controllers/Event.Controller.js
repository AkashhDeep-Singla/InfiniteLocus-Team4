import Event from "../Models/Event.model.js";
import UserEvent from "../Models/User.model.js";

export const createEvent = async (req, res) => {
  try {
    const { eventName, description, venue, capacity, EventTime } = req.body;
    const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserEvent.findById(decoded.userId).select("-password");
    if (!eventName || !venue || !capacity ||!EventTime) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const newEvent = new Event({
      eventName,
      description,
      venue,
      capacity,
      EventTime: EventTime,
      createdBy:user
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMyOrganizedEvents = async (req, res) => {
    try {
        // const organizerId = req.user._id;
        const {organizerId}=req.params;
        const events = await Event.find({ createdBy: organizerId }).populate("registeredUsers", "email");
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching organizer events", error });
    }
};


export const deleteEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.remove();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event" });
 }
};
// export const getEventById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const event = await Event.findById(id);
//     if (!event) {
//       return res.status(404).json({ error: "Event not found" });
//     }

//     res.status(200).json(event);
//   } catch (error) {
//     console.error("Error fetching event by ID:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };