const otplib = require("otplib");

const secret = otplib.authenticator.generateSecret(); // Example secret for john_doe
const token = otplib.authenticator.generate(secret);

console.log(`Generated TOTP token: ${token}`, `for secret: ${secret}`);
