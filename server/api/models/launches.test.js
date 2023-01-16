const request = require('supertest');
const { mongoConnect, mongoDisconnect} = require('../../services/mongo');
const app = require('../app');
const { loadPlanetsData } = require('./planets.model');

describe("Testing LAUNCHES Api", () => {
    
    beforeAll(async() => {
        await mongoConnect()
        await loadPlanetsData()
    })
    afterAll(async() => {
        await mongoDisconnect()
    })

    test('Get /launches', async () => { 
            await request(app)
                .get('/v1/launches')
                .expect(200)
                .expect('Content-type', /json/)
        })

    test('Post /launches', async() => {
        const res = await request(app)
            .post('/v1/launches')
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