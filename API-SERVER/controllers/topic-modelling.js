"use strict";

const lda     = require('lda');
const Course  = require('../models').Course;


exports.generateTopic = function(req, res) {
  var course_id = req.query.id || req.body.id;

  Course.findById(course_id, function(err, course){
    if(err) {
      console.log(err);
      res.status(500);
      res.send({ status: "failure", message: err });
    }
    else {
      var content = course.description;
      // Extract the Sentences
      var sentences = content.match(/[^\.!\?]+[\.!\?]+/g);
      // Extract topics from the sentences
      var topics = lda(sentences, 2, 5); // 2 - Topics, 5 Terms in each topic
      // Send the extracted topics
      res.status(200);
      res.send(topics);
    }
  });

}
