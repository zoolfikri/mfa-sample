const express = require("express");
const cors = require("cors"); // Import cors
const qrCodeRoutes = require("./routes/qrCodeRoutes");
const totpRoutes = require("./routes/totpRoutes");
const otplib = require("otplib");
const users = require("./users"); // Import users

const app = express();
const port = process.env.PORT || 3001;

// Middleware setup
app.use(cors()); // Use cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user && user.password === password) {
    if (user.secret) {
      // Generate OTP
      const token = otplib.authenticator.generate(user.secret);

      console.log("token", token);
      // Send OTP to user (for demonstration, we'll just return it in the response)
      res.json({
        message: "Login successful, please verify OTP",
        token,
        secret: user.secret,
      });
    } else {
      res.json({
        message: "Login successful",
      });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Set up routes
qrCodeRoutes.setQRCodeRoutes(app);
totpRoutes.setTOTPRoutes(app);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
