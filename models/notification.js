import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    id: {},
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    seen: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const Notification = mongoose.model("notification", notificationSchema);
export default Notification;
