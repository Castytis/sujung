const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Teacher = require('../../models/Teacher');
const Parent = require('../../models/Parent');

const teacherOneId = new mongoose.Types.ObjectId();
const teacherTwoId = new mongoose.Types.ObjectId();
const parentOneId = new mongoose.Types.ObjectId();

const teacherPayload = {
  teacher: {
    id: teacherOneId,
  },
};

const parentPayload = {
  parent: {
    id: parentOneId,
  },
};

const teacherOneToken = jwt.sign(teacherPayload, process.env.JWTSECRET);
const parentOneToken = jwt.sign(parentPayload, process.env.JWTSECRET);

const teacherOnePassword = 'password123';
const parentOnePassword = '123456';

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

const parentOne = {
  _id: parentOneId,
  name: 'Virgilijus',
  surname: 'Gruodys',
  email: 'virgilijus@gmail.com',
  password: parentOnePassword,
};

const setupDataBase = async () => {
  await Teacher.deleteMany();
  await Parent.deleteMany();

  const firstTeacher = new Teacher(teacherOne);
  const secondTeacher = new Teacher(teacherTwo);

  const firstParent = new Parent(parentOne);

  const salt = await bcrypt.genSalt(10);
  teacherOne.password = await bcrypt.hash(teacherOnePassword, salt);
  parentOne.password = await bcrypt.hash(parentOnePassword, salt);

  await firstTeacher.save();
  await secondTeacher.save();
  await firstParent.save();
};

module.exports = {
  teacherOne,
  teacherTwo,
  parentOne,
  teacherOnePassword,
  parentOnePassword,
  teacherOneId,
  teacherTwoId,
  parentOneId,
  teacherOneToken,
  parentOneToken,
  setupDataBase,
};
