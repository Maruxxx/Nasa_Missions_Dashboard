// Http server configuration using express.js as a middleware.
require('dotenv').config()
const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT

const {loadPlanetsData} = require('./models/planets.model')

async function serverStart() {
    await loadPlanetsData();

    server.listen(port, () => console.log(`Listening to port ${port}`))
}

serverStart()
