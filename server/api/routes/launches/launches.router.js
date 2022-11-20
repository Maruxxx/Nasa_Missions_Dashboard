const express = require('express');

const launchesRoute = express.Router();

const {httpGetAllLaunches, httpPostNewLaunch, httpAbortLaunch} = require('../launches/launches.controller')

launchesRoute.get('/', httpGetAllLaunches)
launchesRoute.post('/', httpPostNewLaunch)
launchesRoute.delete('/:id', httpAbortLaunch)

module.exports = launchesRoute;