var mongoose = require('../db-connection/mongo');
// var project = require('./project');
var Schema = mongoose.Schema;
var taskSchema = new Schema({
    taskName: String,
    assignTo: [{memberId:String}],
    createdBy: {memberId:String},
    createdAt: Date,
    dueDate: Date,
    status: String,
    archiveTask: Boolean,
    duringStandUp: Boolean,
    projectId: String
});

var task = mongoose.model('task', taskSchema);

module.exports = task;