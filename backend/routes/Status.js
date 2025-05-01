const express = require("express");
const router = express.Router({ mergeParams: true });
const Like = require("../models/Likes");
const Bookmark = require("../models/Bookmark")

router.get("/", async (req, res) => {
  const { id } = req.params;
  const ip = req.clientIp;

  const liked = await Like.exists({ postId: id, ip });
  const bookmarked = await Bookmark.exists({ postId: id, ip });

  res.json({ liked: !!liked, bookmarked: !!bookmarked });
});

module.exports = router;