var mongoose = require("mongoose");

var customerSchema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  Phone: Number,
  Email: { type: String, unique: true },
  AddressLine1: String,
  AddressLine2: String,
  City: String,
  State: String,
  Country: String,
  Pincode: String,
  CreationDate: { type: Date, default: Date.now },
  CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  IsEnabled: Boolean,
});

var CustomerModel = mongoose.model("customer", customerSchema);
module.exports = CustomerModel;
