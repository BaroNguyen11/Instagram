const Message = require("../models/Message");

const users = new Map();

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      users.set(userId, socket.id);
      socket.join(userId);
    });
    socket.on("sendMessage", async ({ sender, receiver, text }) => {
      const message = await Message.create({
        sender,
        receiver,
        text,
      });

      const fullMessage = await Message.findById(message._id)
        .populate("sender", "username avatar")
        .populate("receiver", "username avatar");

      io.to(sender).emit("newMessage", fullMessage);

      io.to(receiver).emit("newMessage", fullMessage);
    });
   
    socket.on("disconnect", () => {
      for (const [userId, socketId] of users) {
        if (socketId === socket.id) {
          users.delete(userId);
          break;
        }
      }
    });
  });
};
