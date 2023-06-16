import mongoose from "mongoose";

const savedJobs = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    adref: {
      type: String,
    },
    category: {},
    company: {},
    contract_time: {
      type: String,
    },
    contract_type: {
      type: String,
    },
    created: {
      type: String,
    },
    description: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
    },
    location: {},
    redirect_url: {
      type: String,
    },
    salary_is_predicted: {
      type: String,
    },
    salary_max: {
      type: Number,
    },
    salary_min: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);
const SavedJobs = mongoose.model("savedJobs", savedJobs);
export default SavedJobs;
