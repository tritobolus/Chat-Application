import express from "express";
import Message from "../../models/message.js";
const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const responce = await Message.create({
      senderId,
      receiverId,
      message,
    });

    return res.status(200).json({ message: "message sent", responce });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getmessages", async (req, res) => {
  try {
    const { userA, userB } = req.query;
    const messages = await Message.find({
      $or: [
        { senderId: userA, receiverId: userB },
        { senderId: userB, receiverId: userA },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({ message: "get all messages", messages });
  } catch (error) {
    consoel.log(error);
  }
});

export default router;
