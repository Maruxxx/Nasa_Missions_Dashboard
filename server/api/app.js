const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan')


const planetsRoute = require('./routes/planets/planets.router');
const launchesRoute = require('./routes/launches/launches.router');


app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(morgan('combined'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

// Routes
app.use(planetsRoute)
app.use(launchesRoute)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;