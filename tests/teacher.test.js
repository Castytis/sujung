const request = require('supertest');
const app = require('../app');
const Teacher = require('../models/Teacher');
const {
  teacherOne,
  teacherOnePassword,
  teacherOneId,
  teacherTwoId,
  teacherOneToken,
  setupDataBase,
} = require('./fixtures/database');

beforeEach(setupDataBase);

// Register test
test('Turėtų užregistruoti mokytoją', async () => {
  const response = await request(app)
    .post('/api/teachers')
    .send({
      name: 'Salvinija',
      surname: 'Baranauskaitė',
      email: 'salvinija@gmail.com',
      subject: 'Fizika',
      classes: '5a, 6a',
      password: '@SaL123456',
    })
    .expect(201);

  const newToken = response.body.token;
  expect(newToken).not.toBeNull();

  const newTeacher = await Teacher.findOne({ name: 'Salvinija' });
  expect(newTeacher).toMatchObject({
    name: 'Salvinija',
    surname: 'Baranauskaitė',
    email: 'salvinija@gmail.com',
    subject: 'Fizika',
    classes: '5a, 6a',
  });

  expect(newTeacher.password).not.toBe('@SaL123456');
});

test('Turėtų neužregistruoti mokytojo', async () => {
  const response = await request(app)
    .post('/api/teachers')
    .send({
      name: 'name',
      email: '',
      password: 'password123',
    })
    .expect(400);

  const errors = response.body.errors;
  expect(errors[1].msg).toContain('Įveskite savo el. paštą');
});

// Login test
test('Turėtų prijungti mokytoją', async () => {
  const response = await request(app)
    .post('/api/auth-teacher')
    .send({
      email: teacherOne.email,
      password: teacherOnePassword,
    })
    .expect(200);

  const newToken = response.body.token;
  expect(newToken).not.toBeNull();
});

test('Turėtų neprijungti mokytojo', async () => {
  const response = await request(app)
    .post('/api/auth-teacher')
    .send({
      email: 'bad@gmail.com',
      password: '123456789',
    })
    .expect(400);

  const newToken = response.body.token;
  expect(newToken).toBeUndefined();
});

// Get teachers profile test
test('Turėtų gauti prisijungusio mokytojo paskyrą', async () => {
  const response = await request(app)
    .get('/api/teachers/me')
    .set('x-auth-token', teacherOneToken)
    .send()
    .expect(200);

  expect(response.body).toMatchObject({
    name: teacherOne.name,
    email: teacherOne.email,
  });
});

test('Neturėtų gauti mokytojo paskyros, neprisijungęs naudotojas', async () => {
  await request(app).get('/api/teachers/me').send().expect(401);
});

// Get teachers list test
test('Turėtų gauti mokytojų sąrašą', async () => {
  const response = await request(app)
    .get('/api/teachers')
    .set('x-auth-token', teacherOneToken)
    .send()
    .expect(200);

  const teachersList = response.body;
  expect(teachersList.length).toBe(2);
});

// Get teacher by :id test
test('Turėtų gauti mokytoją, pagal mokytojo id', async () => {
  const response = await request(app)
    .get('/api/teachers/' + teacherTwoId.valueOf())
    .set('x-auth-token', teacherOneToken)
    .send()
    .expect(200);

  const secondTeacher = await Teacher.findById(teacherTwoId.valueOf());
  expect(response.body).toMatchObject({
    name: secondTeacher.name,
    surname: secondTeacher.surname,
    email: secondTeacher.email,
  });
});
