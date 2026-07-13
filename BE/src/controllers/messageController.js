const Message = require("../models/Message");
const { getIO } = require("../socket/io");

const getMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [
      {
        sender: req.user._id,
        receiver: req.params.userId,
      },
      {
        sender: req.params.userId,
        receiver: req.user._id,
      },
    ],
  })
    .populate("sender", "username avatar")
    .populate("receiver", "username avatar")
    .sort({ createdAt: 1 });

  res.json(messages);
};

const readMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    await Message.updateMany(
      {
        sender: userId,
        receiver: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
      },
    );
    const io = getIO();

    io.to(userId).emit("messagesRead", {
      by: req.user._id,
    });
    
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { getMessages, readMessages };
