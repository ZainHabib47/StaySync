import Homiee from "./models/homiee.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv"


const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const connector = async () => {
  const connection = await mongoose.connect(
    process.env.MONGODB_URL,
  );
  console.log("Connection Successfull to the Database");
};

connector();

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