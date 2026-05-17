import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { users } from "./model/userSchema.js";

const app = express();           
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

const mongooseConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("server connected");
  } catch (error) {
    console.log(error);
  }
};

mongooseConnection();

app.post("/adduser", async (req, res) => {
  const data = req.body;
  try {
    const newUser = await users.create(data);
    res.status(201).send({
      status: true,
      message: "user add ho gaye",
      data: newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.send({ status: false, message: error.message });
  }
});

app.get("/alluser", async (req, res) => {
  try {
    const allusers = await users.find();
    res.json({
      status: true,
      message: "all users",
      data: allusers,
    });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    if (!user) return res.json({ status: false, message: "user not found" });
    res.json({ status: true, message: "user found", data: user });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const user = await users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.json({ status: false, message: "user not found" });
    res.json({ status: true, message: "user updated", data: user });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const user = await users.findByIdAndDelete(req.params.id);
    if (!user) return res.json({ status: false, message: "user not found" });
    res.json({ status: true, message: "user deleted", data: user });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

app.listen(3000, () => {
  console.log("server chal gaya");
});
