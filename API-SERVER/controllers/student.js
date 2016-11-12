"use strict";

const Student = require('../models').Student;
const bcrypt  = require('bcrypt-nodejs');

// Create a New Mentor
exports.create  = function(req, res)  {

  var student  = req.query.student || req.body.student;

  // Encrypt the password using Bcrypt
  student.password = bcrypt.hashSync(student.password);

  // Save in DB
  Student(student).save(function(err, newStudent){
    if(err) {
      console.log(err);
      res.status(500);
      res.send(err);
    }
    else {
      res.status(200);
      res.send({ status: "success", message: "Student created successfully"  });
    }
  });
};

// Login
exports.login = function(req, res, next)  {

  var email     =   req.query.email ||  req.body.email;
  var phone     =   req.query.phone ||  req.body.query;
  var password  =   req.query.password  || req.body.password;

  var query = {};

  if(email) {
    query = { email: email };
  }
  else if(phone) {
    query = { phone: phone };
  }

  // Query the DB to get the user
  Student.findOne(query, function(err, student){

    if(err) {
      console.log(err);
      res.status(500);
      res.send(err);
    }
    else if(student) {
      var isCorrect = bcrypt.compareSync(password, student.password);
      if(isCorrect) {
        req.user = student;
        next();
      }
      else {
        res.status(400);
        res.send({ status: "failure", message: "Incorrect Password" });
      }
    }
    else {
      res.status(404);
      res.send({ status: "failure", message: "No Student found for the given email / Phone" });
    }

  });

}
