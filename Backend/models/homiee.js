import mongoose, { Schema } from "mongoose";


const homieSchema = mongoose.Schema({
    sender:{
        type: String,
        required:true
    },
    msg:{
        type: String,
        required:true
    },
    reciver:{
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const HomieeModel= mongoose.model("Homie",homieSchema);

export default HomieeModel;