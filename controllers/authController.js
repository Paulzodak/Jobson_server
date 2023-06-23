import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Settings from "../models/settings.js";
export const signup = async (req, res) => {
  console.log(req.body);
  const password = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: password,
    authType: "emailAndPassword",
  });
  const settings = new Settings({
    email: req.body.email,
    newsAndUpdates: true,
    tipsAndTutorial: true,
    reminders: true,
    accountSummary: true,
  });
  try {
    await user.save();
    await settings.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(409).json({
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (passwordIsValid) {
      const token = jwt.sign(
        {
          fullname: user.fullname,
          password: passwordIsValid,
          email: user.email,
          imageUrl: user.imageUrl,
          id: user._id,
          bio: user.bio,
          stack: user.stack,
          experienceYears: user.experienceYears,
          cv: user.cv,
        },
        "secretadgjl13579"
      );

      return res.status(201).json({ status: "ok", user: token });
    } else {
      return res
        .status(400)
        .json({ status: "error", body: "Password incorrect" });
    }
  } else {
    return res.status(400).json({ status: "error", body: "No user found" });
  }
};
//
export const authWithGoogle = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    console.log("user exists");
    const token = jwt.sign(
      {
        fullname: user.fullname,
        password: true,
        email: user.email,
        imageUrl: user.imageUrl,
        id: user._id,
        bio: user.bio,
        stack: user.stack,
        experienceYears: user.experienceYears,
        cv: user.cv,
      },
      "secretadgjl13579"
    );

    return res.status(201).json({ status: "ok", user: token });
  } else if (!user) {
    console.log("user does not exists");
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.uid,
      uid: req.body.uid,
      authType: "emailAndPassword",
    });
    const settings = new Settings({
      email: req.body.email,
      newsAndUpdates: true,
      tipsAndTutorial: true,
      reminders: true,
      accountSummary: true,
    });
    try {
      console.log("creating new user");
      await newUser.save();
      await settings.save();
      const token = jwt.sign(
        {
          fullname: newUser.fullname,
          password: true,
          email: newUser.email,
          imageUrl: newUser.imageUrl,
          id: newUser._id,
          bio: newUser.bio,
          stack: newUser.stack,
          experienceYears: newUser.experienceYears,
          cv: newUser.cv,
        },
        "secretadgjl13579"
      );
      return res.status(201).json({ status: "ok", user: token });
    } catch (error) {
      console.log(error);
      res.status(409).json({
        error: error.message,
      });
    }
  }
  //    else {
  //     return res
  //       .status(400)
  //       .json({ status: "error", body: "Password incorrect" });
  //   }
  // else {
  //   return res.status(400).json({ status: "error", body: "No user found" });
  // }
};
