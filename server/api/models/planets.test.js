const req = require('supertest');
const app = require('../app');

test('Get /planets', async () => {
    const res = await req(app)
        .get('/planets')
        .expect(200)
})