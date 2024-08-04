// server/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ message: "Logged in successfully" });
    });
  })(req, res, next);
};

exports.googleAuth = (req, res) => {
  // Google authentication logic here
};
