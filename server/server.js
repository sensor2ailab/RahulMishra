const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,

    limit: "50mb",
  }),
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const paperRoutes = require("./routes/paperRoutes");

const speakerRoutes = require("./routes/speakerRoutes");

const teachingRoutes = require("./routes/teachingRoutes");

const projectRoutes = require("./routes/projectRoutes");

const responsibilityRoutes = require("./routes/responsibilityRoutes");

const academicRoutes = require("./routes/academicRoutes");

const contactRoutes = require("./routes/contactRoutes");

const authRoutes = require("./routes/authRoutes");

app.use("/api/papers", paperRoutes);

app.use("/api/speakers", speakerRoutes);

app.use("/api/teaching", teachingRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/responsibilities", responsibilityRoutes);

app.use("/api/academics", academicRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
