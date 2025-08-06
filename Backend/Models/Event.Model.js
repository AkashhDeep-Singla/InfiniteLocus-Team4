import mongoose from "mongoose";

const EventModel = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String
    },
    venue: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    EventTime: {
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth", // Assuming a User model exists
        required: true
    },
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    }]
}, { timestamps: true });

const Event = mongoose.model("Event", EventModel);
export default Event;
