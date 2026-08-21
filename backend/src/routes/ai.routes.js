import express from "express";
import { analyzeCodeSubmission } from "../controllers/ai.controller.js";

const aiRoutes = express.Router();

aiRoutes.post("/analyze", analyzeCodeSubmission);

export default aiRoutes;
