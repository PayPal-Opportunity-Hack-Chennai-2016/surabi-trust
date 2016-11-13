"use strict";

const session         = require('./lib/session');
const mentor          = require('./controllers/mentor');
const student         = require('./controllers/student');
const course          = require('./controllers/course');
const assignment      = require('./controllers/assignment');
const recommendation  = require('./controllers/recommendation');

module.exports = function(app) {

  // Mentor Signup & Login Routes
  app.post('/mentor/signup', mentor.create);
  app.post('/mentor/login', mentor.login, session.signIn);

  // Student Signup & Login Routes
  app.post('/student/signup', student.create);
  app.post('/student/login', student.login, session.signIn);

  // Courses Route
  app.get('/course/all', session.isAuthenticated, course.getAll);
  app.post('/course/create', session.isAuthenticated, course.create);
  app.get('/course/view', session.isAuthenticated, course.view);
  app.post('/course/enroll', session.isAuthenticated, course.enroll);
  app.put('/course/archive', session.isAuthenticated, course.archive);
  app.delete('/course/delete', session.isAuthenticated, course.remove);

  // Assignments Route
  app.post('/assignment/create', session.isAuthenticated, assignment.create);
  app.post('/assignment/submit', session.isAuthenticated, assignment.submit);

  // Recommendation Route
  app.get('/recommendation', session.isAuthenticated, recommendation.getRecommendation);


  // File Uploads
  const uuid   = require("uuid")
  const path   = require("path")
  const multer = require("multer")

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      var p = path.resolve(__dirname, './public/uploads');
      cb(null, p);
    },
    filename: function(req, file, cb) {
      var filename =  uuid.v1() + path.extname(file.originalname);
      cb(null, filename)
    }
  });

  var upload = multer({ storage: storage });

  app.post('/image-upload', session.isAuthenticated, upload.single('file'), function(req, res){
    res.json(req.file.filename);
  });


};
