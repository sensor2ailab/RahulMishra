const express = require("express");

const router = express.Router();

const Paper = require("../models/Paper");

const auth = require("../middleware/auth");

const formatBibtex = (bibtex) => {
  try {
    const title = bibtex.match(/title=\{(.+?)\}/i)?.[1] || "";

    const author = bibtex.match(/author=\{(.+?)\}/i)?.[1] || "";

    const journal = bibtex.match(/journal=\{(.+?)\}/i)?.[1] || "";

    const year = bibtex.match(/year=\{(.+?)\}/i)?.[1] || "";

    return `${author}. "${title}" ${journal}, ${year}.`;
  } catch (error) {
    return bibtex;
  }
};

router.post("/add", auth, async (req, res) => {
  try {
    const {
      category,

      inputType,

      content,

      link,

      image,
    } = req.body;

    if (!category || !inputType || !content) {
      return res.status(400).json({
        success: false,

        message: "All fields required",
      });
    }

    let formattedText = content;

    if (category === "journal" && inputType === "bibtex") {
      formattedText = formatBibtex(content);
    }

    const paper = await Paper.create({
      category,

      inputType,

      content,

      formattedText,

      link,

      image,
    });

    res.status(200).json({
      success: true,

      message: "Paper Added Successfully",

      paper,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const papers = await Paper.find().sort({
      createdAt: -1,
    });

    res.json(papers);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Paper.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
