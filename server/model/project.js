// var mongoose = require('mongoose');
var mongoose = require('../db-connection/mongo');
var Schema = mongoose.Schema;

// console.log(mongoose)
var projectSchema = new Schema({
    projectName : String,
    assignTo : [String],
    createdAt : Date,
    status : String,
    dueDate : Date,
    archiveProject : Boolean,
    duringStandUp : Boolean
});

;

var project = mongoose.model('project', projectSchema);
// var test = mongoose.model('test',test);

module.exports = project;