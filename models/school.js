var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
   schoolName: {type: String, required: true},
   type: String,
   street: String,
   zip: String,
   state: String,
   professors: [{
      name: {type: String, required: true},
      major: String,
      comments: [{
         comment: String,
         rating: Number
      }]
   }]
});

mongoose.model('School', schoolSchema);
