import User from "../models/signup.js";
import FriendCollection from "../models/friendCollection.js";



export const addFriend = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Logged-in user id (comes from JWT middleware)
    const myId = req.user.id;

    // Find user by phone number
    const friend = await User.findOne({ phoneNumber });

    if (!friend) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent adding yourself
    if (friend._id.toString() === myId) {
      return res.status(400).json({
        success: false,
        message: "You cannot add yourself.",
      });
    }

    // Check if already friends
    const alreadyFriend = await FriendCollection.findOne({
      user: myId,
      friend: friend._id,
    });

    if (alreadyFriend) {
      return res.status(400).json({
        success: false,
        message: "Friend already added.",
      });
    }

    // Save friendship
    await FriendCollection.create({
      user: myId,
      friend: friend._id,
    });

    res.status(201).json({
      success: true,
      message: "Friend added successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getFriends = async (req, res) => {
  try {
    const myId = req.user.id;

    const friends = await FriendCollection.find({
      user: myId,
    }).populate(
      "friend",
      "username phoneNumber email"
    );

    res.status(200).json({
      success: true,
      friends,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const removeFriend = async (req, res) => {
  try {
    const myId = req.user.id;

    const { friendId } = req.params;

    await FriendCollection.findOneAndDelete({
      user: myId,
      friend: friendId,
    });

    res.status(200).json({
      success: true,
      message: "Friend removed successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};