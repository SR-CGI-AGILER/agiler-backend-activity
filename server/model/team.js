var mongoose = require('../db-connection/mongo');

var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamName: String,
    teamMembers: [{memberId:String,name:String,email:String,profilePicUrl:String}],
    createdBy: String,
    projects: [{projectId:String}],
    createdAt : Date
});

var team = mongoose.model('team', teamSchema);

module.exports = team;