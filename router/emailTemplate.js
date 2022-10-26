var express = require("express");
var auth = require("../middleware/auth");

var emailTemplateController = require("../controller/emailTemplateController.js");

var router = express.Router();

router.post("/addEmailTemplate", auth, (req, res) => {
  emailTemplateController.add_emailTemplate(req, res);
});
router.post("/getAllEmailTemplates", auth, (req, res) => {
  emailTemplateController.getAllEmailTemplates(req, res);
});
router.post("/updateEmailTemplate", auth, (req, res) => {
  emailTemplateController.updateEmailTemplate(req, res);
});
router.post("/deleteEmailTemplate", auth, (req, res) => {
  emailTemplateController.deleteEmailTemplate(req, res);
});

router.get("*", (req, res) => {
  res.send("Error 404");
});
module.exports = router;
