import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    ref: "users",
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "3m",
  },
});
const users = mongoose.model("users", usersSchema);
export const otpModel = mongoose.model("otp", otpSchema);
export default users;
