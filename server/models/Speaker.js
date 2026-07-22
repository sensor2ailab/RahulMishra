const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema(
  {
    topic: String,

    venue: String,

    date: String,

    link: String,

    content: String,
  },

  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.Speaker || mongoose.model("Speaker", speakerSchema);
