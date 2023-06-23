import express from "express";
import { signup, login ,authWithGoogle} from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/authWithGoogle", authWithGoogle);
export default router;
