const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    category: String,

    title: String,

    mentor: String,

    duration: String,

    funding: String,

    image: String,
  },

  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
