"use strict";

const Course  = require('../models').Course;
const _       = require('underscore');


// Get all Courses
exports.getAll = function(req, res) {
  Course.find({}, function(err, courses){
    if(err) {
      console.log(err);
      res.status(500);
      res.send(err);
    }
    else {
      res.status(200);
      res.send({ status: "success", courses: courses  });
    }
  });
}

// Create a new Course
exports.create = function(req, res) {
  var course = req.query.course || req.body.course;

  Course(course).save(function(err, newCourse){
    if(err) {
      console.log(err);
      res.status(500);
      res.send(err);
    }
    else {
      res.status(200);
      res.send({ status: "success", message: "Course created successfully", course: newCourse  });
    }
  });
}


// View a Course
exports.view = function(req, res) {
  var id  = req.query.id || req.body.id;

  if(id)  {
    Course.findById(id, function(err, course){
      if(err) {
        console.log(err);
        res.status(500);
        res.send(err);
      }
      else if(course){
        res.status(200);
        res.send({ status: "success", course: course  });
      }
      else {
        res.status(404);
        res.send({ status: "failure", message: "No Course found for the given ID" });
      }
    });
  }
  else {
    res.status(422);
    res.send({ status: "failure", message: "Course ID Missing" });
  }
}

// Enroll a Course
exports.enroll = function(req, res) {

  // Get input data
  var course_id   = req.query.course_id || req.body.course_id;
  var slot_id     = req.query.slot_id   || req.body.slot_id;
  var student_id  = req.query.student_id  || req.body.student_id;

  // Get Course
  Course.findById(course_id, function(err, course){
    if(err) {
      console.log(err);
      res.status(500);
      res.send(err);
    }
    else if(course) {
      // Iterate through the slots
      var index = -1;
      _.each(course.slots, function(s, i) {
        if(s.id == slot_id) {
          index = i;
        }
      });

      if(index < 0) {
        console.log("SLOT NOT FOUND FOR ID:" + slot_id);
        res.status(404);
        res.send({ status:  "failure", message : "No Slot found for the given ID"  });
      }
      else {
        // Assign the student to the Slot
        course.slots[index]['student_id'] = student_id;
        course.save();
        res.status(200);
        res.send({ status: "success", message: "Slot assigned to Student successfully" });
      }
    }
    else {
      res.status(404);
      res.send({ status: "failure", message: "No Course found for the given ID" });
    }
  });

}

// Archive a Course
exports.archive = function(req, res)  {
  var id = req.query.id || req.body.id;
  if(id)  {
    Course.findById(id, function(err, course){
      if(err) {
        console.log(err);
        res.status(500);
        res.send(err);
      }
      else if(course){
        course.isArchived = true;
        course.save();
        res.status(200);
        res.send({ status: "success", message: "Course archived successfully", course: course  });
      }
      else {
        res.status(404);
        res.send({ status: "failure", message: "No Course found for the given ID" });
      }
    });
  }
  else {
    res.status(422);
    res.send({ status: "failure", message: "Course ID Missing" });
  }
}

// Delete a course
exports.remove = function(req, res)  {
  var id = req.query.id || req.body.id;
  if(id)  {
    Course.findById(id, function(err, course){
      if(err) {
        console.log(err);
        res.status(500);
        res.send(err);
      }
      else if(course){
        course.remove();
        res.status(200);
        res.send({ status: "success", message: "Course deleted successfully"  });
      }
      else {
        res.status(404);
        res.send({ status: "failure", message: "No Course found for the given ID" });
      }
    });
  }
  else {
    res.status(422);
    res.send({ status: "failure", message: "Course ID Missing" });
  }
}
