var express = require("express");
var auth = require("../middleware/auth");

var roleController = require("../controller/roleController.js");

var router = express.Router();

router.post("/addRole", auth, (req, res) => {
  roleController.add_role(req, res);
});

router.get("*", (req, res) => {
  res.send("Error 404");
});
module.exports = router;
