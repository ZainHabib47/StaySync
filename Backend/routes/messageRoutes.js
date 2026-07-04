import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessages,
} from "../controller/messageController.js";

const router = express.Router();

// Send a message
router.post("/", authMiddleware, sendMessage);

// Get conversation with a specific friend
router.get("/:friendId", authMiddleware, getMessages);

export default router;