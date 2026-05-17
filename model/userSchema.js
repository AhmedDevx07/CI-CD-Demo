import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
export const users = mongoose.model("users", userSchema);
