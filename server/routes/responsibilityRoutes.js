const express = require("express");

const router = express.Router();

const Responsibility = require("../models/Responsibility");

const auth = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
  try {
    const responsibility = new Responsibility({
      section: req.body.section,

      title: req.body.title,

      content: req.body.content,

      image: req.body.image,
    });

    await responsibility.save();

    res.json({
      success: true,
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
    const data = await Responsibility.find();

    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Responsibility.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;
