const mongoose = require('mongoose')
// const db = mongoose.connection;

// db.on('error', function(err){
// //     console.log(err)
// });

// db.once('open', function() {

// })
mongoose.connect('mongodb://172.23.238.245:27017/local',function(){
console.log('connected to MongoDB');
});

module.exports =  mongoose