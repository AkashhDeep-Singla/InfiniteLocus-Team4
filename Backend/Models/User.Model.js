 import mongoose from "mongoose";

const UserEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
}, { timestamps: true });

const UserEvent = mongoose.model("UserEvent", UserEventSchema);
export default UserEvent;
