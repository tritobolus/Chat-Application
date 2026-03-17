import express from "express";
import User from '../../models/user.js'

const router = express.Router();

router.get("/getuser", async(req, res) => {
    const users = await  User.find();
    return res.status(200).json({message: "get all user data", users: users})
})


export default router;