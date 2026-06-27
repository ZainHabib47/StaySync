import Homiee from "./models/homiee.js";
import User from "./models/signup.js"
import connection from "./models/databaseConnection.js"
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"



const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes)

dotenv.config();
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

app.listen(5000, () => console.log("Backend running on port 5000"));