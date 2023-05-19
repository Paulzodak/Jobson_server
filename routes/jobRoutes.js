import express from "express";
import { getJobDetails } from "../controllers/jobController.js";

const router = express.Router();
router.post("/getJobDetails", getJobDetails);
export default router;
