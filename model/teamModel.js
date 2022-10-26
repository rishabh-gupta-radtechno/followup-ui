var mongoose = require("mongoose");

var teamSchema = mongoose.Schema({
  TeamId: String,
  TeamLead: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  TeamMember: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  AssignedBy: String,
});

var TeamModel = mongoose.model("team", teamSchema);
module.exports = TeamModel;
