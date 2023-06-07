import express from "express";
import { getJobDetails, getJobs } from "../controllers/jobController.js";

const router = express.Router();
router.post("/getJobDetails", getJobDetails);
router.post("/getJobs", getJobs);

export default router;
