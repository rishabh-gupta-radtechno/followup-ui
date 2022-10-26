var TeamModel = require("../model/teamModel");
const errorMessage = require("../helper/errorMessage");
const constants = require("../helper/constants");

exports.add_team = async function (req, res) {
  try {
    const { TeamLead, TeamMember, AssignedBy } = req.body;
    let newTeam = new TeamModel({
      TeamLead: TeamLead,
      TeamMember: TeamMember,
      AssignedBy: AssignedBy,
    });
    newTeam.save();

    return res.status(201).json({
      message: constants.successMessages.create,
    });
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.getAllTeams = async function (req, res) {
  try {
    var team = await TeamModel.find({});
    if (!team || team.length == 0) {
      return errorMessage(req, res, 404, "No team found");
    } else if (team) {
      return res.status(200).json({
        team,
      });
    }
  } catch (error) {
    return errorMessage(req, res, 500, "api error", error);
  }
};

exports.updateTeam = async function (req, res) {
  try {
    await TeamModel.findOneAndUpdate(
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

exports.deleteTeam = async function (req, res) {
  try {
    const _id = req.body._id;
    const team = await TeamModel.findOne({
      _id,
    });

    if (!team || team.length == 0) {
      return errorMessage(req, res, 404, "No team found");
    } else {
      await TeamModel.deleteOne({
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
