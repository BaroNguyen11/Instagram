let io;

const initIO = (socketIO) => {
  io = socketIO;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io chưa được khởi tạo");
  }
  return io;
};
module.exports = {
  initIO,
  getIO,
};
