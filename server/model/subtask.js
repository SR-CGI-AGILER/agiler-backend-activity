var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;
var subTaskSchema = new Schema({
    // subTaskId: Number,
    subTaskName: String,
    assignTo: [{memberId:String}],
    createdBy: {memberId:String},
    createdAt: Date,
    dueDate: Date,
    status: String,
    archiveSubTask: Boolean,
    duringStandUp: Boolean,
    taskId: String
});

var subtask = mongoose.model('subtask', subTaskSchema);

module.exports = subtask;