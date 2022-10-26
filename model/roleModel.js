// const { string } = require('joi');
var mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');

var roleSchema = mongoose.Schema({
  RoleName: String,
  IsEnabled: Boolean,
});

var RoleModel = mongoose.model("role", roleSchema);
module.exports = RoleModel;
