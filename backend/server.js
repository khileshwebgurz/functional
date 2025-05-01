const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const LoginRoutes = require("./routes/Login");
const LogoutRoute = require("./routes/Logout");
const ProfileRoute = require("./routes/Profile");
const Like = require("./models/Likes");
const Bookmark = require("./models/Bookmark");
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

mongoose
  .connect("mongodb://localhost:27017/socialDB")
  .then(() => console.log("Mongodb connected"));

// get IP middleware
app.set("trust proxy", true);
app.use((req, res, next) => {
  req.clientIp = req.ip || req.headers["x-forwarded-for"];
  next();
});

// Like a post
app.post("/api/posts/:id/like", async (req, res) => {
  const { id } = req.params;
  const ip = req.clientIp;

  const existing = await Like.findOne({ postId: id, ip });
  if (existing) {
    return res.status(200).json({ message: "Already liked" });
  }
  await Like.create({ postId: id, ip });
  res.status(201).json({ message: "Liked" });
});

// unlike a post
app.delete("/api/posts/:id/unlike", async (req, res) => {
  try {
    const ip = req.ip;
    const postId = req.params.postId;

    await Like.findOneAndDelete({ postId, ip });
    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unlike post" });
  }
});

// Bookmark a post
app.post("/api/posts/:id/bookmark", async (req, res) => {
  const { id } = req.params;
  const ip = req.clientIp;

  const existing = await Bookmark.findOne({ postId: id, ip });
  if (existing) {
    return res.status(200).json({ message: "Already bookmarked" });
  }

  await Bookmark.create({ postId: id, ip });
  res.status(201).json({ message: "Bookmarked" });
});

// unbookmark a post
app.delete("/api/posts/:id/unbookmark", async (req, res) => {
  try {
    const ip = req.ip;
    const postId = req.params.postId;

    await Bookmark.findOneAndDelete({ postId, ip });
    res.status(200).json({ message: "Post unbookmarked" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unbookmark post" });
  }
});

// Check like/bookmark status
app.get("/api/posts/:id/status", async (req, res) => {
  const { id } = req.params;
  const ip = req.clientIp;

  const liked = await Like.exists({ postId: id, ip });
  const bookmarked = await Bookmark.exists({ postId: id, ip });

  res.json({ liked: !!liked, bookmarked: !!bookmarked });
});

app.use("/", LoginRoutes);
app.use("/logout", LogoutRoute);
app.use("/profile", ProfileRoute);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
