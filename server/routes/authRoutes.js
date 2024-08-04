const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Ensure this is the correct path to your User model

const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  console.dir(req.body, {depth:null});
  // User.deleteMany({})
  try {
    const existingUser = await User.findOne({ username : req.body.username });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: `${firstName} ${lastName}`,
      email: req.body.username,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).send("User registered");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Error registering user");
  }
});

// Google authentication routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/verify-identity"); // Redirect to your desired route after successful login
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("http://localhost:3000");
  });
});

// Login route
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send("Login successful");
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
