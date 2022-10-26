var EmailTemplateModel = require("../model/emailTemplateModel");
const errorMessage = require("../helper/errorMessage");
const constants = require("../helper/constants");

exports.add_emailTemplate = async function (req, res) {
  try {
    const { Subject, Content, Attachments, IsEnabled, CreatedBy } = req.body;
    let newEmailTemplate = new EmailTemplateModel({
      Subject: Subject,
      Content: Content,
      Attachments: Attachments,
      CreatedBy: CreatedBy,
      IsEnabled: IsEnabled,
    });

    newEmailTemplate.save();

    return res.status(201).json({
      message: constants.successMessages.create,
    });
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.getAllEmailTemplates = async function (req, res) {
  try {
    var emailTemplate = await EmailTemplateModel.find({});
    if (!emailTemplate || emailTemplate.length == 0) {
      return errorMessage(req, res, 404, "No emailTemplate found");
    } else if (emailTemplate) {
      return res.status(200).json({
        emailTemplate,
      });
    }
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.updateEmailTemplate = async function (req, res) {
  try {
    await EmailTemplateModel.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      message: constants.successMessages.update,
    });
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.deleteEmailTemplate = async function (req, res) {
  try {
    const _id = req.body._id;
    const emailTemplate = await EmailTemplateModel.findOne({
      _id,
    });

    if (!emailTemplate || emailTemplate.length == 0) {
      return errorMessage(req, res, 404, "No emailTemplate found");
    } else {
      await EmailTemplateModel.deleteOne({
        _id,
      });

      return res.status(204).json({
        message: constants.successMessages.delete,
      });
    }
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};
