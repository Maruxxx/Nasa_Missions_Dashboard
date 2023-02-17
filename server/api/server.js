// Http server configuration using express.js as a middleware.
require('dotenv').config()
const app = require('./app');
const https = require('https');
const path = require('path')
const fs = require('fs')
const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '..', 'privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'certificate.crt'))
}, app)
const port = process.env.PORT || 80;


const {mongoConnect} = require('../services/mongo')
const {loadPlanetsData} = require('./models/planets.model')
const {loadLaunchesData} = require('./models/launches.model')


async function serverStart() {
    await mongoConnect()
    await loadPlanetsData();
    await loadLaunchesData();
    server.listen(port, () => console.log(`Listening to port ${port}`))
}

serverStart()
