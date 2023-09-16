const express = require("express");
// const Recipe = require("./recipe-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
