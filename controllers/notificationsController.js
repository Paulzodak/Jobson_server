import Notification from "../models/notification.js";
export const createNotification = async (req, res) => {
  const notification = new Notification({
    id: req.body.id,
    title: req.body.title,
    seen: false,
    message: req.body.message,
  });
  try {
    await notification.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error" });
  }
};
