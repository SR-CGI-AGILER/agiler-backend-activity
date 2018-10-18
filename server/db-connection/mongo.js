const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/local',function(){
console.log('connected to MongoDB')
});

module.exports =  mongoose