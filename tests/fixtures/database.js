const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Teacher = require('../../models/Teacher');

const teacherOneId = new mongoose.Types.ObjectId();
const teacherTwoId = new mongoose.Types.ObjectId();

const payload = {
  teacher: {
    id: teacherOneId,
  },
};

const teacherOneToken = jwt.sign(payload, process.env.JWTSECRET);

const teacherOnePassword = 'password123';

const teacherOne = {
  _id: teacherOneId,
  name: 'Juozas',
  surname: 'Račickas',
  email: 'juozas@gmail.com',
  password: teacherOnePassword,
  subject: 'Matematika',
  classes: '5b, 6c, 8b',
};

const teacherTwo = {
  _id: teacherTwoId,
  name: 'Eligijus',
  surname: 'Matukas',
  email: 'eligijus@gmail.com',
  password: 'password123',
  subject: 'Chemija',
  classes: '5b, 6c, 8b',
};

const setupDataBase = async () => {
  await Teacher.deleteMany();

  const firstTeacher = new Teacher(teacherOne);
  const secondTeacher = new Teacher(teacherTwo);

  const salt = await bcrypt.genSalt(10);
  teacherOne.password = await bcrypt.hash(teacherOnePassword, salt);

  await firstTeacher.save();
  await secondTeacher.save();
};

module.exports = {
  teacherOne,
  teacherTwo,
  teacherOnePassword,
  teacherOneId,
  teacherTwoId,
  teacherOneToken,
  setupDataBase,
};
