const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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

    try {
      const newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      });

      // If user creation is successful, return a success message
      return res.json({ success: true, message: "User created successfully", user: newUser });
    } catch (error) {
      // Log the error and return a failure response
      console.error("Error creating user:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
