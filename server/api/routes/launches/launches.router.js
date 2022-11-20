const express = require('express');

const launchesRoute = express.Router();

const {httpGetAllLaunches, httpPostNewLaunch} = require('../launches/launches.controller')

launchesRoute.get('/', httpGetAllLaunches)
launchesRoute.post('/', httpPostNewLaunch)

module.exports = launchesRoute;