"use strict";

const mentor     = require('./controllers/mentor');
const student    = require('./controllers/student');
const course     = require('./controllers/course');
const assignment = require('./controllers/assignment');


module.exports = function(app) {

  // Mentor Signup & Login Routes
  app.post('/mentor/signup', mentor.create);
  app.post('/mentor/login', mentor.login, function(req,res){
    res.send({ status: "Logged in successfully" });
  });

  // Student Signup & Login Routes
  app.post('/student/signup', student.create);
  app.post('/student/login', student.login, function(req,res){
    res.send({ status: "Logged in successfully" });
  });

  // Courses Route
  app.get('/course/all', course.getAll);
  app.post('/course/create', course.create);
  app.get('/course/view', course.view);
  app.post('/course/enroll', course.enroll);
  app.put('/course/archive', course.archive);
  app.delete('/course/delete', course.remove);

  // Assignments Route
  app.post('/assignment/create', assignment.create);
  app.post('/assignment/submit', assignment.submit);

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

  app.post('/image-upload', upload.single('file'), function(req, res){
    res.json(req.file.filename);
  });


};
