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
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);
const users = mongoose.model("users", usersSchema);
export default users;
