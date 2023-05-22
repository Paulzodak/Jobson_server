import User from "../models/user.js";

export const updateProfile = async (req, res) => {
  const id = req.body.id;
  const bio = req.body.bio;
  const imageUrl = req.body.imageUrl;
  const stack = req.body.stack;
  const experienceYears = req.body.experienceYears;
  const cv = req.body.cv;

  const user = await User.findOneAndUpdate(
    {
      id: id,
    },
    {
      $set: {
        bio: bio,
        imageUrl: imageUrl,
        stack: stack,
        experienceYears: experienceYears,
        cv: cv,
      },
    },
    { returnOriginal: false }
  );
  if (user) {
    return res.json({ status: "ok", user: user });
  } else {
    res.json({ status: "error", user: false, body: "Error" });
  }
};
export const fetchUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    return res.status(201).json({ status: "ok", user: { ...user } });
  } else {
    return res.status(400).json({ status: "error", body: "Error" });
  }
};
//
