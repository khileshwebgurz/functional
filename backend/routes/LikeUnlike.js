const express = require("express");
// this mergeParams: true is used to get params from its parent component
// as we need in this case for getting id from req.params which is present in 
// parent file.
const router = express.Router({ mergeParams: true });
const Like = require("../models/Likes");

router.post("/", async (req, res) => {
  const { id } = req.params;
  const ip = req.clientIp;

  const existing = await Like.findOne({ postId: id, ip });
  if (existing) {
    return res.status(200).json({ message: "Already liked" });
  }
  await Like.create({ postId: id, ip });
  res.status(201).json({ message: "Liked" });
});

router.delete("/", async (req, res) => {
  try {
    const ip = req.ip;
    const postId = req.params.id;
    await Like.findOneAndDelete({ postId, ip });
    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unlike post" });
  }
});

module.exports = router;