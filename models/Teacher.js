const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model('teacher', TeacherSchema);

module.exports = Teacher;
