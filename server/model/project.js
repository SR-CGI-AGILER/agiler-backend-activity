var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    projectName : String,
    assignedTo : [String], // one project can be assigned to multiple teams
    createdBy: [String],
    createdAt : Date,
    dueDate : Date,
    status : String,
    // task : [{taskId : , text : String, createdAt : Date, dueDate : Date, status : String, assignTo : String, archiveTask: Boolean}],
    archiveProject : Boolean,
    duringStandUp: Boolean
});


var project = mongoose.model('project', projectSchema);

module.exports = project;