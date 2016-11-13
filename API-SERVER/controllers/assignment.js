"use strict";

const Assignment = require('../models').Assignment;

exports.getAll = function(req, res) {
  var course_id = req.query.id || req.body.id;

  Assignment.find({}, function(err, assignments) {
    res.status(200);
    res.send({ status: "success", assignments: assignments});
  })
}

// Create a new Assignment
exports.create  = function(req, res) {

  var assignment = req.query.assignment || req.body.assignment;

  // Create a document assignment
  Assignment(assignment).save(function(err, newAssignment){
    if(err) {
      console.log(err);
      res.status(500);
      res.send(err);
    }
    else {
      res.status(200);
      res.send({ status: "success", message: "Assignment created successfully", assignment: newAssignment  });
    }
  });
}

// Submit for an assignment
exports.submit  = function(req, res)  {

  var submission = req.query.submission || req.body.submission;
  var id         = req.query.id || req.body.id;

  Assignment.findById(id, function(err, assignment){
    if(err) {
      console.log(err);
      res.status(500);
      res.send(err);
    }
    else if(assignment && assignment.assignment && assignment.assignment.submission) {
      if(assignment.deadline < new Date) {
        res.status(400);
        res.send({ status: "failure", message: "Deadline crossed."});
      }
      else {
        assignment.assignment.submission.push(submission);
        assignment.updated_at = new Date();
        assignment.save();
        res.send({ status: "success", message: "Submission has been added to assignment" });
      }
    }
    else {
      res.status(404);
      res.send({ status: "failure", message: "No Assignment found for the given ID" });
    }
  });
}
