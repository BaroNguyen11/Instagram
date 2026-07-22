require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { initIO } = require("./socket/io");
const socketHandler = require("./socket/socket"); // thêm

const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationsRoutes = require("./routes/notificationRoute");
const messageRoutes = require("./routes/messageRoutes");
const storyRoutes = require("./routes/storyRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

connectDB();

app.use(cors());

app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/messages", messageRoutes);
app.use("/stories", storyRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ message: "File is too large. Maximum size allowed is 10MB." });
  }

  if (err.message && err.message.includes("Invalid file type")) {
    return res.status(400).json({ message: err.message });
  }

  return res
    .status(500)
    .json({ message: err.message || "Internal Server Error" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
initIO(io);
socketHandler(io);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
