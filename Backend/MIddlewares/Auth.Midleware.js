import jwt from "jsonwebtoken";
import Auth from "../Models/User.model.js";
const JWT_SECRET = "1234572487t6924"

export const requireSignIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user by email
    const user = await Auth.findOne({ email: decoded.email }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
