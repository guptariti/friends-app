const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.get("/gamePoints", (req, res) => {
  
});

router.post("")
module.exports = router;