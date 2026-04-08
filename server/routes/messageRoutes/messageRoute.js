import express from "express";
import Message from "../../models/message.js";
const router = express.Router();

router.post("/sendPrivateMessage", async (req, res) => {
  try {
    const { senderId, receiverId, message, messageType, isMedia, isAudio } = req.body;
    const responce = await Message.create({
      senderId,
      receiverId,
      message,
      messageType,
      isMedia,
      isAudio
    });

    return res.status(200).json({ message: "message sent", responce });
  } catch (error) {
    console.log(error);
  }
});
router.post("/sendGroupMessage", async (req, res) => {
  try {
    const { senderId, groupId, message, messageType, isMedia, isAudio } = req.body;
    const responce = await Message.create({
      senderId,
      groupId,
      message,
      messageType,
      isMedia,
      isAudio
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

router.get("/getGroupMessages", async (req, res) => {
  try {
    const { groupId } = req.query;
    const messages = await Message.find({
      groupId: groupId,
    }).sort({ createdAt: 1 });

    return res.status(200).json({ message: "get all messages", messages });
  } catch (error) {
    consoel.log(error);
  }
});

export default router;
