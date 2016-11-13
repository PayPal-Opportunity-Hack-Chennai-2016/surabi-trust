"use strict";

const Student = require('../models').Student;
const Course  = require('../models').Course;
const raccoon = require('raccoon');
const _       = require('underscore');

// Connect Raccoon to Redis
raccoon.connect(6379, '127.0.0.1');

// Configure Recommendation Engine
raccoon.config.nearestNeighbors = 5; // number of neighbors you want to compare a user
raccoon.config.numOfRecsStore = 30; // // number of recommendations to store per user


exports.getRecommendation = function(req, res) {

  var current_user_id = req.user._id;

  // Get the current courses
  Course.find({}, function(err, courses){
    // Iterate through the courses attended
    _.each(courses, function(c) {
        // Iterate through the slots of the course
        _.each(c.slots, function(s){
            // Add in the ratings
            if(s.student_id)
              raccoon.liked(s.student_id, c.type);
        });
    });
    // Once the ratings has been added, get recommendations of the User
    raccoon.recommendFor(current_user_id, 10, function(results){
      // We will be getting the course types in ranked recommendations
      res.send(results);
    });
  });

}
