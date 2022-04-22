const request = require('supertest');
const app = require('../app');

test('1. Mokytojo registracija', async () => {
  await request(app)
    .post('/api/teachers')

    .send({
      name: 'Salvinija',
      surname: 'Baranauskaitė',
      email: 'salvinija@gmail.com',
      password: '123456',
      subject: 'Matematika',
      classes: '5b, 6c, 8b',
    })
    .expect(200);
});
