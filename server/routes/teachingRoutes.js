const express = require("express");

const router = express.Router();

const Teaching = require("../models/Teaching");

const auth = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
  try {
    const {
      title,

      duration,

      institute,
    } = req.body;

    const teaching = await Teaching.create({
      title,

      duration,

      institute,
    });

    res.json({
      success: true,

      teaching,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const teaching = await Teaching.find().sort({
      createdAt: -1,
    });

    res.json(teaching);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Teaching.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
