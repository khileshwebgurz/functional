const express = require("express");
const router = express.Router({ mergeParams: true });
const Bookmark = require("../models/Bookmark");

router.post("/", async (req, res) => {
  const { id } = req.params;
  const ip = req.clientIp;

  const existing = await Bookmark.findOne({ postId: id, ip });
  if (existing) {
    return res.status(200).json({ message: "Already bookmarked" });
  }

  await Bookmark.create({ postId: id, ip });
  res.status(201).json({ message: "Bookmarked" });
});

router.delete("/", async (req, res) => {
  try {
    const ip = req.ip;
    const postId = req.params.id;

    await Bookmark.findOneAndDelete({ postId, ip });
    res.status(200).json({ message: "Post unbookmarked" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unbookmark post" });
  }
});


module.exports = router;