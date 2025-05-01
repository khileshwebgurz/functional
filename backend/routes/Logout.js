const express = require("express");
const router = express.Router();

// Logout
router.post("/", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

module.exports = router;
