const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const rateLimit = require("express-rate-limit");

const Admin = require("../models/Admin");

const router = express.Router();

const ADMIN_EMAIL = "rahul_mishra@iitp.ac.in";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5, // maximum 5 requests

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/login", loginLimiter, async (req, res) => {
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

router.post("/forgot-password", loginLimiter, async (req, res) => {
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

router.post(
  "/verify-otp",
  loginLimiter,
  async (req, res) => {
    try {
      const { email, otp } = req.body;

      if (email !== ADMIN_EMAIL) {
        return res.status(401).json({
          success: false,
          message: "Only Admin Email Allowed",
        });
      }

      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({
          success: false,
          message: "Admin Not Found",
        });
      }

      if (!admin.otp) {
        return res.status(400).json({
          success: false,
          message: "Please request OTP first",
        });
      }

      if (admin.otp !== otp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      if (admin.otpExpiry < Date.now()) {
        return res.status(400).json({
          success: false,
          message: "OTP Expired",
        });
      }

      const token = jwt.sign(
        {
          id: admin._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
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
        success: false,
        message: "Server Error",
      });
    }
  }
);

router.post(
  "/reset-password",
  loginLimiter,
  async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;

      if (email !== ADMIN_EMAIL) {
        return res.status(401).json({
          success: false,
          message: "Only Admin Email Allowed",
        });
      }

      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({
          success: false,
          message: "Admin Not Found",
        });
      }

      if (!admin.otp) {
        return res.status(400).json({
          success: false,
          message: "Please request OTP first",
        });
      }

      if (admin.otp !== otp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      if (admin.otpExpiry < Date.now()) {
        return res.status(400).json({
          success: false,
          message: "OTP Expired",
        });
      }

      const hashedPassword = await bcrypt.hash(
        newPassword,
        10
      );

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
        success: false,
        message: "Server Error",
      });
    }
  }
);

module.exports = router;
