import express from "express";
import Group from "../../models/group.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { groupName, adminId, members } = req.body;
    console.log("groupdata", groupName, adminId, members);

    await Group.create({
      groupName,
      adminId,
      members,
    });
    res.status(200).json({ messge: "Group created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getGroups", async (req, res) => {
  try {
    const groupdata = await Group.find();
    res.status(200).json({ messge: "Group data received", groupdata });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
