const express = require('express');
const v1 = express.Router();

const planetsRoute = require('./planets/planets.router');
const launchesRoute = require('./launches/launches.router');

v1.use('/planets', planetsRoute)
v1.use('/launches', launchesRoute)


module.exports = v1