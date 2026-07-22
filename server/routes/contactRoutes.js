const express = require("express");
const router = express.Router();

const ContactInfo = require("../models/ContactInfo");

const Message = require("../models/Message");

const nodemailer = require("nodemailer");

const auth = require("../middleware/auth");

router.get("/info", async (req, res) => {
  const data = await ContactInfo.find();

  res.json(data);
});

router.post("/info", auth, async (req, res) => {
  const item = new ContactInfo(req.body);

  await item.save();

  res.json(item);
});

router.delete("/info/:id", auth, async (req, res) => {
  await ContactInfo.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
  });
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,

      to: process.env.EMAIL_USER,

      subject: "New Contact Form Message",

      html: `
        <h2>New Message</h2>

        <p>
          <b>Name:</b>
          ${name}
        </p>

        <p>
          <b>Email:</b>
          ${email}
        </p>

        <p>
          <b>Message:</b>
          ${message}
        </p>
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Error sending message",
    });
  }
});

router.get("/messages", auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.json(messages);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error",
    });
  }
});

router.delete("/messages/:id", auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;
