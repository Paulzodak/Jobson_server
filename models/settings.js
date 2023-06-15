import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    newsAndUpdates: {
      type: Boolean,
    },
    tipsAndTutorial: {
      type: Boolean,
    },
    reminders: {
      type: Boolean,
    },
    accountSummary: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const Settings = mongoose.model("settings", settingsSchema);
export default Settings;
