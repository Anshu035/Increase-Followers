const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { userid, password } = req.body;

    const existingUser = await User.findOne({ userid });
    if (existingUser) return res.status(400).json({ msg: "User ID already exists" });

    const newUser = new User({ userid, password });
    await newUser.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { userid, password } = req.body;
    const user = await User.findOne({ userid });

    if (!user) return res.status(400).json({ msg: "Invalid User ID" });

  
    if (user.password !== password)
      return res.status(400).json({ msg: "Invalid Password" });

    res.json({ msg: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
