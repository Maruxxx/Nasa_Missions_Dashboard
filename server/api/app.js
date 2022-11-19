const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan')
const planetsRoute = require('./routes/planets/planets.router')


app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(morgan('combined'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'build')))
app.use(planetsRoute)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

module.exports = app;