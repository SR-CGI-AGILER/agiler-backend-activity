
var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;


var subtaskSchema = new Schema({
    subtaskName : String,
    assignTo : [String],
    createdAt : Date,
    status : String,
    dueDate : Date,
    archiveTask : Boolean,
    duringStandUp : Boolean,
    taskId : String
});


var subtask = mongoose.model('subtask', subtaskSchema);


module.exports = subtask;