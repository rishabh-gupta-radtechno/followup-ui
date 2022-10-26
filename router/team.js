var express = require("express");
const { celebrate, Joi, errors, Segments } = require("celebrate");
var auth = require("../middleware/auth");

var teamController = require("../controller/teamController.js");

var router = express.Router();

router.post(
  "/addTeam",
  celebrate({
    body: Joi.object().keys({
      TeamLead: Joi.string().required().messages({
        "string.base": `"TeamLead" should be a type of 'text'`,
        "any.required": `"TeamLead" is a required field`,
      }),
      TeamMember: Joi.string().required().messages({
        "string.base": `"TeamMember" should be a type of 'text'`,
        "any.required": `"TeamMember" is a required field`,
      }),
      AssignedBy: Joi.string().required().messages({
        "string.base": `"AssignedBy" should be a type of 'text'`,
        "any.required": `"AssignedBy" is a required field`,
      }),
    }),
  }),
  auth,
  (req, res) => {
    teamController.add_team(req, res);
  }
);

router.post("/getAllTeams", auth, (req, res) => {
  teamController.getAllTeams(req, res);
});

router.post(
  "/updateTeam",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().required().messages({
        "string.base": `"_id" should be a type of 'text'`,
        "any.required": `"_id" is a required field`,
      }),
    }),
  }),
  auth,
  (req, res) => {
    teamController.updateTeam(req, res);
  }
);

router.post(
  "/deleteTeam",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().required().messages({
        "string.base": `"_id" should be a type of 'text'`,
        "any.required": `"_id" is a required field`,
      }),
    }),
  }),
  auth,
  (req, res) => {
    teamController.deleteTeam(req, res);
  }
);

router.get("*", (req, res) => {
  res.send("Error 404");
});
module.exports = router;
