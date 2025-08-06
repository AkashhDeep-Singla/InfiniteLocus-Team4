import express from "express";
import { getAllEvents, getMyEvents, registerEvent } from "../Controllers/User.controller.js";
import {requireSignIn} from '../MIddlewares/Auth.Midleware.js'

const router = express.Router();

router.get("/events",requireSignIn, getAllEvents);
router.post("/register",requireSignIn, registerEvent);
router.get("/myevents/:userId",requireSignIn, getMyEvents);

export default router;
