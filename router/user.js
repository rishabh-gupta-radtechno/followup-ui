var express = require("express");
const { celebrate, Joi, errors, Segments } = require("celebrate");
var userController = require("../controller/userController.js");
var auth = require("../middleware/auth");

var router = express.Router();

router.post(
  "/addUser",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      FirstName: Joi.string().required(),
      LastName: Joi.string().required(),
      UserName: Joi.string().required(),
      Password: Joi.string().required(),
    }),
  }),
  (req, res) => {
    userController.add_user(req, res);
  }
);
router.post("/loginUser", (req, res) => {
  userController.login(req, res);
});
router.post("/changePassword", auth, (req, res) => {
  userController.changePassword(req, res);
});
router.post("/getUser", auth, (req, res) => {
  userController.getUser(req, res);
});


router.get("*", (req, res) => {
  res.send("Error 404");
});
module.exports = router;
