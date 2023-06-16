import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      // required: true,
    },
    username: {
      type: String,
    },
    location: {
      type: String,
    },
    bio: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    nationality: {
      type: String,
    },
    streetAddress: {},
    imageUrl: {
      type: String,
      required: false,
    },
    stack: {
      type: String,
      required: false,
    },
    experienceYears: {
      type: String,
      required: false,
    },
    cv: {
      type: {},
      required: false,
    },
    profileVerified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);
export default User;
