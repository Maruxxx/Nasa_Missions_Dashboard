const request = require('supertest');
const app = require('../app');


describe('GET TESTS', () => {
    test('Get /launches', async () => { 
        await request(app)
            .get('/launches')
            .expect(200)
            .expect('Content-type', /json/)
     })
})

describe('POST TEST', () => {
    test('Post /launches', async() => {
        const res = await request(app)
            .post('/launches')
            .send({
                mission: "USS MARUX",
                rocket: "IS9 ROCKY",
                target: "Kepler 12 p",
                launchDate: "21 september 2025"
            })
            .expect('Content-type', /json/)
            .expect(201)
            
        expect(res.body.upcoming).toBeTruthy()
        expect(res.body.success).toBeTruthy()
        
    })
})