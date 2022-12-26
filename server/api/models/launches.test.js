const request = require('supertest');
const { mongoConnect} = require('../../services/mongo');
const app = require('../app');

describe("Testing LAUNCHES Api", () => {
    
    beforeAll(async() => {
        return await mongoConnect()
    })

    test('Get /launches', async () => { 
            await request(app)
                .get('/launches')
                .expect(200)
                .expect('Content-type', /json/)
        })

    test('Post /launches', async() => {
        const res = await request(app)
            .post('/launches')
            .send({
                mission: "USS MARUX",
                rocket: "IS9 ROCKY",
                target: "Kepler-296 f",
                launchDate: "21 september 2025"
            })
            .expect('Content-type', /json/)
            .expect(201)
            
        expect(res.body.upcoming).toBeTruthy()
        expect(res.body.success).toBeTruthy()
        
    })

})