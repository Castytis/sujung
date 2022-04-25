const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Teacher = require('../../models/Teacher');
const Parent = require('../../models/Parent');
const Meeting = require('../../models/Meeting');

const teacherOneId = new mongoose.Types.ObjectId();
const teacherTwoId = new mongoose.Types.ObjectId();
const parentOneId = new mongoose.Types.ObjectId();
const meetingOneId = new mongoose.Types.ObjectId();
const meetingTwoId = new mongoose.Types.ObjectId();

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

const meetingOne = {
  _id: meetingOneId,
  organiser: teacherOneId,
  title: 'Susitikimas su mokinių globėjais',
  subject: 'Aptarti mokinių rezultatus',
  date: '2022-06-05',
  time: '18:00',
  location: '212 kabinetas',
};

const meetingTwo = {
  _id: meetingTwoId,
  organiser: teacherOneId,
  title: 'Susitikimas su mokinių globėjais',
  subject: 'Aptarti mokinių matematinius rezultatus',
  date: '2022-06-01',
  time: '17:00',
  location: '400 kabinetas',
};

const setupDataBase = async () => {
  await Teacher.deleteMany();
  await Parent.deleteMany();
  await Meeting.deleteMany();

  const firstTeacher = new Teacher(teacherOne);
  const secondTeacher = new Teacher(teacherTwo);
  const firstParent = new Parent(parentOne);
  const firstMeeting = new Meeting(meetingOne);
  const secondMeeting = new Meeting(meetingTwo);

  const salt = await bcrypt.genSalt(10);
  teacherOne.password = await bcrypt.hash(teacherOnePassword, salt);
  parentOne.password = await bcrypt.hash(parentOnePassword, salt);

  await firstTeacher.save();
  await secondTeacher.save();
  await firstParent.save();
  await firstMeeting.save();
  await secondMeeting.save();
};

module.exports = {
  teacherOne,
  teacherTwo,
  parentOne,
  meetingOne,
  meetingTwo,
  teacherOnePassword,
  parentOnePassword,
  teacherOneId,
  teacherTwoId,
  meetingOneId,
  meetingTwoId,
  parentOneId,
  teacherOneToken,
  parentOneToken,
  setupDataBase,
};
