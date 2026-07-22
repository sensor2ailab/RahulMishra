const express = require("express");

const router = express.Router();

const Project = require("../models/Project");

const auth = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
  try {
    const {
      category,

      title,

      mentor,

      duration,

      funding,

      image,
    } = req.body;

    const project = await Project.create({
      category,

      title,

      mentor,

      duration,

      funding,

      image,
    });

    res.json({
      success: true,

      project,
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
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
