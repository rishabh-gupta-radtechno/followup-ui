var express = require("express");
var auth = require("../middleware/auth");
const { celebrate, Joi, errors, Segments } = require("celebrate");

var customerController = require("../controller/customerController.js");

var router = express.Router();

router.post(
  "/addCustomer",
  celebrate({
    body: Joi.object().keys({
      FirstName: Joi.string().required().messages({
        "string.base": `FirstName should be a type of 'text'`,
        "any.required": `FirstName is a required field`,
      }),
      LastName: Joi.string().allow(''),
      Phone: Joi.string()
        .length(10)
        .regex(/^[0-9]{10}$/)
        .required()
        .messages({
          "any.required": `Phone is a required field`,
          "string.length": `Phone length should be 10 digits`,
          "string.pattern.base": "only degits are allowed",
        }),
      Email: Joi.string().email().required().messages({
        "string.base": `Email should be a type of 'text'`,
        "any.required": `Email is a required field`,
        "string.email": `Email should be valid field`,
      }),
      AddressLine1: Joi.string().required().messages({
        "string.base": `AddressLine1 should be a type of 'text'`,
        "any.required": `AddressLine1 is a required field`,
      }),
      AddressLine2: Joi.string().allow(''),

      City: Joi.string().required(),
      State: Joi.string().required(),
      Country: Joi.string().required(),
      Pincode: Joi.string().pattern(/^\d+$/).length(6).required().messages({
        "string.pattern.base": "only degits are allowed",
      }),
      CreatedBy: Joi.string().required(),
      IsEnabled: Joi.boolean().required(),
    }),
  }),
  auth,
  (req, res) => {
    customerController.add_customer(req, res);
  }
);

router.post("/getAllCustomers", auth, (req, res) => {
  customerController.getAllCustomers(req, res);
});
router.post(
  "/updateCustomer",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().required(),
      FirstName: Joi.string(),
      Phone: Joi.string()
        .length(10)
        .regex(/^[0-9]{10}$/),
      Email: Joi.string().email(),
      AddressLine1: Joi.string(),
      City: Joi.string(),
      State: Joi.string(),
      Country: Joi.string(),
      Pincode: Joi.string(),
      CreatedBy: Joi.string(),
      IsEnabled: Joi.boolean(),
    }),
  }),
  auth,
  (req, res) => {
    customerController.updateCustomer(req, res);
  }
);
router.post(
  "/deleteCustomer",
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
    customerController.deleteCustomer(req, res);
  }
);

router.get("*", (req, res) => {
  res.send("Error 404");
});
module.exports = router;
