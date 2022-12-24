const {getAllLaunches, saveNewLaunch, addNewLaunch, ifLaunchExists, abortLaunchById} = require('../../models/launches.model')

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches())
}

async function httpPostNewLaunch(req, res) {
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

await saveNewLaunch(launch);
    return res.status(201).json(launch);
}



async function httpAbortLaunch(req, res) {
    const id = Number(req.params.id)

    const existedLaunch = await ifLaunchExists(id)

    if(!existedLaunch) {
        return res.status(404).json({
            error: "Launch not found!"
        })
    }

    const aborted = await abortLaunchById(id);

    if (!aborted) {
        return res.status(404).json({
            error: "Launch cannot be aborted!"
        })
    }
    return res.status(200).json({
        ok: true
    })
}

module.exports = {
    httpGetAllLaunches,
    httpPostNewLaunch,
    httpAbortLaunch
}