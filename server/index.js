import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import getUser from "./routes/userRoutes/userRoute.js";
import authRoutes from "./routes/authRoutes/authRoute.js";
import messageRoutes from "./routes/messageRoutes/messageRoute.js";
import socketHandler from "./socket/socket.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

connectDB();

//soket connetion with cors configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// pass io to socket file
socketHandler(io);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use("/authentication", authRoutes);
app.use("/message", messageRoutes);
app.use("/user", getUser);

server.listen(8000, () => console.log("Server is runing..."));
