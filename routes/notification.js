import express from "express";
import { createNotification } from "../controllers/notificationsController.js";

const router = express.Router();
router.post("/createNotification", createNotification);

export default router;
