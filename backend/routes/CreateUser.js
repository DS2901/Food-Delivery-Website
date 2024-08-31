const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const jwtSecret = "myNameisDeveshSharmaPinkySharmaa";

router.post(
  "/creatuser",
  body("email", "incorrect Email").isEmail(),
  body("name", "incorrect Name").isLength({ min: 5 }),
  body("password", "incorrect password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let securepassword = await bcrypt.hash(req.body.password, salt);

    try {
      const newUser = await User.create({
        name: req.body.name,
        password: securepassword,
        email: req.body.email.toLowerCase(),
        location: req.body.location,
      });

      return res.json({
        success: true,
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  }
);

router.post(
  "/loginuser",
  body("email", "incorrect Email").isEmail(),
  body("password", "incorrect password").isLength({ min: 5 }),
  async (req, res) => {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let useremail = await User.findOne({ email: email.toLowerCase() }); 
    
      if (!useremail) {
        console.log(`User with email ${email} not found.`);
        return res.status(400).json({ success: false, message: "User not found" });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        useremail.password
      );

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      const data = {
        user: {
          id: useremail.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      console.log(authToken);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;
