const request = require('supertest');
const app = require('../app');
const Parent = require('../models/Parent');
const Teacher = require('../models/Teacher');
const {
  parentOne,
  parentOneToken,
  parentOnePassword,
  teacherTwoId,
  setupDataBase,
} = require('./fixtures/database');

beforeEach(setupDataBase);

// Register parent
test('Turėtų užregistruoti globėją', async () => {
  const response = await request(app)
    .post('/api/parents')
    .send({
      name: 'Armantas',
      surname: 'Brasiunas',
      email: 'armantas@gmail.com',
      password: '@Armantas123',
    })
    .expect(201);

  const newToken = response.body.token;
  expect(newToken).not.toBeUndefined();

  const newParent = await Parent.findOne({ name: 'Armantas' });
  expect(newParent).toMatchObject({
    surname: 'Brasiunas',
    email: 'armantas@gmail.com',
  });

  expect(newParent.password).not.toBe('@Armantas123');
});

test('Turėtų neužregistruoti globėjo', async () => {
  const response = await request(app)
    .post('/api/parents')
    .send({
      name: 'name',
      email: '',
      password: 'password123',
    })
    .expect(400);

  const errors = response.body.errors;
  expect(errors[1].msg).toContain('Įveskite savo el. paštą');
});

// Login Parent test
test('Turėtų prijungti globėją', async () => {
  const response = await request(app)
    .post('/api/auth-parent')
    .send({
      email: parentOne.email,
      password: parentOnePassword,
    })
    .expect(200);

  const newToken = response.body.token;
  expect(newToken).not.toBeUndefined();
});

test('Turėtų neprijungti globėjo', async () => {
  const response = await request(app)
    .post('/api/auth-parent')
    .send({
      email: 'bad@gmail.com',
      password: '123456789',
    })
    .expect(400);

  const newToken = response.body.token;
  expect(newToken).toBeUndefined();

  const errors = response.body.errors;
  expect(errors[0].msg).toBe(
    'Mokinio globėjas su šiais prisijungimais neegzistuoja'
  );
});

// Get teachers list test
test('Turėtų gauti mokytojų sąrašą', async () => {
  const response = await request(app)
    .get('/api/teachers')
    .set('x-auth-token', parentOneToken)
    .send()
    .expect(200);

  const teachersList = response.body;
  expect(teachersList.length).toBe(2);
});

test('Turėtų gauti mokytoją, pagal mokytojo id', async () => {
  const response = await request(app)
    .get('/api/teachers/' + teacherTwoId.valueOf())
    .set('x-auth-token', parentOneToken)
    .send()
    .expect(200);

  const secondTeacher = await Teacher.findById(teacherTwoId.valueOf());
  expect(response.body).toMatchObject({
    name: secondTeacher.name,
    surname: secondTeacher.surname,
    email: secondTeacher.email,
  });
});
