var UserModel = require("../model/userModel");
var role = require("../model/roleModel");
var company = require("../model/companyModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorMessage = require("../helper/errorMessage");
const constants = require("../helper/constants");

exports.add_user = async function (req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.Password, salt);
    const {
      UserName,
      FirstName,
      LastName,
      // hashPassword,
      IsEnabled,
      CreationDate,
      RoleId,
      CompanyId,
    } = req.body;
    let newUser = new UserModel({
      UserName: UserName,
      FirstName: FirstName,
      LastName: LastName,
      Password: hashPassword,
      IsEnabled: IsEnabled,
      CreationDate: CreationDate,
      RoleId: RoleId,
      CompanyId: CompanyId,
    });

    newUser.save();
    console.log("success");
    return res.status(201).json({
      message: constants.successMessages.create,
    });
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.login = async function (req, res) {
  var UserName = req.body.UserName;
  const user = await UserModel.findOne({ UserName: UserName });
  try {
    if (user.length < 1) {
      return errorMessage(req, res, 500, "wrong username");
    }
    bcrypt.compare(req.body.Password, user.Password, async (err, result) => {
      if (!result) {
        return errorMessage(req, res, 500, "wrong Password");
      } else {
        var token = jwt.sign(
          { UserName: user.UserName, Password: user.Password },
          "secretKey"
        );
        user.token = token;
        await user.save();
        res.status(200).json({
          success: true,
          token: token,
          userCredentials: user,
        });
      }
    });
  } catch (error) {
    res.send({ statusCode: 500, error });
  }
};

exports.changePassword = async function (req, res) {
  var UserName = req.body.UserName;
  console.log("username", UserName);

  const salt = await bcrypt.genSalt();
  const newPassword = await bcrypt.hash(req.body.newPassword, salt);
  const user = await UserModel.find({ UserName: UserName });
  if (user.length < 1) {
    return errorMessage(req, res, 404, "User not exist");
  }
  console.log(user[0].Password);

  UserModel.findByIdAndUpdate(
    user[0]._id,
    { Password: newPassword },
    function (error, response) {
      if (error) {
        console.log("in error " + error);
      } else {
        console.log("success " + response);
        res.send({ Message: "Success", "Id ": response });
      }
    }
  );
};

exports.getUser = async function (req, res) {
  try {
    var _id = req.body._id;
    var user = await UserModel.find({ _id: _id })
      .populate("RoleId")
      .populate("CompanyId");
    if (user) {
      res.status(200).json({
        user: user,
      });
    } else {
      return errorMessage(req, res, 404, "User not found");
    }
  } catch (error) {
    res.send({ statusCode: 500, error });
  }
};


