"use strict";

const user    = require('./controllers/user');
const course  = require('./controllers/course');

module.exports = function(app) {

  // Signup & Login Routes
  app.post('/mentor/signup', user.create);
  app.post('/mentor/login', user.login, function(req,res){
    res.send({ status: "Logged in successfully" });
  });


  // Courses Route
  app.post('/course/create', course.create);
  app.get('/course/view', course.view);
  app.post('/course/enroll', course.enroll);
  app.put('/course/archive', course.archive);
  app.delete('/course/delete', course.remove);

};
