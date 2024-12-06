// totpController.js

// Import the otplib library
const otplib = require('otplib');

// Function to handle the API for verifying TOTP codes
exports.verifyTOTPCode = (req, res) => {
  const { code, secret } = req.body;

  try {
    // Verify the TOTP code
    const isValid = otplib.authenticator.check(code, secret);

    if (isValid) {
      res.status(200).json({ message: 'TOTP code is valid' });
    } else {
      res.status(400).json({ message: 'Invalid TOTP code' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};