const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const task = await Task.create({
    title,
    description,
    user: req.user,
  });

  res.json(task);
});


router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user,
  });

  res.json(task);
});

router.patch("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user,
    },
    req.body,
    { new: true }
  );

  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user,
  });

  res.json({
    message: "Deleted",
  });
});

module.exports = router;