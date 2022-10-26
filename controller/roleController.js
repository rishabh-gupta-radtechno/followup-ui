var RoleModel = require("../model/roleModel");
const constants = require("../helper/constants");

exports.add_role = async function (req, res) {
  try {
    const { RoleName, IsEnabled } = req.body;
    let newRole = new RoleModel({
      RoleName: RoleName,
      IsEnabled: IsEnabled,
    });

    newRole.save();

    return res.status(201).json({
      message: constants.successMessages.create,
    });
  } catch (error) {
    res.send({ statusCode: 500, error });
  }
};
