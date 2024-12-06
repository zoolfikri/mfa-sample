// qrCodeController.js

// Import the necessary libraries
const otplib = require('otplib');

// Function to generate QR code
exports.generateQRCode = (req, res) => {
  try {
    // Generate a secret key for TOTP
    const secret = otplib.authenticator.generateSecret();

    // Generate a QR code URL using the secret key
    const qrCodeUrl = otplib.authenticator.keyuri('user', 'my-app', secret);

    // Return the QR code URL as the response
    res.json({ qrCodeUrl });
  } catch (error) {
    // Handle any errors that occur during QR code generation
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};