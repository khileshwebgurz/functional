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
const LikeRoute = require("./routes/LikeUnlike");
const BookMarkRoute = require("./routes/BookmarkUnbookmark");
const StatusRoute = require("./routes/Status");
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5174", credentials: true }));

mongoose
  .connect("mongodb://localhost:27017/socialDB")
  .then(() => console.log("Mongodb connected"));

// get IP middleware
app.set("trust proxy", true);
app.use((req, res, next) => {
  req.clientIp = req.ip || req.headers["x-forwarded-for"];
  next();
});

// like middleware
app.use("/api/posts/:id/like", LikeRoute);

// bookmark middleware
app.use("/api/posts/:id/bookmark", BookMarkRoute);

// Check like/bookmark status
app.use("/api/posts/:id/status", StatusRoute);

app.use("/", LoginRoutes);
app.use("/logout", LogoutRoute);
app.use("/profile", ProfileRoute);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
