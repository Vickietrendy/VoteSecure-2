const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("./passportConfig");
const authRoutes = require("./routes/authRoutes");
const auditRoutes = require('./routes/auditRoutes');
const voteRoutes = require('./routes/voteRoutes');
const pvcVerification = require("./pvcVerification");
const { decryptData } = require("./encryption");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Add this route to handle file uploads
app.post("/verify", upload.single("pvc"), (req, res) => {
  try {
    // Here you can process the files and perform verification
    // For now, we will just send a success response
    res.json({ success: true });
  } catch (error) {
    console.error("Error processing verification:", error);
    res.status(500).json({ success: false });
  }
});

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes here
app.use("/auth", authRoutes);
app.use('/audit', auditRoutes);
app.use('/vote', voteRoutes);
app.use("/verify-pvc", pvcVerification);

app.get("/", (req, res) => {
  res.send("VoteSecure API");
});

// Example usage of decryptData
const encryptedData = process.env.ENCRYPTED_DATA;
if (encryptedData) {
  try {
    const parsedData = JSON.parse(encryptedData);
    const decryptedData = decryptData(parsedData);
    console.log("Decrypted Data:", decryptedData);
  } catch (error) {
    console.error("Error parsing or decrypting data:", error);
  }
} else {
  console.error("No encrypted data provided");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
