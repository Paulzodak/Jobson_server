import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.json({ urlencoded: true }));
const corsOptions = {
  origin: "https://adetoun-insurance.vercel.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/user", userRoutes);
app.get("/api", (req, res) => {
  res.send("Welcome to server");
});
const PORT = process.env.PORT || 5000;
// const PORT = process.env.PORT
mongoose
  .connect(
    `mongodb+srv://ojepaul4jesus:Jobson1234@cluster1.wdzhpyk.mongodb.net/User-data?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log("started");
    })
  )
  .catch((err) => {});
