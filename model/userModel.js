var mongoose = require("mongoose");
const Joi = require("joi");

var userSchema = mongoose.Schema({
  UserName: { type: String, unique: true },
  FirstName: String,
  LastName: String,
  Password: String,
  IsEnabled: Boolean,
  CreationDate: { type: Date, default: Date.now },

  RoleId: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
  CompanyId: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
  token: String,
});

var UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
