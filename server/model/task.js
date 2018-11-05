
var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    taskName: String,
    assignTo: [{memberId:String, name:String}],
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