const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      default: "",
    },

    otpExpiry: {
      type: Date,
    },

    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Admin", AdminSchema);
