"use strict";

const mongoose = require('mongoose');
const config   = require('../config');
const Schema   = mongoose.Schema;

// Connect to DB
mongoose.connect(config.DB);

// Schema for Mentors

const Mentor = mongoose.model('mentors', {
  name      : { type: String, required: true },
  type      : { type: Number, required: true }, // 1 - Parent, 2 - NRI, 3 - Single
  age       : { type: Number, required: true },
  gender    : { type: Number, required: true },  // 1 - Male, 2 - Female
  location  : { type: String, required: true },
  phone     : { type: Number, required: true },
  email     : { type: String, required: true },
  password  : { type: String, required: true },
  education : { type: String, required: true },
  skills    : [],
  picture   : { type: String },
  isApproved: { type: Boolean, required: true, default: false },
  support   : {
                mentorType : { type: Number },
                name       : { type: String },
                phone      : { type: Number },
                email      : { type: String },
                location   : { type: String }
              }
});

// Schema for Courses

const Course = mongoose.model('courses', {
  name        : { type: String, required: true },
  keywords    : [],
  description : { type: String, required: true },
  duration    : { type: Number, required: true },
  type        : { type: String, required: true },
  isArchived  : { type: Boolean, required: true, default: false },
  videoUrl    : { type: String },
  mentor_id   : { type: Schema.ObjectId, required: true },
  created_at  : { type: Date, required: true, default: new Date },
  slots       : [
                  {
                    from        : { type: String, required: true },
                    to          : { type: String, required: true },
                    days        : [],
                    student_id  : { type: Schema.ObjectId }
                  }
                ]
});

// Schema for Students

const Student = mongoose.model('student', {
  name      : { type: String, required: true },
  age       : { type: Number, required: true },
  email     : { type: String },
  phone     : { type: Number, required: true },
  gender    : { type: Number, required: true }, // 1 - Male, 2 - Female
  education : { type: String, required: true },
  profile   : { type: String },
  location  : { type: String, required: true },
  tags      : [],
  interests : [],
  isApproved: { type: Boolean, default: false }
});

// Schema for Assignments

const Assignment = mongoose.model('assignment', {
  course_id   : Schema.Types.ObjectId,
  mentor_id   : Schema.Types.ObjectId,
  student_id  : Schema.Types.ObjectId,
  deadline    : { type: Date },
  created_at  : { type: Date, default: new Date },
  updated_at  : { type: Date, default: new Date },
  assignment  : {
                  description : { type: String },
                  date        : { type: String },
                  submission  : [],
                  isDone      : { type: Boolean, default: false }
                }
});

// Schema for Admin

const Admin = mongoose.model('Admin', {
  name      : { type: String, required: true },
  email     : { type: String, required: true },
  password  : { type: String, required: true }
});

module.exports = {
  Mentor      : Mentor,
  Course      : Course,
  Student     : Student,
  Assignment  : Assignment
}
