import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { executeCode, runCode, submitCode } from "../controllers/executeCode.controller.js";


const executionRoute = express.Router();


executionRoute.post("/" , authMiddleware , executeCode);
executionRoute.post("/run" , authMiddleware , runCode);
executionRoute.post("/submit" , authMiddleware , submitCode);



export default executionRoute;