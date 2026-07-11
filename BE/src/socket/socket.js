const users = new Map();

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      users.set(userId, socket.id);
      socket.join(userId);
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
