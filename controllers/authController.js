import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Max-Age", "1800");
  // res.setHeader("Access-Control-Allow-Headers", "content-type");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  // );
  console.log(req.body);
  const password = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: password,
  });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Max-Age", "1800");
  // res.setHeader("Access-Control-Allow-Headers", "content-type");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  // );

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
        },
        "secretadgjl13579"
      );

      return res.status(201).json({ status: "ok", user: token });
    } else {
      return res
        .status(400)
        .json({ status: "error", body: "password incorrect" });
    }
  } else {
    return res.status(400).json({ status: "error", body: "Error" });
  }
};
//
