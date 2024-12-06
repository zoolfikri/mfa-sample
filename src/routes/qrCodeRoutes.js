const express = require("express");
const QRCode = require("qrcode");
const otplib = require("otplib");
const users = require("./../users"); // Import users

const router = express.Router();

const setQRCodeRoutes = (app) => {
  router.get("/qrcode/:username", async (req, res) => {
    const { username } = req.params;
    const user = users[username];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otpauth = otplib.authenticator.keyuri(
      username,
      "Web Console",
      user.secret
    );
    try {
      const url = await QRCode.toDataURL(otpauth);
      res.setHeader("Content-Type", "image/png");
      const img = Buffer.from(url.split(",")[1], "base64");
      res.send(img);
    } catch (err) {
      res.status(500).send("Error generating QR code");
    }
  });

  app.use("/api", router);
};

module.exports = {
  setQRCodeRoutes,
};
