import mongoose from "mongoose";
import moment from "moment";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Please provide a email !"],
      unique: true,
      lowercase: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please provide valid email"
      ]
    },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    roles: {
      type: String,
      enum: ["customer", "admin", "employee"],
      default: "customer"
    },
    createdAt: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a")
    }
  },
  {
    versionKey: false
  }
);

const User = new mongoose.model("User", userSchema);

export default User;
