const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 m
  max: 100, // 100 req
  message: "Too many requests, please try again later.",
});
