const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const Admin = require("../models/Admin");

const router = express.Router();

const ADMIN_EMAIL = "amitkhuntia14@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Only Admin Email Allowed",
      });
    }

    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(400).json({
        message: "Admin Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    admin.otp = otp;

    admin.otpExpiry = Date.now() + 10 * 60 * 1000;

    await admin.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject: "Admin Login OTP",

      html: `
    <h2>Admin Login OTP</h2>

    <h1>${otp}</h1>

    <p>
      Valid for 10 minutes
    </p>
  `,
    });

    res.json({
      success: true,

      otpSent: true,

      message: "OTP Sent Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Only Admin Email Allowed",
      });
    }

    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(400).json({
        message: "Email Not Registered",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,

      lowerCaseAlphabets: false,

      specialChars: false,
    });

    admin.otp = otp;

    admin.otpExpiry = Date.now() + 10 * 60 * 1000;

    await admin.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject: "Password Reset OTP",

      html: `

          <h2>Password Reset</h2>

          <p>Your OTP is:</p>

          <h1>${otp}</h1>

          <p>
            Valid for 10 minutes.
          </p>

        `,
    });

    res.json({
      success: true,

      message: "OTP Sent Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Only Admin Email Allowed",
      });
    }

    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(400).json({
        message: "Admin Not Found",
      });
    }

    if (admin.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (admin.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    admin.otp = "";

    admin.otpExpiry = null;

    await admin.save();

    res.json({
      success: true,

      token,

      admin: {
        id: admin._id,

        name: admin.name,

        email: admin.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Only Admin Email Allowed",
      });
    }

    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(400).json({
        message: "Admin Not Found",
      });
    }

    if (admin.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (admin.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    admin.otp = "";

    admin.otpExpiry = null;

    await admin.save();

    res.json({
      success: true,

      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
