const mongoose = require("mongoose");

const teachingSchema = new mongoose.Schema(
  {
    title: String,

    duration: String,

    institute: String,
  },

  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.Teaching || mongoose.model("Teaching", teachingSchema);
