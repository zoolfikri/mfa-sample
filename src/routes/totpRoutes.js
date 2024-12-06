const express = require("express");
const otplib = require("otplib");
const axios = require("axios");
const users = require("./../users"); // Import users

const router = express.Router();

const setTOTPRoutes = (app) => {
  router.post("/totp/verify", async (req, res) => {
    const { username, token } = req.body;
    const user = users[username];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValid = otplib.authenticator.check(token, user.secret);

    if (isValid) {
      try {
        const response = await axios.post(
          "https://api-leona-beta.modakita.com/api/cms/login",
          {
            main_dealer_id: 4,
            email: "astra@mokita.id",
            password: "123456MD",
          },
          {
            headers: {
              "sec-ch-ua-platform": '"macOS"',
              Referer: "https://leona-beta.modakita.com/",
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
              Accept: "application/json, text/plain, */*",
              "sec-ch-ua":
                '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
              "Content-Type": "application/json",
              "sec-ch-ua-mobile": "?0",
            },
          }
        );

        res.json(response.data);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error making API request", error: error.message });
      }
    } else {
      res.status(400).json({ message: "Invalid TOTP" });
    }
  });

  app.use("/api", router);
};

module.exports = {
  setTOTPRoutes,
};
