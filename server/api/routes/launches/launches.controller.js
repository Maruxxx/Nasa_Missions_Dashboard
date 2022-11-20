const {getAllLaunches, addNewLaunch, ifLaunchExists, abortLaunchById} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpPostNewLaunch(req, res) {
    const launch = req.body;
    
    if(!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
        return res.status(400).json({
            error: "Missing required launch property!"
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    
    if(isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date!"
        })
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const id = Number(req.params.id)

    if(!ifLaunchExists(id)) {
        return res.status(404).json({
            error: "Launch not found!"
        })
    }

    const aborted = abortLaunchById(id);
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpPostNewLaunch,
    httpAbortLaunch
}