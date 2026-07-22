const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
  {
    category: String,

    inputType: String,

    content: String,

    formattedText: String,

    image: String,
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.models.Paper || mongoose.model("Paper", paperSchema);
