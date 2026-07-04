import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessages,
} from "../controller/messageController.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);

router.get("/:friendId", authMiddleware, getMessages);

export default router;