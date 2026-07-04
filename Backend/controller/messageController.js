import Message from "../models/message.js";

// ============================
// Send Message
// ============================

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, message } = req.body;

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    // 🔥 SOCKET EMIT (REAL TIME PART)
    const io = req.app.get("io");

    io.to(receiverId).emit("newMessage", newMessage);
    io.to(senderId).emit("newMessage", newMessage);

    res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ============================
// Get Conversation
// ============================

export const getMessages = async (req, res) => {
  try {
    const myId = req.user.id;
    const { friendId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          sender: myId,
          receiver: friendId,
        },
        {
          sender: friendId,
          receiver: myId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};