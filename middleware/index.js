var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function(app){
   app.use(express.logger('dev'));

   app.use(express.cookieParser());
   app.use(express.session({secret: 'simple'}));
   app.use(bodyParser());

   // expose session to views
   app.use(function (req, res, next){
      res.locals.session = req.session;
      next();
   })
}
