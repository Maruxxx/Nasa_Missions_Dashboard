const express = require('express');
const planetsRoute = express.Router()

const {httpGetAllPlanets} = require('./planets.controller')

planetsRoute.get('/planets', httpGetAllPlanets)

module.exports = planetsRoute