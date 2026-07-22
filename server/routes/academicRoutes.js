const express =
  require("express");

const router =
  express.Router();

const Academic =
  require("../models/Academic");

const auth =
require("../middleware/auth");

router.get("/", async (req, res) => {

  const data =
    await Academic.find();

  res.json(data);

});

router.post("/", auth,async (req, res) => {

  const item =
    new Academic(req.body);

  await item.save();

  res.json(item);

});
router.delete(
  "/:id",
  auth,
  async (req, res) => {

  await Academic.findByIdAndDelete(
    req.params.id
  );

  res.json({
    success: true,
  });

});

module.exports =
  router;