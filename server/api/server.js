// Http server configuration using express.js as a middleware.
require('dotenv').config()
const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 4000;

const {mongoConnect} = require('../services/mongo')
const {loadPlanetsData} = require('./models/planets.model')
const {loadLaunchesData} = require('./models/launches.model')


async function serverStart() {
    await mongoConnect()
    await loadPlanetsData();
    await loadLaunchesData();
    server.listen(port, () => console.log(`Listening to port ${port}`))
    //hey
}

serverStart()
