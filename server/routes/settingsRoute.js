import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.patch("/changeUsername", async (req, res) => {
  try {
    const { userId, newUsername } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername }, // field to update
      { new: true }, // return updated document
    );

    res.status(200).json({ message: "userame updated", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "username update faild" });
  }
});

router.patch("/changeBio", async (req, res) => {
  try {
    const { userId, newBio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio: newBio }, // field to update
      { new: true }, // return updated document
    );

    res.status(200).json({ message: "bio updated", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "bio update faild" });
  }
});

router.patch("/changeActiveStatus", async (req, res) => {
  try {
    const { userId, currentStatus } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { activestatus: !currentStatus }, // field to update
      { new: true }, // return updated document
    );

    res.status(200).json({ message: "Active status updated", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Active status update faild" });
  }
});

router.patch("/changeDarkMode", async (req, res) => {
  try {
    const { userId, currentDarkMode } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { darkmode: !currentDarkMode }, // field to update
      { new: true }, // return updated document
    );

    res.status(200).json({ message: "Darkmode changed", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to change darkmode" });
  }
});

export default router;
