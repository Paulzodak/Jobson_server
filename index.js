import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notification.js";
import User from "./models/user.js";
import Notification from "./models/notification.js";
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.json({ urlencoded: true }));
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
const io = new Server(server, {
  cors: {
    origin: "https://https://jobson.vercel.app",
    methods: ["GET", "POST"],
  },
});
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.get("/api", (req, res) => {
  res.send("Welcome to server");
});
const PORT = process.env.PORT || 5000;
// server.listen(3001, () => {
//   console.log("SERVER RUNNING");
// });
mongoose
  .connect(
    `mongodb+srv://ojepaul4jesus:Jobson1234@cluster1.wdzhpyk.mongodb.net/User-data?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    server.listen(PORT, () => {
      console.log("started");
    })
  )
  .catch((err) => {});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  socket.on("connectNotification", async (id) => {
    console.log(id);
    // socket.userid = id;

    try {
      const result = await Notification.aggregate([
        // Match documents with the given ID
        { $match: { id: id } },
        // Sort the matched documents by the "createdAt" field in descending order
        { $sort: { createdAt: -1 } },
      ]);
      console.log("notifications" + result);
      socket.emit("sendNotificationResult", result);
    } catch (error) {
      socket.emit("sendNotificationResult", "error");
    }

    Notification.watch().on("change", async () => {
      // const { operationType, fullDocument } = data;
      console.log("new change");

      try {
        const result = await Notification.aggregate([
          // Match documents with the given ID
          { $match: { id: id } },
          // Sort the matched documents by the "createdAt" field in descending order
          { $sort: { createdAt: -1 } },
        ]);
        console.log("newchanges" + result);

        socket.emit("sendNotificationResult", result);
      } catch (error) {
        socket.emit("sendNotificationResult", "error");
      }
    });
  });
  socket.on("updateReadNotification", async (id) => {
    try {
      await Notification.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            seen: true,
          },
        },
        { returnOriginal: false }
      );
    } catch (error) {}
  });
  socket.on("deleteNotification", async (id) => {
    try {
      await Notification.deleteOne({ _id: id });
    } catch (error) {}
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

User.watch().on("change", async (data) => {
  console.log(data);
  const { operationType, fullDocument } = data;
  if (operationType === "insert" || operationType === "update") {
    // const { _id, email, imageUrl } = fullDocument;
    const user = await User.findOne({
      _id: data.documentKey._id,
    });
    console.log(user);
    Notification.aggregate([
      // Match documents with the given ID
      { $match: { id: user._id } },
      // Sort the matched documents by the "createdAt" field in descending order
      { $sort: { createdAt: -1 } },
    ]);
    if (
      !user.cv ||
      !user.imageUrl ||
      !user.experienceYears ||
      !user.stack ||
      !user.bio
    ) {
      const notification = new Notification({
        id: user._id,
        title: "Please update your profile!",
        seen: false,
        message:
          "Please update your profile to allow our engines generate more accurate job listing",
      });
      try {
        await notification.save();
      } catch (error) {
        console.log(error);
      }
    }
  }
});
