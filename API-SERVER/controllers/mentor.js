"use strict";

const Mentor  = require('../models').Mentor;
const bcrypt  = require('bcrypt-nodejs');

// Create a New Mentor
exports.create  = function(req, res)  {

  var mentor  = req.query.mentor || req.body.mentor;

  // Encrypt the password using Bcrypt
  mentor.password = bcrypt.hashSync(mentor.password);

  // Save in DB
  Mentor(mentor).save(function(err, newMentor){
    if(err) {
      console.log(err);
      res.status(500);
      res.send(err);
    }
    else {
      res.status(200);
      res.send({ status: "success", message: "User created successfully"  });
    }
  });
};

// Login
exports.login = function(req, res, next)  {

  var email     =   req.query.email ||  req.body.email;
  var password  =   req.query.password  || req.body.password;

  // Query the DB to get the user
  Mentor.findOne({  email : email }, function(err, mentor){

    if(err) {
      console.log(err);
      res.status(500);
      res.send(err);
    }
    else if(mentor) {
      var isCorrect = bcrypt.compareSync(password, mentor.password);
      if(isCorrect) {
        req.user = mentor;
        next();
      }
      else {
        res.status(400);
        res.send({ status: "failure", message: "Incorrect Password" });
      }
    }
    else {
      res.status(404);
      res.send({ status: "failure", message: "No Mentor found for the given email" });
    }

  });

}
