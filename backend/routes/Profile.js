const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");
const SECRET = process.env.SECRET; // move to env later
// Profile route
dotenv.config();
router.get("/", (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userData = jwt.verify(token, SECRET);
    res.json({ message: "Success", user: userData });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;