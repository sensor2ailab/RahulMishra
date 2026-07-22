const mongoose = require("mongoose");

const AcademicSchema = new mongoose.Schema({
  section: String,

  designation: String,
  duration: String,
  department: String,
  institute: String,

  degree: String,
  year: String,

  title: String,

  achievement: String,
});

module.exports =
  mongoose.model(
    "Academic",
    AcademicSchema
  );