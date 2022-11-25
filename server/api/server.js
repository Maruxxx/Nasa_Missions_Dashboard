// Http server configuration using express.js as a middleware.
const app = require('./app');
const http = require('http');
const mongoose = require('mongoose')
const server = http.createServer(app);
const port = process.env.PORT || 8000;
const DB_URI = 'mongodb+srv://marux:hornet9512@nasa-mission-control.7szsobj.mongodb.net/?retryWrites=true&w=majority'

const {loadPlanetsData} = require('./models/planets.model')

mongoose.connection.once('open', () => {
    console.log('Database connected successfully!')
});

mongoose.connection.on('error', (err) => console.error(err))

async function serverStart() {
    await mongoose.connect(DB_URI)
    await loadPlanetsData();

    server.listen(port, () => console.log(`Listening to port ${port}`))
}

serverStart()
