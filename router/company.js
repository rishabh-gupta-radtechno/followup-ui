var express = require("express");
var auth = require("../middleware/auth");

var companyController = require("../controller/companyController.js");

var router = express.Router();

router.post("/addCompany", auth, (req, res) => {
  companyController.add_company(req, res);
});
router.post("/getCompany", auth, (req, res) => {
  companyController.getCompany(req, res);
});
router.get("/getAllCompany", auth, (req, res) => {
  companyController.getAllCompany(req, res);
});
router.post("/paginate", auth, (req, res) => {
  companyController.paginate(req, res);
});
router.post("/updateCompany", auth, (req, res) => {
  companyController.updateCompany(req, res);
});

router.get("*", (req, res) => {
  res.send("Error 404");
});
module.exports = router;
