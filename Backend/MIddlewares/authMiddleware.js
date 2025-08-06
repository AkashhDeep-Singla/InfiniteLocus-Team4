import jwt from "jsonwebtoken";
import Auth from "../Models/User.model.js";

export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user by email
        const user = await Auth.findOne({ email: decoded.email }).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};
