// getting-started.js
import mongoose from "mongoose"
import HomieeModel from "./homiee.js";
import dotenv from "dotenv"

dotenv.config();

async function main(){
    await mongoose.connect(process.env.MONGODB_URL)
}

main().then(async()=>{
    console.log("Hogya connection complete")

    const doc=new HomieeModel({
        "sender":"Zain Habib",
        "message":"This is zain from MERN Stack Developer",
        "reciver":"Habibi"
    })

    await doc.save().then(()=>{console.log("Muabrakaaa")});
}).catch((error)=>{console.log(error)})