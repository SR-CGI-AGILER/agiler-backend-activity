var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;


var projectSchema = new Schema({
    projectName : String,
    assignTo : [{teamId:String,teamName:String}],
    createdAt : Date,
    status : String,
    dueDate : Date,
    archiveProject : Boolean,
    duringStandUp : Boolean
});

;

var project = mongoose.model('project', projectSchema);

module.exports = project;