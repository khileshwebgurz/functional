const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();
const SECRET = process.env.SECRET; // move to env later
// Dummy user
const user = {
  id: 1,
  email: "test@gmail.com",
  password: bcrypt.hashSync("password123", 10), // hash password
};

// Login route
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "30m",
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true on production (HTTPS)
      sameSite: "strict",
    })
    .json({ message: "Logged in successfully" });
});

module.exports = router;
