const express = require('express');

const launchesRoute = express.Router();

const {httpGetAllLaunches} = require('../launches/launches.controller')

launchesRoute.get('/launches', httpGetAllLaunches)

module.exports = launchesRoute;