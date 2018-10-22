var mongoose = require('../db-connection/mongo');

var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamName: String,
    teamMembers: [{memberId:String}],
    createdBy: String,
    projects: [{projectId:String}]
});

var team = mongoose.model('team', teamSchema);

module.exports = team;