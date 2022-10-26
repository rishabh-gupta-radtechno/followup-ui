// const { string } = require('joi');
var mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');

var companySchema = mongoose.Schema({
  Name: String,
  Logo: String,
  Email: { type: String, unique: true },
  Phone1: Number,
  Phone2: Number,
  Fax: String,
  SkypeId: String,
  Whatsapp: String,
  TelegramId: String,
  TwitterHandle: String,
  AddressLine1: String,
  AddressLine2: String,
  Country: String,
  State: String,
  City: String,
  Pincode: Number,
  ContactPerson1: Number,
  ContactPerson2: Number,
});

var CompanyModel = mongoose.model("company", companySchema);
module.exports = CompanyModel;
