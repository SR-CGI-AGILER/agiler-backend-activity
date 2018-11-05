const express = require('express')
const app = express()
const activity = require('./api/activity/index');
const bodyParser = require('body-parser');
const logger = require('morgan');
const ENV = require('./config/environment');

app.use(logger('dev'))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
    next();
  });

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use(ENV.apiEndPoint,activity);
app.use(function (req, res, next) {
    next();
});

// app.use(ENV.apiEndPoint,activity);
const port = process.env.PORT || 8000
app.listen(8000, `0.0.0.0`,() => console.log('I am running on ', port));
