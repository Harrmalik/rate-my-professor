var mongoose = require('mongoose');
var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('./models/school.js');
var routes = require('./routes');
var school = require('./routes/api.js');
mongoose.connect('mongodb://localhost/rmp', function (err){
   if(err) throw err;
})

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.use('/school', school);

app.listen(3001, function(){
   console.log('listening on localhost:' + 3001);
})
