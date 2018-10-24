
var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    taskName : String,
    assignTo : [String],
    createdAt : Date,
    status : String,
    dueDate : String,
    archiveTask : Boolean,
    duringStandUp : Boolean,
    projectId : String
});


var task = mongoose.model('task', taskSchema);


module.exports = task;