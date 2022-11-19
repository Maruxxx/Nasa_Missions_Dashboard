const express = require('express');
const planetsRoute = express.Router()

const {getAllPlanets} = require('./planets.controller')

planetsRoute.get('/planets', getAllPlanets)

module.exports = planetsRoute