import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserProfileData } from "../controllers/profile.controller.js";

const profileRoutes = express.Router();

profileRoutes.get("/", authMiddleware, getUserProfileData);

export default profileRoutes;
