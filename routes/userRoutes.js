import express from "express";
import { updateProfile, fetchUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/updateProfile", updateProfile);
router.post("/fetchUser", fetchUser);
export default router;
