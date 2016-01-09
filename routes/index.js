var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var School = mongoose.model('School');

/* GET home page. */
router.get('/', function(req, res, next) {
   School.find().sort('schoolName').limit(10).exec(function (err, schools){
      if (err) return next(err);

      res.render('home.jade', {schools: schools});
   })
})

module.exports = router;
