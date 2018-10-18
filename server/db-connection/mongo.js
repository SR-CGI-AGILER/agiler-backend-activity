const mongoose = require('mongoose')
// const db = mongoose.connection;

// db.on('error', function(err){
// //     console.log(err)
// });

// db.once('open', function() {

// })
mongoose.connect('mongodb://localhost:27017/local',function(){
console.log('connected to MongoDB')
});

module.exports =  mongoose