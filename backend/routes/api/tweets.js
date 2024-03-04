const express = require("express");
const { asyncHandler } = require("../../utils");

const router = express.Router();
const db = require("../../db/models");

const { Tweet } = db;

router.use(express.json());

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { message } = req.body;
    const tweet = await Tweet.create({ message });
    res.json(tweet);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll();
    res.json(tweets);
  })
);

module.exports = router;
