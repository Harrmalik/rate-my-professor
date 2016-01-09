var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var School = mongoose.model('School');
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/create', function(req, res, next) {
  res.render('school/create.jade', {pageTitle:"Rate My Professor"});
})

router.post('/create', function(req, res, next) {
   var schoolName = req.body.name;
   var type = req.body.type;
   var street = req.body.street;
   var zip = req.body.zip;
   var state = req.body.state;
   console.log(schoolName, type, street, zip, state);
   School.create({
      schoolName: schoolName,
      type: type,
      street: street,
      zip: zip,
      state: state
   },function(err, school){
      if (err) return next(err);
      res.redirect('/school/' + school.id);
   });
});

/* GET school page. */
router.get('/:id', function(req, res, next) {
   var query = School.findById(req.params.id);

   query.exec(function (err, school){
      if (err) return next(err);

      if (!school) return next();

      res.render('school/view.jade', {school: school, pageTitle: school.schoolName});
   })
})

router.get('/:id/addteacher', function(req, res, next) {
  res.render('school//addteacher.jade', {pageTitle:"Rate My Professor", id: req.param.id});
})

router.post('/:id/addteacher', function(req, res, next) {
   var teacher = req.body.name;
   var  major = req.body.major;

   School.update({id: req.param.id}, {
      $addToSet: {
         professors: {
            name: teacher,
            major: major
         }
      }
   },function(err, school){
      if (err) return next(err);
      res.redirect('/school/' + school.id);
   });
});

router.get('/:id/teacher/:teacher', function(req, res, next) {
   var query = School.findById(req.params.id);

   query.exec(function (err, school){
      if (err) return next(err);

      if (!school) return next();

      res.render('school/teacher.jade', {teacher: school.professors, pageTitle: school.professors[req.params.teacher].name, id: req.params.teacher});
   })
})

router.post('/:id/teacher/:teacher', function(req, res, next) {
   var comment = req.body.comment;
   var  rating = req.body.rating;

   School.update({professors: req.param.teacher}, {
      $addToSet: {
         comments: {
            comment: comment,
            rating: rating
         }
      }
   },function(err, school){
      if (err) return next(err);
   });
});



module.exports = router;
