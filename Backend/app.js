import Homiee from "./models/homiee.js";
import User from "./models/signup.js"
import connection from "./models/databaseConnection.js"
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
import friendRoutes from "./routes/friendRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import http from "http"
import { Server } from "socket.io";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.set("io", io);

app.use("/api/auth",authRoutes)
app.use("/api/friends",friendRoutes)
app.use("/api/messages", messageRoutes);

connection();


app.post("/api/messages", async (req, res) => {
  try {
    const { sender, msg, reciver } = req.body;

    const data = new Homiee({
      sender,
      msg,
      reciver
    });

    await data.save();
    console.log("Message stored successfully");
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/showAllMessages",async (req,res)=>{
  try{
    const allMessages = await Homiee.find();
    res.status(200).json({
      success:true,
      data:allMessages
    })
  }
  catch(error){
    res.send(500).json({
      success:false,
      data:error.message
    })
  }
})


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // user joins their personal room
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on 5000");
});