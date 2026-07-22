const mongoose = require("mongoose");

const ResponsibilitySchema =
  new mongoose.Schema(
    {
      section: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        default: "",
      },

      content: {
        type: String,
        default: "",
      },

      image: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Responsibility",
  ResponsibilitySchema
);