var mongoose = require("mongoose");

var emailTemplateSchema = mongoose.Schema({
  Subject: String,
  Content: String,
  Attachments: String,
  IsEnabled: Boolean,
  CreationDate: { type: Date, default: Date.now },
  CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

var EmailTemplateModel = mongoose.model("emailTemplate", emailTemplateSchema);
module.exports = EmailTemplateModel;
