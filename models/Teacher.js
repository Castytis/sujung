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
  number: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
    required: true,
  },
  resetLink: {
    type: String,
    default: '',
  },
});

const Teacher = mongoose.model('teacher', TeacherSchema);

module.exports = Teacher;
