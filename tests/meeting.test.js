const request = require('supertest');
const app = require('../app');
const Teacher = require('../models/Teacher');
const Parent = require('../models/Parent');
const Meeting = require('../models/Meeting');
const {
  teacherOne,
  teacherOnePassword,
  teacherOneId,
  teacherTwoId,
  teacherOneToken,
  setupDataBase,
} = require('./fixtures/database');

beforeEach(setupDataBase);

// Create meeting test
test('Mokytojas turėtų sukurti susitikimą', async () => {
  const response = await request(app)
    .post('/api/meetings')
    .set('x-auth-token', teacherOneToken)
    .send({
      title: 'test title',
      subject: 'test subject',
      date: '2022-11-02',
      time: '17:30',
      location: '513 kabinetas',
    })
    .expect(201);

  const newMeeting = await Meeting.findOne({ title: 'test title' });
  expect(newMeeting).toMatchObject({
    title: 'test title',
    subject: 'test subject',
    date: '2022-11-02',
    time: '17:30',
    location: '513 kabinetas',
  });
});
