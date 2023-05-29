// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import authRoutes from "./routes/authRoute.js";
// import jobRoutes from "./routes/jobRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import notificationRoutes from "./routes/notification.js";
// import User from "./models/user.js";
// import Notification from "./models/notification.js";
// import { Server } from "socket.io";
// import http from "http";
// const app = express();
// dotenv.config();
// app.use(express.json({ extended: true }));
// app.use(express.json({ urlencoded: true }));
// const corsOptions = {
//   origin: "https://adetoun-insurance.vercel.app",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors());
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
// app.use("/api/auth", authRoutes);
// app.use("/api/job", jobRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.get("/api", (req, res) => {
//   res.send("Welcome to server");
// });
// const PORT = process.env.PORT || 5000;
// // const PORT = process.env.PORT
// io.on("connection", (socket) => {
//   console.log(`user connected on ${socket.id}`);
// });
// mongoose
//   .connect(
//     `mongodb+srv://ojepaul4jesus:Jobson1234@cluster1.wdzhpyk.mongodb.net/User-data?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() =>
//     server.listen(PORT, () => {
//       console.log("started");

//       // const db = client.db(dbName);

//       // // Create a change stream on the users collection
//       // const changeStream = db.collection(usersCollection).watch();

//       // // Set up the change event listener
//       // changeStream.on("change", function (change) {
//       //   const { operationType, fullDocument } = change;
//       //   console.log("i ran");
//       //   // Check if the operation is an insert or update
//       //   if (operationType === "insert" || operationType === "update") {
//       //     const { _id, email } = fullDocument;

//       //     // Check if the email field is empty
//       //     if (!email) {
//       //       // Create a new document in the notifications collection
//       //       const notification = {
//       //         userId: _id,
//       //         message: "Email field is empty",
//       //         createdAt: new Date(),
//       //       };

//       //       db.collection(notificationsCollection).insertOne(
//       //         notification,
//       //         function (err, result) {
//       //           if (err) {
//       //             console.error("Failed to insert notification:", err);
//       //           } else {
//       //             console.log(
//       //               "Notification inserted successfully:",
//       //               result.insertedId
//       //             );
//       //           }
//       //         }
//       //       );
//       //     }
//       //   }
//       // });
//     })
//   )
//   .catch((err) => {});

// User.watch().on("change", async (data) => {
//   console.log(data);
//   const { operationType, fullDocument } = data;
//   if (operationType === "insert" || operationType === "update") {
//     // const { _id, email, imageUrl } = fullDocument;
//     const user = await User.findOne({
//       _id: data.documentKey._id,
//     });
//     console.log(user);
//     if (
//       !user.cv ||
//       !user.imageUrl ||
//       !user.experienceYears ||
//       !user.stack ||
//       !user.bio
//     ) {
//       const notification = new Notification({
//         id: user._id,
//         title: "Please update your profile",
//         message:
//           "Please update your profile to allow our engines generate more accurate job listing",
//       });
//       try {
//         await notification.save();
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       const notification = new Notification({
//         id: user._id,
//         title: "Profile verified",
//         message:
//           "Profile update successful. You can check available listings for new jobs and offers",
//       });
//       try {
//         await notification.save();
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // Check if the email field is empty
//     // if (imageUrl) {
//     //   // Create a new document in the notifications collection
//     //   const notification = {
//     //     userId: _id,
//     //     message: "Email field is empty",
//     //     createdAt: new Date(),
//     //   };

//     //   db.collection(notificationsCollection).insertOne(
//     //     notification,
//     //     function (err, result) {
//     //       if (err) {
//     //         console.error("Failed to insert notification:", err);
//     //       } else {
//     //         console.log(
//     //           "Notification inserted successfully:",
//     //           result.insertedId
//     //         );
//     //       }
//     //     }
//     //   );
//     // }
//   }
// });

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
    origin: "https://adetoun-insurance.vercel.app",
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

  // Notification.watch().on("change", async (data) => {
  //   const { operationType, fullDocument } = data;

  //   try {
  //     const result = await Notification.aggregate([
  //       // Match documents with the given ID
  //       { $match: { _id: data.documentKey._id } },
  //       // Sort the matched documents by the "createdAt" field in descending order
  //       { $sort: { createdAt: -1 } },
  //     ]);

  //     result && socket.emit("fetchNotification", result);
  //   } catch (error) {
  //     socket.emit("fetchNotification", "error");
  //   }
  // });
  // Notification.watch().on("change", async (id) => {
  //   const { operationType, fullDocument } = data;
  //   console.log("new change");

  //   try {
  //     const result = await Notification.aggregate([
  //       // Match documents with the given ID
  //       { $match: { id: id } },
  //       // Sort the matched documents by the "createdAt" field in descending order
  //       { $sort: { createdAt: -1 } },
  //     ]);

  //     socket.emit("fetchNotification", result);
  //   } catch (error) {
  //     socket.emit("fetchNotification", "error");
  //   }
  // });
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
  // socket.on("notificationSnapshot", (id) => {
  //   // socket.to(data.room).emit("receive_message", data);
  //   Notification.watch().on("change", async (data) => {
  //     console.log(id);
  //     const { operationType, fullDocument } = data;
  //     try {
  //       const result = await Notification.aggregate([
  //         // Match documents with the given ID
  //         { $match: { id: id } },
  //         // Sort the matched documents by the "createdAt" field in descending order
  //         { $sort: { createdAt: -1 } },
  //       ]);

  //       socket.emit("notificationSnapshot", result);
  //     } catch (error) {
  //       console.error("notificationSnapshot", error);
  //       socket.emit("notificationSnapshot", "error");
  //     }
  //   });
  // });

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
    //  else {
    //   const notification = new Notification({
    //     id: user._id,
    //     title: "Profile verified!",
    //     seen: false,
    //     message:
    //       "Profile update successful. You can check available listings for new jobs and offers",
    //   });
    //   try {
    //     await notification.save();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }
});
