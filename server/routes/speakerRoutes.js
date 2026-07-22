const express = require("express");

const router = express.Router();

const Speaker = require("../models/Speaker");

const auth = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
  try {
    const {
      topic,

      venue,

      date,

      link,

      content,
    } = req.body;

    await Speaker.create({
      topic,

      venue,

      date,

      link,

      content,
    });

    res.status(200).json({
      success: true,

      message: "Added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const speakers = await Speaker.find().sort({
    createdAt: -1,
  });

  res.json(speakers);
});

router.delete("/:id", auth, async (req, res) => {
  await Speaker.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
  });
});

module.exports = router;
