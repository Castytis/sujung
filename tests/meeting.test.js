const request = require('supertest');
const app = require('../app');
const Meeting = require('../models/Meeting');
const {
  meetingOneId,
  meetingTwoId,
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
      title: 'testas',
      subject: 'mano tikslas',
      date: '2022-06-02',
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

test('Mokytojas neturėtų sukurti susitikimo', async () => {
  const response = await request(app)
    .post('/api/meetings')
    .set('x-auth-token', teacherOneToken)
    .send({
      subject: 'meeting',
      date: '2022-11-02',
      time: '17:30',
      location: '513 kabinetas',
    })
    .expect(400);

  const newMeeting = await Meeting.findOne({ subject: 'meeting' });
  expect(newMeeting).toBeNull();

  const errors = response.body.errors;
  expect(errors[0].msg).toBe('Įveskite susitikimo pavadinimą');
});

// Delete meeting test
test('Mokytojas turėtų ištrinti organizuojamą susitikimą', async () => {
  const response = await request(app)
    .delete('/api/meetings/' + meetingOneId.valueOf())
    .set('x-auth-token', teacherOneToken)
    .send()
    .expect(200);

  expect(response.body.msg).toBe('Susitikimas ištrintas');

  const deletedMeeting = await Meeting.findById(meetingOneId.valueOf());
  expect(deletedMeeting).toBeNull();
});

test('Mokytas neturėtų ištrinti nesavo susitikimą', async () => {
  const response = await request(app)
    .delete('/api/meetings/' + meetingTwoId.valueOf())
    .set('x-auth-token', teacherOneToken)
    .send()
    .expect(401);
  expect(response.body.msg).toBe('Not authorized');

  const notDeletedMeeting = await Meeting.findById(meetingOneId.valueOf());
  expect(notDeletedMeeting).not.toBeNull();
});

// Gel all meetings test
test('Turėtų gauti visus susitikimus', async () => {
  const response = await request(app)
    .get('/api/meetings')
    .set('x-auth-token', teacherOneToken)
    .send()
    .expect(200);

  const meetingList = response.body;
  expect(meetingList.length).toBe(2);
});

// Get meeting by :id test
test('Turėtų gauti susitikimą, pagal susitikimo id', async () => {
  const response = await request(app)
    .get('/api/meetings/' + meetingTwoId.valueOf())
    .set('x-auth-token', teacherOneToken)
    .send()
    .expect(200);

  const foundMeeting = await Meeting.findById(meetingTwoId.valueOf());
  expect(response.body).toMatchObject({
    title: foundMeeting.title,
    subject: foundMeeting.subject,
  });
});
