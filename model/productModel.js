var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  ProductName: String,
  ProductDescription: String,
  Attachments: String,
  IsEnabled: Boolean,
  CreationDate: { type: Date, default: Date.now },
  CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

var ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
